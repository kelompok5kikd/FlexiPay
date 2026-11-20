import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { loadEnvConfig } from "@next/env";
import { Pool } from "@neondatabase/serverless";
import { postgresSchema } from "../lib/postgres-schema.ts";

loadEnvConfig(process.cwd());

const sourcePath = join(process.cwd(), "data", "flexipay.db");
const profileDirectory = join(process.cwd(), "data", "profile-photos");
const documentDirectory = join(process.cwd(), "data", "credit-documents");
const tableOrder = [
  "users",
  "user_profiles",
  "registration_events",
  "admin_accounts",
  "user_sessions",
  "admin_sessions",
  "auth_activity_logs",
  "admin_credit_reviews",
  "admin_audit_logs",
  "credit_applications",
  "credit_application_decisions",
  "commerce_products",
  "rental_owners",
  "rental_listings",
  "commerce_orders",
  "credit_limit_ledger",
  "transaction_pin_attempts",
  "installments",
  "installment_payments",
];
const upsertTables = new Set(["commerce_products", "rental_owners", "rental_listings"]);
const photoExtensions = new Map([["image/jpeg", "jpg"], ["image/png", "png"], ["image/webp", "webp"]]);

function getEncryptionKey() {
  const value = process.env.FLEXIPAY_DATA_ENCRYPTION_KEY;
  if (!value || !/^[a-f0-9]{64}$/i.test(value)) {
    throw new Error("FLEXIPAY_DATA_ENCRYPTION_KEY must be configured before migrating.");
  }
  return Buffer.from(value, "hex");
}

function decryptRecord(value, key) {
  const content = Buffer.from(value, "base64");
  if (content.length < 31 || content.subarray(0, 3).toString() !== "FP1") {
    throw new Error("An encrypted local record has an unsupported format.");
  }
  const decipher = createDecipheriv("aes-256-gcm", key, content.subarray(3, 15));
  decipher.setAuthTag(content.subarray(15, 31));
  return JSON.parse(Buffer.concat([decipher.update(content.subarray(31)), decipher.final()]).toString("utf8"));
}

function encryptPhoto(content, key) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(content), cipher.final()]);
  return Buffer.concat([Buffer.from("FP1"), iv, cipher.getAuthTag(), encrypted]);
}

function quoteIdentifier(identifier) {
  if (!/^[a-z_]+$/.test(identifier)) throw new Error("Unexpected SQLite identifier.");
  return `"${identifier}"`;
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL must be configured in the environment.");
  const key = getEncryptionKey();
  const source = new DatabaseSync(sourcePath, { readOnly: true });
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
  const client = await pool.connect();
  let transactionOpen = false;

  try {
    await client.query(postgresSchema);
    await client.query("BEGIN");
    transactionOpen = true;
    let profilePhotosMigrated = 0;
    let applicationDocumentsMigrated = 0;

    for (const table of tableOrder) {
      const columns = source.prepare(`PRAGMA table_info(${quoteIdentifier(table)})`).all().map((column) => String(column.name));
      if (!columns.length) continue;
      const rows = source.prepare(`SELECT * FROM ${quoteIdentifier(table)}`).all();
      if (!rows.length) continue;

      for (const row of rows) {
        const values = columns.map((column) => row[column]);
        if (table === "user_profiles") {
          const filename = typeof row.avatar_url === "string" ? row.avatar_url : "";
          const mimeType = typeof row.avatar_mime === "string" ? row.avatar_mime : "";
          let encryptedPhoto = null;
          if (filename) {
            if (!/^[a-f0-9-]+\.(jpg|png|webp)$/i.test(filename)
              || !photoExtensions.has(mimeType)
              || !filename.endsWith(`.${photoExtensions.get(mimeType)}`)) {
              throw new Error("A local profile photo has invalid metadata.");
            }
            const photo = await readFile(join(profileDirectory, filename));
            encryptedPhoto = encryptPhoto(photo, key);
            profilePhotosMigrated += 1;
          }
          const profileUrlIndex = columns.indexOf("avatar_url");
          if (profileUrlIndex >= 0 && encryptedPhoto) values[profileUrlIndex] = "database";
          const profileColumns = [...columns, "avatar_data"];
          const profileValues = [...values, encryptedPhoto];
          const placeholders = profileColumns.map((_, index) => `$${index + 1}`).join(",");
          await client.query(
            `INSERT INTO user_profiles (${profileColumns.map(quoteIdentifier).join(",")}) VALUES (${placeholders})`,
            profileValues,
          );
          continue;
        }

        const placeholders = columns.map((_, index) => `$${index + 1}`).join(",");
        let conflictClause = "ON CONFLICT DO NOTHING";
        if (upsertTables.has(table)) {
          const updates = columns.filter((column) => column !== "id")
            .map((column) => `${quoteIdentifier(column)} = EXCLUDED.${quoteIdentifier(column)}`);
          conflictClause = `ON CONFLICT (id) DO UPDATE SET ${updates.join(",")}`;
        }
        const result = await client.query(
          `INSERT INTO ${quoteIdentifier(table)} (${columns.map(quoteIdentifier).join(",")})
           VALUES (${placeholders}) ${conflictClause}`,
          values,
        );
        if (result.rowCount !== 1 && !upsertTables.has(table)) {
          throw new Error(`The destination already contains conflicting rows in ${table}; no data was migrated.`);
        }
      }
      console.log(`Migrated ${rows.length} ${table} row(s).`);
    }

    const applications = source.prepare("SELECT id, documents FROM credit_applications").all();
    for (const application of applications) {
      const documents = decryptRecord(String(application.documents), key);
      for (const [kind, metadata] of Object.entries(documents)) {
        if (!["ktp", "selfie", "income"].includes(kind)) throw new Error("A local application has an unknown document type.");
        const content = await readFile(join(documentDirectory, String(application.id), `${kind}.enc`));
        await client.query(`INSERT INTO application_documents (application_id,kind,content,mime_type,extension)
          VALUES ($1,$2,$3,$4,$5)`,
        [application.id, kind, content, metadata.mimeType, metadata.extension]);
        applicationDocumentsMigrated += 1;
      }
    }
    console.log(`Migrated ${profilePhotosMigrated} profile photo(s) and ${applicationDocumentsMigrated} application document(s).`);

    await client.query("COMMIT");
    transactionOpen = false;
  } catch (error) {
    if (transactionOpen) await client.query("ROLLBACK");
    throw error;
  } finally {
    source.close();
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error("SQLite-to-Neon migration failed:", error);
  process.exitCode = 1;
});
