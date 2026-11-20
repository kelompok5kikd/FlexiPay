import "server-only";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { withTransaction, queryOne } from "@/lib/postgres";

function encryptionKey() {
  const encoded = process.env.FLEXIPAY_DATA_ENCRYPTION_KEY;
  if (!encoded || !/^[a-f0-9]{64}$/i.test(encoded)) throw new Error("FLEXIPAY_DATA_ENCRYPTION_KEY belum dikonfigurasi.");
  return Buffer.from(encoded, "hex");
}

function encryptPhoto(content: Buffer) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(content), cipher.final()]);
  return Buffer.concat([Buffer.from("FP1"), iv, cipher.getAuthTag(), encrypted]);
}

function decryptPhoto(content: Buffer) {
  if (content.length < 31 || content.subarray(0, 3).toString() !== "FP1") {
    throw new Error("Foto profil terenkripsi tidak valid.");
  }
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), content.subarray(3, 15));
  decipher.setAuthTag(content.subarray(15, 31));
  return Buffer.concat([decipher.update(content.subarray(31)), decipher.final()]);
}

export async function saveProfile(
  userId: string,
  fullName: string,
  avatar?: { mimeType: string; content: Buffer },
) {
  const normalizedName = fullName.trim().replace(/\s+/g, " ");
  const updatedAt = new Date().toISOString();
  await withTransaction(async (client) => {
    await client.query("UPDATE users SET full_name = $1 WHERE id = $2", [normalizedName, userId]);
    await client.query(`INSERT INTO user_profiles (user_id, full_name, avatar_url, avatar_mime, avatar_data, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT(user_id) DO UPDATE SET full_name = EXCLUDED.full_name,
        avatar_url = COALESCE(EXCLUDED.avatar_url, user_profiles.avatar_url),
        avatar_mime = COALESCE(EXCLUDED.avatar_mime, user_profiles.avatar_mime),
        avatar_data = COALESCE(EXCLUDED.avatar_data, user_profiles.avatar_data),
        updated_at = EXCLUDED.updated_at`,
    [
      userId,
      normalizedName,
      avatar ? "database" : null,
      avatar?.mimeType ?? null,
      avatar ? encryptPhoto(avatar.content) : null,
      updatedAt,
    ]);
  });
}

export async function readProfilePhoto(userId: string) {
  const row = await queryOne("SELECT avatar_mime, avatar_data FROM user_profiles WHERE user_id = $1", [userId]);
  if (!row?.avatar_mime || !row.avatar_data) return null;
  const data = Buffer.isBuffer(row.avatar_data) ? row.avatar_data : Buffer.from(row.avatar_data as Uint8Array);
  return { mimeType: String(row.avatar_mime), content: decryptPhoto(data) };
}
