import "server-only";
import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { execute, queryOne, withTransaction } from "@/lib/postgres";

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  avatarUrl: string | null;
};

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

function isUniqueViolation(error: unknown): error is { code: string; constraint: string } {
  return typeof error === "object" && error !== null && "code" in error && "constraint" in error
    && error.code === "23505" && typeof error.constraint === "string";
}

export async function registerUser(input: { fullName: string; email: string; phone: string; pin: string }) {
  const id = randomUUID();
  const fullName = input.fullName.trim();
  try {
    await withTransaction(async (client) => {
      await client.query(
        "INSERT INTO users (id, full_name, email, phone, pin_hash) VALUES ($1, $2, $3, $4, $5)",
        [id, fullName, normalizeEmail(input.email), input.phone.trim(), hashPin(input.pin)],
      );
      await client.query("INSERT INTO user_profiles (user_id, full_name) VALUES ($1, $2)", [id, fullName]);
      await client.query(
        "INSERT INTO registration_events (id, user_id, event_type) VALUES ($1, $2, 'account_created')",
        [randomUUID(), id],
      );
    });
    return { success: true as const };
  } catch (error) {
    if (isUniqueViolation(error)) {
      if (error.constraint === "users_email_lower_unique") return { success: false as const, reason: "email" as const };
      if (error.constraint === "users_phone_key") return { success: false as const, reason: "phone" as const };
    }
    throw error;
  }
}

export async function verifyUserPin(userId: string, pin: string) {
  const row = await queryOne("SELECT pin_hash, account_status FROM users WHERE id = $1", [userId]);
  return Boolean(row && row.account_status === "active" && row.pin_hash && pinMatches(pin, String(row.pin_hash)));
}

export async function createSession(email: string, pin: string) {
  const row = await queryOne(`SELECT users.id, users.full_name, users.email, users.phone, users.created_at,
    users.pin_hash, users.account_status, user_profiles.avatar_data, user_profiles.updated_at AS profile_updated_at
    FROM users LEFT JOIN user_profiles ON user_profiles.user_id = users.id WHERE users.email = $1`,
  [normalizeEmail(email)]);
  if (!row || row.account_status !== "active" || !row.pin_hash || !pinMatches(pin, String(row.pin_hash))) return null;

  const rawToken = randomBytes(32).toString("base64url");
  const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();
  await execute(
    "INSERT INTO user_sessions (id, user_id, refresh_token_hash, created_at, expires_at) VALUES ($1, $2, $3, $4, $5)",
    [randomUUID(), row.id, tokenHash(rawToken), new Date().toISOString(), expiry],
  );
  const avatarUrl = row.avatar_data
    ? `/api/profile/photo?v=${encodeURIComponent(String(row.profile_updated_at ?? ""))}`
    : null;
  return {
    token: rawToken,
    user: {
      id: String(row.id),
      fullName: String(row.full_name),
      email: String(row.email),
      phone: String(row.phone),
      createdAt: String(row.created_at),
      avatarUrl,
    } satisfies AuthUser,
  };
}

export async function getUserForSession(token: string | undefined): Promise<AuthUser | null> {
  if (!token) return null;
  const row = await queryOne(`SELECT users.id, users.full_name, users.email, users.phone, users.created_at,
    user_profiles.avatar_data, user_profiles.updated_at AS profile_updated_at FROM user_sessions
    JOIN users ON users.id = user_sessions.user_id
    LEFT JOIN user_profiles ON user_profiles.user_id = users.id
    WHERE user_sessions.refresh_token_hash = $1 AND user_sessions.revoked_at IS NULL
      AND user_sessions.expires_at > $2 AND users.account_status = 'active'`,
  [tokenHash(token), new Date().toISOString()]);
  const avatarUrl = row?.avatar_data
    ? `/api/profile/photo?v=${encodeURIComponent(String(row.profile_updated_at ?? ""))}`
    : null;
  return row ? {
    id: String(row.id),
    fullName: String(row.full_name),
    email: String(row.email),
    phone: String(row.phone),
    createdAt: String(row.created_at),
    avatarUrl,
  } : null;
}

export async function revokeSession(token: string | undefined) {
  if (!token) return;
  await execute(
    "UPDATE user_sessions SET revoked_at = $1 WHERE refresh_token_hash = $2 AND revoked_at IS NULL",
    [new Date().toISOString(), tokenHash(token)],
  );
}
