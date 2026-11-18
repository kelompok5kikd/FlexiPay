import "server-only";
import { DatabaseSync as NodeDatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { createHash, randomBytes, scryptSync, timingSafeEqual, randomUUID } from "node:crypto";

type SqliteStatement = { run: (...values: unknown[]) => { changes: number }; get: (...values: unknown[]) => Record<string, unknown> | undefined; all: () => Record<string, unknown>[] };
type SqliteDatabase = { exec: (sql: string) => void; prepare: (sql: string) => SqliteStatement };
const DatabaseSync = NodeDatabaseSync as unknown as new (path: string) => SqliteDatabase;

const dataDirectory = join(process.cwd(), "data");
mkdirSync(dataDirectory, { recursive: true });
const db = new DatabaseSync(join(dataDirectory, "flexipay.db"));
db.exec(`
  PRAGMA busy_timeout = 10000;
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL COLLATE NOCASE UNIQUE,
    phone TEXT NOT NULL UNIQUE,
    pin_hash TEXT NOT NULL,
    account_status TEXT NOT NULL DEFAULT 'active' CHECK (account_status IN ('active', 'pending_verification', 'suspended')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE TABLE IF NOT EXISTS user_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    expires_at TEXT NOT NULL,
    revoked_at TEXT
  );
  CREATE TABLE IF NOT EXISTS registration_events (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('account_created')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE TABLE IF NOT EXISTS user_profiles (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    birth_date TEXT,
    address TEXT,
    avatar_url TEXT,
    avatar_mime TEXT,
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  INSERT OR IGNORE INTO user_profiles (user_id, full_name)
    SELECT id, full_name FROM users;
`);

const sessionColumns = db.prepare("PRAGMA table_info(user_sessions)").all().map((column) => String(column.name));
if (!sessionColumns.includes("created_at")) {
  db.exec("ALTER TABLE user_sessions ADD COLUMN created_at TEXT NOT NULL DEFAULT ''");
  db.exec("UPDATE user_sessions SET created_at = strftime('%Y-%m-%dT%H:%M:%fZ', expires_at, '-7 days') WHERE created_at = ''");
}

// Upgrade the earlier password-based local schema without retaining submitted passwords.
let userColumns = db.prepare("PRAGMA table_info(users)").all().map((column) => String(column.name));
if (userColumns.includes("password_hash")) {
  if (!userColumns.includes("pin_hash")) {
    try { db.exec("ALTER TABLE users ADD COLUMN pin_hash TEXT"); }
    catch {
      const latestColumns = db.prepare("PRAGMA table_info(users)").all().map((column) => String(column.name));
      if (!latestColumns.includes("pin_hash")) throw new Error("Tidak bisa menyiapkan kolom PIN FlexiPay.");
    }
  }
  db.exec("UPDATE users SET password_hash = ''");
  db.exec("ALTER TABLE users DROP COLUMN password_hash");
  userColumns = db.prepare("PRAGMA table_info(users)").all().map((column) => String(column.name));
}

export type AuthUser = { id: string; fullName: string; email: string; phone: string; createdAt: string; avatarUrl: string | null };
export const normalizeEmail = (email: string) => email.trim().toLowerCase();
const hashPin = (pin: string, salt = randomBytes(16).toString("hex")) => {
  const derived = scryptSync(pin, salt, 64).toString("hex");
  return `${salt}:${derived}`;
};
const pinMatches = (pin: string, stored: string) => {
  const [salt, expectedHex] = stored.split(":");
  if (!salt || !expectedHex) return false;
  const expected = Buffer.from(expectedHex, "hex");
  const actual = scryptSync(pin, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
};
const tokenHash = (token: string) => createHash("sha256").update(token).digest("hex");

export function registerUser(input: { fullName: string; email: string; phone: string; pin: string }) {
  const id = randomUUID();
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare("INSERT INTO users (id, full_name, email, phone, pin_hash) VALUES (?, ?, ?, ?, ?)")
      .run(id, input.fullName.trim(), normalizeEmail(input.email), input.phone.trim(), hashPin(input.pin));
    db.prepare("INSERT INTO user_profiles (user_id, full_name) VALUES (?, ?)").run(id, input.fullName.trim());
    db.prepare("INSERT INTO registration_events (id, user_id, event_type) VALUES (?, ?, 'account_created')").run(randomUUID(), id);
    db.exec("COMMIT");
    return { success: true as const };
  } catch (error) {
    db.exec("ROLLBACK");
    const message = error instanceof Error ? error.message : "";
    if (message.includes("users.email")) return { success: false as const, reason: "email" as const };
    if (message.includes("users.phone")) return { success: false as const, reason: "phone" as const };
    throw error;
  }
}

export function verifyUserPin(userId: string, pin: string) {
  const row = db.prepare("SELECT pin_hash, account_status FROM users WHERE id=?").get(userId);
  return Boolean(row && row.account_status === "active" && row.pin_hash && pinMatches(pin, String(row.pin_hash)));
}

export function createSession(email: string, pin: string) {
  const row = db.prepare(`SELECT users.id, users.full_name, users.email, users.phone, users.created_at,
    users.pin_hash, users.account_status, user_profiles.avatar_url, user_profiles.updated_at AS profile_updated_at
    FROM users LEFT JOIN user_profiles ON user_profiles.user_id = users.id WHERE users.email = ?`)
    .get(normalizeEmail(email));
  if (!row || row.account_status !== "active" || !row.pin_hash || !pinMatches(pin, String(row.pin_hash))) return null;
  const rawToken = randomBytes(32).toString("base64url");
  const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();
  db.prepare("INSERT INTO user_sessions (id, user_id, refresh_token_hash, created_at, expires_at) VALUES (?, ?, ?, ?, ?)")
    .run(randomUUID(), row.id, tokenHash(rawToken), new Date().toISOString(), expiry);
  const avatarUrl = row.avatar_url ? `/api/profile/photo?v=${encodeURIComponent(String(row.profile_updated_at ?? ""))}` : null;
  return { token: rawToken, user: { id: String(row.id), fullName: String(row.full_name), email: String(row.email), phone: String(row.phone), createdAt: String(row.created_at), avatarUrl } satisfies AuthUser };
}

export function getUserForSession(token: string | undefined): AuthUser | null {
  if (!token) return null;
  const row = db.prepare(`SELECT users.id, users.full_name, users.email, users.phone, users.created_at,
    user_profiles.avatar_url, user_profiles.updated_at AS profile_updated_at FROM user_sessions
    JOIN users ON users.id = user_sessions.user_id
    LEFT JOIN user_profiles ON user_profiles.user_id = users.id
    WHERE user_sessions.refresh_token_hash = ? AND user_sessions.revoked_at IS NULL
      AND user_sessions.expires_at > ? AND users.account_status = 'active'`)
    .get(tokenHash(token), new Date().toISOString());
  const avatarUrl = row?.avatar_url ? `/api/profile/photo?v=${encodeURIComponent(String(row.profile_updated_at ?? ""))}` : null;
  return row ? { id: String(row.id), fullName: String(row.full_name), email: String(row.email), phone: String(row.phone), createdAt: String(row.created_at), avatarUrl } : null;
}

export function updateUserProfile(userId: string, fullName: string, avatarMime?: string, avatarFilename?: string) {
  const normalizedName = fullName.trim().replace(/\s+/g, " ");
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare("UPDATE users SET full_name = ? WHERE id = ?").run(normalizedName, userId);
    db.prepare(`INSERT INTO user_profiles (user_id, full_name, avatar_url, avatar_mime, updated_at)
      VALUES (?, ?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ','now'))
      ON CONFLICT(user_id) DO UPDATE SET full_name = excluded.full_name,
        avatar_url = COALESCE(excluded.avatar_url, user_profiles.avatar_url),
        avatar_mime = COALESCE(excluded.avatar_mime, user_profiles.avatar_mime),
        updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')`)
      .run(userId, normalizedName, avatarMime ? avatarFilename ?? null : null, avatarMime ?? null);
    db.exec("COMMIT");
    return { success: true as const };
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

export function getUserProfilePhoto(userId: string) {
  const row = db.prepare("SELECT avatar_url, avatar_mime FROM user_profiles WHERE user_id = ?").get(userId);
  if (!row?.avatar_url || !row.avatar_mime) return null;
  return { mimeType: String(row.avatar_mime), filename: String(row.avatar_url) };
}

export function revokeSession(token: string | undefined) {
  if (!token) return;
  db.prepare("UPDATE user_sessions SET revoked_at = ? WHERE refresh_token_hash = ? AND revoked_at IS NULL")
    .run(new Date().toISOString(), tokenHash(token));
}
