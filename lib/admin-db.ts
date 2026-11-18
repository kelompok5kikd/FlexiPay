import "server-only";
import { DatabaseSync as NodeDatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { normalizeEmail } from "@/lib/auth-db";

type Statement = {
  run: (...args: unknown[]) => { changes: number };
  get: (...args: unknown[]) => Record<string, unknown> | undefined;
  all: (...args: unknown[]) => Record<string, unknown>[];
};
type Database = { exec: (sql: string) => void; prepare: (sql: string) => Statement };
const DatabaseSync = NodeDatabaseSync as unknown as new (path: string) => Database;
const dataDirectory = join(process.cwd(), "data");
mkdirSync(dataDirectory, { recursive: true });
const db = new DatabaseSync(join(dataDirectory, "flexipay.db"));
db.exec(`
  PRAGMA foreign_keys = ON;
  PRAGMA busy_timeout = 10000;
  CREATE TABLE IF NOT EXISTS admin_accounts (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL COLLATE NOCASE UNIQUE,
    pin_hash TEXT NOT NULL,
    role_code TEXT NOT NULL DEFAULT 'super_admin' CHECK (role_code IN ('admin_viewer','credit_reviewer','credit_approver','super_admin')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','locked')),
    last_login_at TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE TABLE IF NOT EXISTS admin_sessions (
    id TEXT PRIMARY KEY,
    admin_id TEXT NOT NULL REFERENCES admin_accounts(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    revoked_at TEXT
  );
  CREATE TABLE IF NOT EXISTS auth_activity_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    admin_id TEXT REFERENCES admin_accounts(id) ON DELETE SET NULL,
    email TEXT NOT NULL COLLATE NOCASE,
    event_type TEXT NOT NULL CHECK (event_type IN ('login_success','login_failed','logout')),
    channel TEXT NOT NULL,
    occurred_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE INDEX IF NOT EXISTS idx_auth_activity_user_time ON auth_activity_logs(user_id, occurred_at DESC);
  CREATE INDEX IF NOT EXISTS idx_auth_activity_email_time ON auth_activity_logs(email, occurred_at DESC);
  CREATE TABLE IF NOT EXISTS admin_credit_reviews (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    admin_id TEXT NOT NULL REFERENCES admin_accounts(id),
    review_status TEXT NOT NULL CHECK (review_status IN ('in_review','needs_revision','eligible','not_eligible')),
    approved_limit REAL CHECK (approved_limit IS NULL OR approved_limit > 0),
    decision_reason TEXT NOT NULL,
    assessment_notes TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE INDEX IF NOT EXISTS idx_admin_reviews_user_time ON admin_credit_reviews(user_id, created_at DESC);
  CREATE TABLE IF NOT EXISTS admin_audit_logs (
    id TEXT PRIMARY KEY,
    admin_id TEXT NOT NULL REFERENCES admin_accounts(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    reason TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
`);
// Surface existing session history from the earlier authentication implementation.
db.exec(`
  INSERT OR IGNORE INTO auth_activity_logs (id,user_id,admin_id,email,event_type,channel,occurred_at)
    SELECT 'session-login-' || user_sessions.id,user_sessions.user_id,NULL,users.email,'login_success','web',user_sessions.created_at
    FROM user_sessions JOIN users ON users.id=user_sessions.user_id;
  INSERT OR IGNORE INTO auth_activity_logs (id,user_id,admin_id,email,event_type,channel,occurred_at)
    SELECT 'session-logout-' || user_sessions.id,user_sessions.user_id,NULL,users.email,'logout','web',user_sessions.revoked_at
    FROM user_sessions JOIN users ON users.id=user_sessions.user_id WHERE user_sessions.revoked_at IS NOT NULL;
`);

const hashSecret = (value: string, salt = randomBytes(16).toString("hex")) => `${salt}:${scryptSync(value, salt, 64).toString("hex")}`;
const verifySecret = (value: string, encoded: string) => {
  const [salt, digest] = encoded.split(":");
  if (!salt || !digest) return false;
  const expected = Buffer.from(digest, "hex");
  const actual = scryptSync(value, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
};
const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

function seedConfiguredAdmin() {
  const email = process.env.FLEXIPAY_ADMIN_EMAIL;
  const pin = process.env.FLEXIPAY_ADMIN_PIN;
  if (!email || !pin) return;
  const normalized = normalizeEmail(email);
  const existing = db.prepare("SELECT id FROM admin_accounts WHERE email = ?").get(normalized);
  if (!existing) {
    db.prepare("INSERT INTO admin_accounts (id, full_name, email, pin_hash, role_code) VALUES (?, ?, ?, ?, 'super_admin')")
      .run(randomUUID(), "Admin FlexiPay", normalized, hashSecret(pin));
  }
}
seedConfiguredAdmin();

function logAuth(email: string, eventType: "login_success" | "login_failed" | "logout", userId: string | null, adminId: string | null, channel: string) {
  db.prepare("INSERT INTO auth_activity_logs (id,user_id,admin_id,email,event_type,channel) VALUES (?,?,?,?,?,?)")
    .run(randomUUID(), userId, adminId, normalizeEmail(email), eventType, channel);
}

export function recordUserLoginFailure(email: string) {
  const normalized = normalizeEmail(email || "unknown");
  const user = db.prepare("SELECT id FROM users WHERE email=?").get(normalized);
  logAuth(normalized, "login_failed", user ? String(user.id) : null, null, "web");
}

export function recordAdminLoginFailure(email: string) {
  logAuth(email || "unknown", "login_failed", null, null, "admin_portal");
}

export function recordUserLoginSuccess(userId: string, email: string) {
  logAuth(email, "login_success", userId, null, "web");
}

export function recordUserLogout(token: string | undefined) {
  if (!token) return;
  const row = db.prepare(`SELECT users.id,users.email FROM user_sessions JOIN users ON users.id=user_sessions.user_id
    WHERE user_sessions.refresh_token_hash=? AND user_sessions.revoked_at IS NULL`).get(hashToken(token));
  if (row) logAuth(String(row.email), "logout", String(row.id), null, "web");
}

export type AdminUser = { id: string; fullName: string; email: string; role: string };
export function createAdminSession(email: string, pin: string) {
  const normalized = normalizeEmail(email);
  const row = db.prepare("SELECT id,full_name,email,pin_hash,role_code,status FROM admin_accounts WHERE email = ?").get(normalized);
  const recentFailures = db.prepare(`SELECT COUNT(*) AS count FROM auth_activity_logs
    WHERE email=? AND channel='admin_portal' AND event_type='login_failed' AND occurred_at>?`)
    .get(normalized || "unknown", new Date(Date.now() - 15 * 60 * 1000).toISOString());
  if (Number(recentFailures?.count ?? 0) >= 8) return null;
  if (!row || row.status !== "active" || !verifySecret(pin, String(row.pin_hash))) {
    logAuth(normalized || "unknown", "login_failed", null, row ? String(row.id) : null, "admin_portal");
    return null;
  }
  const rawToken = randomBytes(32).toString("base64url");
  const now = new Date();
  const expires = new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString();
  db.prepare("INSERT INTO admin_sessions (id,admin_id,token_hash,created_at,expires_at) VALUES (?,?,?,?,?)")
    .run(randomUUID(), row.id, hashToken(rawToken), now.toISOString(), expires);
  db.prepare("UPDATE admin_accounts SET last_login_at = ? WHERE id = ?").run(now.toISOString(), row.id);
  logAuth(String(row.email), "login_success", null, String(row.id), "admin_portal");
  return { token: rawToken, admin: { id: String(row.id), fullName: String(row.full_name), email: String(row.email), role: String(row.role_code) } satisfies AdminUser };
}

export function getAdminForSession(token: string | undefined): AdminUser | null {
  if (!token) return null;
  const row = db.prepare(`SELECT admin_accounts.id,admin_accounts.full_name,admin_accounts.email,admin_accounts.role_code
    FROM admin_sessions JOIN admin_accounts ON admin_accounts.id=admin_sessions.admin_id
    WHERE admin_sessions.token_hash=? AND admin_sessions.revoked_at IS NULL AND admin_sessions.expires_at>? AND admin_accounts.status='active'`)
    .get(hashToken(token), new Date().toISOString());
  return row ? { id: String(row.id), fullName: String(row.full_name), email: String(row.email), role: String(row.role_code) } : null;
}

export function revokeAdminSession(token: string | undefined) {
  if (!token) return;
  const tokenDigest = hashToken(token);
  const row = db.prepare(`SELECT admin_accounts.id,admin_accounts.email FROM admin_sessions JOIN admin_accounts ON admin_accounts.id=admin_sessions.admin_id WHERE token_hash=? AND revoked_at IS NULL`).get(tokenDigest);
  if (!row) return;
  db.prepare("UPDATE admin_sessions SET revoked_at=? WHERE token_hash=? AND revoked_at IS NULL").run(new Date().toISOString(), tokenDigest);
  logAuth(String(row.email), "logout", null, String(row.id), "admin_portal");
}

export type AdminOverview = {
  stats: { totalUsers: number; usersLoggedIn: number; totalLogins: number; pendingReviews: number };
  users: Array<{ id: string; fullName: string; email: string; phone: string; status: string; registeredAt: string; lastLoginAt: string | null; loginCount: number; reviewStatus: string | null; approvedLimit: number | null; reason: string | null }>;
  activity: Array<{ email: string; eventType: string; channel: string; occurredAt: string }>;
};

export function getAdminOverview(): AdminOverview {
  const totals = db.prepare(`SELECT COUNT(*) AS total_users,
    SUM(CASE WHEN login_count > 0 THEN 1 ELSE 0 END) AS users_logged_in,
    SUM(login_count) AS total_logins
    FROM (SELECT users.id, COUNT(auth_activity_logs.id) AS login_count FROM users
      LEFT JOIN auth_activity_logs ON auth_activity_logs.user_id=users.id AND auth_activity_logs.event_type='login_success'
      GROUP BY users.id)`).get();
  const users = db.prepare(`SELECT users.id,users.full_name,users.email,users.phone,users.account_status,users.created_at,
    (SELECT MAX(occurred_at) FROM auth_activity_logs WHERE auth_activity_logs.user_id=users.id AND event_type='login_success') AS last_login_at,
    (SELECT COUNT(*) FROM auth_activity_logs WHERE auth_activity_logs.user_id=users.id AND event_type='login_success') AS login_count,
    (SELECT review_status FROM admin_credit_reviews WHERE admin_credit_reviews.user_id=users.id ORDER BY created_at DESC LIMIT 1) AS review_status,
    (SELECT approved_limit FROM admin_credit_reviews WHERE admin_credit_reviews.user_id=users.id ORDER BY created_at DESC LIMIT 1) AS approved_limit,
    (SELECT decision_reason FROM admin_credit_reviews WHERE admin_credit_reviews.user_id=users.id ORDER BY created_at DESC LIMIT 1) AS decision_reason
    FROM users ORDER BY users.created_at DESC`).all();
  const activity = db.prepare(`SELECT email,event_type,channel,occurred_at FROM auth_activity_logs
    WHERE user_id IS NOT NULL ORDER BY occurred_at DESC LIMIT 40`).all();
  const pending = db.prepare(`SELECT COUNT(*) AS count FROM admin_credit_reviews AS reviews
    WHERE reviews.created_at=(SELECT MAX(latest.created_at) FROM admin_credit_reviews AS latest WHERE latest.user_id=reviews.user_id)
      AND reviews.review_status IN ('in_review','needs_revision')`).get();
  return {
    stats: { totalUsers: Number(totals?.total_users ?? 0), usersLoggedIn: Number(totals?.users_logged_in ?? 0), totalLogins: Number(totals?.total_logins ?? 0), pendingReviews: Number(pending?.count ?? 0) },
    users: users.map((row) => ({ id: String(row.id), fullName: String(row.full_name), email: String(row.email), phone: String(row.phone), status: String(row.account_status), registeredAt: String(row.created_at), lastLoginAt: row.last_login_at ? String(row.last_login_at) : null, loginCount: Number(row.login_count ?? 0), reviewStatus: row.review_status ? String(row.review_status) : null, approvedLimit: row.approved_limit == null ? null : Number(row.approved_limit), reason: row.decision_reason ? String(row.decision_reason) : null })),
    activity: activity.map((row) => ({ email: String(row.email), eventType: String(row.event_type), channel: String(row.channel), occurredAt: String(row.occurred_at) })),
  };
}

export function saveAdminReview(input: { userId: string; adminId: string; status: "in_review" | "needs_revision" | "eligible" | "not_eligible"; approvedLimit: number | null; reason: string; notes: string }) {
  const user = db.prepare("SELECT id FROM users WHERE id=?").get(input.userId);
  if (!user) return { success: false as const, reason: "user" as const };
  const id = randomUUID();
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare(`INSERT INTO admin_credit_reviews (id,user_id,admin_id,review_status,approved_limit,decision_reason,assessment_notes)
      VALUES (?,?,?,?,?,?,?)`).run(id, input.userId, input.adminId, input.status, input.approvedLimit, input.reason, input.notes);
    db.prepare(`INSERT INTO admin_audit_logs (id,admin_id,action,entity_type,entity_id,reason)
      VALUES (?,?,?,?,?,?)`).run(randomUUID(), input.adminId, "credit_review_recorded", "users", input.userId, input.reason);
    db.exec("COMMIT");
    return { success: true as const };
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}
