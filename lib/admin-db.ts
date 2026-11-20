import "server-only";
import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { normalizeEmail } from "@/lib/auth-db";
import { execute, queryOne, queryRows, withTransaction, type DbClient } from "@/lib/postgres";

const hashSecret = (value: string, salt = randomBytes(16).toString("hex")) =>
  `${salt}:${scryptSync(value, salt, 64).toString("hex")}`;

const verifySecret = (value: string, encoded: string) => {
  const [salt, digest] = encoded.split(":");
  if (!salt || !digest) return false;
  const expected = Buffer.from(digest, "hex");
  const actual = scryptSync(value, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
};

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

async function seedConfiguredAdmin() {
  const email = process.env.FLEXIPAY_ADMIN_EMAIL;
  const pin = process.env.FLEXIPAY_ADMIN_PIN;
  if (!email || !pin) return;
  const normalized = normalizeEmail(email);
  const existing = await queryOne("SELECT id FROM admin_accounts WHERE email = $1", [normalized]);
  if (!existing) {
    await execute(
      "INSERT INTO admin_accounts (id, full_name, email, pin_hash, role_code) VALUES ($1, $2, $3, $4, 'super_admin') ON CONFLICT DO NOTHING",
      [randomUUID(), "Admin FlexiPay", normalized, hashSecret(pin)],
    );
  }
}

async function logAuth(
  email: string,
  eventType: "login_success" | "login_failed" | "logout",
  userId: string | null,
  adminId: string | null,
  channel: string,
  client?: DbClient,
) {
  const sql = "INSERT INTO auth_activity_logs (id,user_id,admin_id,email,event_type,channel) VALUES ($1,$2,$3,$4,$5,$6)";
  const values = [randomUUID(), userId, adminId, normalizeEmail(email), eventType, channel];
  if (client) await client.query(sql, values);
  else await execute(sql, values);
}

export async function recordUserLoginFailure(email: string) {
  const normalized = normalizeEmail(email || "unknown");
  const user = await queryOne("SELECT id FROM users WHERE email = $1", [normalized]);
  await logAuth(normalized, "login_failed", user ? String(user.id) : null, null, "web");
}

export async function recordAdminLoginFailure(email: string) {
  await logAuth(email || "unknown", "login_failed", null, null, "admin_portal");
}

export async function recordUserLoginSuccess(userId: string, email: string) {
  await logAuth(email, "login_success", userId, null, "web");
}

export async function recordUserLogout(token: string | undefined) {
  if (!token) return;
  const row = await queryOne(`SELECT users.id, users.email FROM user_sessions
    JOIN users ON users.id = user_sessions.user_id
    WHERE user_sessions.refresh_token_hash = $1 AND user_sessions.revoked_at IS NULL`,
  [hashToken(token)]);
  if (row) await logAuth(String(row.email), "logout", String(row.id), null, "web");
}

export type AdminUser = { id: string; fullName: string; email: string; role: string };

export async function createAdminSession(email: string, pin: string) {
  await seedConfiguredAdmin();
  const normalized = normalizeEmail(email);
  const row = await queryOne(
    "SELECT id,full_name,email,pin_hash,role_code,status FROM admin_accounts WHERE email = $1",
    [normalized],
  );
  const recentFailures = await queryOne(`SELECT COUNT(*) AS count FROM auth_activity_logs
    WHERE email = $1 AND channel = 'admin_portal' AND event_type = 'login_failed' AND occurred_at > $2`,
  [normalized || "unknown", new Date(Date.now() - 15 * 60 * 1000).toISOString()]);
  if (Number(recentFailures?.count ?? 0) >= 8) return null;
  if (!row || row.status !== "active" || !verifySecret(pin, String(row.pin_hash))) {
    await logAuth(normalized || "unknown", "login_failed", null, row ? String(row.id) : null, "admin_portal");
    return null;
  }

  const rawToken = randomBytes(32).toString("base64url");
  const now = new Date();
  const expires = new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString();
  await withTransaction(async (client) => {
    await client.query(
      "INSERT INTO admin_sessions (id,admin_id,token_hash,created_at,expires_at) VALUES ($1,$2,$3,$4,$5)",
      [randomUUID(), row.id, hashToken(rawToken), now.toISOString(), expires],
    );
    await client.query("UPDATE admin_accounts SET last_login_at = $1 WHERE id = $2", [now.toISOString(), row.id]);
    await logAuth(String(row.email), "login_success", null, String(row.id), "admin_portal", client);
  });
  return {
    token: rawToken,
    admin: {
      id: String(row.id),
      fullName: String(row.full_name),
      email: String(row.email),
      role: String(row.role_code),
    } satisfies AdminUser,
  };
}

export async function getAdminForSession(token: string | undefined): Promise<AdminUser | null> {
  if (!token) return null;
  const row = await queryOne(`SELECT admin_accounts.id,admin_accounts.full_name,admin_accounts.email,admin_accounts.role_code
    FROM admin_sessions JOIN admin_accounts ON admin_accounts.id = admin_sessions.admin_id
    WHERE admin_sessions.token_hash = $1 AND admin_sessions.revoked_at IS NULL
      AND admin_sessions.expires_at > $2 AND admin_accounts.status = 'active'`,
  [hashToken(token), new Date().toISOString()]);
  return row ? {
    id: String(row.id),
    fullName: String(row.full_name),
    email: String(row.email),
    role: String(row.role_code),
  } : null;
}

export async function revokeAdminSession(token: string | undefined) {
  if (!token) return;
  const tokenDigest = hashToken(token);
  const row = await queryOne(`SELECT admin_accounts.id,admin_accounts.email
    FROM admin_sessions JOIN admin_accounts ON admin_accounts.id = admin_sessions.admin_id
    WHERE admin_sessions.token_hash = $1 AND admin_sessions.revoked_at IS NULL`,
  [tokenDigest]);
  if (!row) return;
  await withTransaction(async (client) => {
    await client.query(
      "UPDATE admin_sessions SET revoked_at = $1 WHERE token_hash = $2 AND revoked_at IS NULL",
      [new Date().toISOString(), tokenDigest],
    );
    await logAuth(String(row.email), "logout", null, String(row.id), "admin_portal", client);
  });
}

export type AdminOverview = {
  stats: { totalUsers: number; usersLoggedIn: number; totalLogins: number; pendingReviews: number };
  users: Array<{ id: string; fullName: string; email: string; phone: string; status: string; registeredAt: string; lastLoginAt: string | null; loginCount: number; reviewStatus: string | null; approvedLimit: number | null; reason: string | null }>;
  activity: Array<{ email: string; eventType: string; channel: string; occurredAt: string }>;
};

export async function getAdminOverview(): Promise<AdminOverview> {
  const [totals, users, activity, pending] = await Promise.all([
    queryOne(`SELECT COUNT(*) AS total_users,
      SUM(CASE WHEN login_count > 0 THEN 1 ELSE 0 END) AS users_logged_in,
      SUM(login_count) AS total_logins
      FROM (SELECT users.id, COUNT(auth_activity_logs.id) AS login_count FROM users
        LEFT JOIN auth_activity_logs ON auth_activity_logs.user_id = users.id AND auth_activity_logs.event_type = 'login_success'
        GROUP BY users.id) AS user_counts`),
    queryRows(`SELECT users.id,users.full_name,users.email,users.phone,users.account_status,users.created_at,
      (SELECT MAX(occurred_at) FROM auth_activity_logs WHERE auth_activity_logs.user_id = users.id AND event_type = 'login_success') AS last_login_at,
      (SELECT COUNT(*) FROM auth_activity_logs WHERE auth_activity_logs.user_id = users.id AND event_type = 'login_success') AS login_count,
      (SELECT review_status FROM admin_credit_reviews WHERE admin_credit_reviews.user_id = users.id ORDER BY created_at DESC LIMIT 1) AS review_status,
      (SELECT approved_limit FROM admin_credit_reviews WHERE admin_credit_reviews.user_id = users.id ORDER BY created_at DESC LIMIT 1) AS approved_limit,
      (SELECT decision_reason FROM admin_credit_reviews WHERE admin_credit_reviews.user_id = users.id ORDER BY created_at DESC LIMIT 1) AS decision_reason
      FROM users ORDER BY users.created_at DESC`),
    queryRows(`SELECT email,event_type,channel,occurred_at FROM auth_activity_logs
      WHERE user_id IS NOT NULL ORDER BY occurred_at DESC LIMIT 40`),
    queryOne(`SELECT COUNT(*) AS count FROM admin_credit_reviews AS reviews
      WHERE reviews.created_at = (SELECT MAX(latest.created_at) FROM admin_credit_reviews AS latest WHERE latest.user_id = reviews.user_id)
        AND reviews.review_status IN ('in_review','needs_revision')`),
  ]);
  return {
    stats: {
      totalUsers: Number(totals?.total_users ?? 0),
      usersLoggedIn: Number(totals?.users_logged_in ?? 0),
      totalLogins: Number(totals?.total_logins ?? 0),
      pendingReviews: Number(pending?.count ?? 0),
    },
    users: users.map((row) => ({
      id: String(row.id),
      fullName: String(row.full_name),
      email: String(row.email),
      phone: String(row.phone),
      status: String(row.account_status),
      registeredAt: String(row.created_at),
      lastLoginAt: row.last_login_at ? String(row.last_login_at) : null,
      loginCount: Number(row.login_count ?? 0),
      reviewStatus: row.review_status ? String(row.review_status) : null,
      approvedLimit: row.approved_limit == null ? null : Number(row.approved_limit),
      reason: row.decision_reason ? String(row.decision_reason) : null,
    })),
    activity: activity.map((row) => ({
      email: String(row.email),
      eventType: String(row.event_type),
      channel: String(row.channel),
      occurredAt: String(row.occurred_at),
    })),
  };
}

export async function saveAdminReview(input: {
  userId: string;
  adminId: string;
  status: "in_review" | "needs_revision" | "eligible" | "not_eligible";
  approvedLimit: number | null;
  reason: string;
  notes: string;
}) {
  const user = await queryOne("SELECT id FROM users WHERE id = $1", [input.userId]);
  if (!user) return { success: false as const, reason: "user" as const };
  await withTransaction(async (client) => {
    await client.query(`INSERT INTO admin_credit_reviews
      (id,user_id,admin_id,review_status,approved_limit,decision_reason,assessment_notes)
      VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [randomUUID(), input.userId, input.adminId, input.status, input.approvedLimit, input.reason, input.notes]);
    await client.query(`INSERT INTO admin_audit_logs (id,admin_id,action,entity_type,entity_id,reason)
      VALUES ($1,$2,$3,$4,$5,$6)`,
    [randomUUID(), input.adminId, "credit_review_recorded", "users", input.userId, input.reason]);
  });
  return { success: true as const };
}
