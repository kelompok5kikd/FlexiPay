import "server-only";
import { DatabaseSync as NodeDatabaseSync } from "node:sqlite";
import { join } from "node:path";

type Statement = {
  run: (...values: unknown[]) => { changes: number };
  get: (...values: unknown[]) => Record<string, unknown> | undefined;
};
type Database = { exec: (sql: string) => void; prepare: (sql: string) => Statement };
const DatabaseSync = NodeDatabaseSync as unknown as new (path: string) => Database;
const db = new DatabaseSync(join(process.cwd(), "data", "flexipay.db"));
db.exec("PRAGMA busy_timeout = 10000; PRAGMA foreign_keys = ON;");

export function saveProfile(userId: string, fullName: string, avatarMime?: string, avatarFilename?: string) {
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
  } catch (error) {
    try { db.exec("ROLLBACK"); } catch { /* Preserve the original database error. */ }
    throw error;
  }
}

export function readProfilePhoto(userId: string) {
  const row = db.prepare("SELECT avatar_url, avatar_mime FROM user_profiles WHERE user_id = ?").get(userId);
  if (!row?.avatar_url || !row.avatar_mime) return null;
  return { mimeType: String(row.avatar_mime), filename: String(row.avatar_url) };
}
