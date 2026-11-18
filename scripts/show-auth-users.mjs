import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

const databasePath = resolve(process.cwd(), "data", "flexipay.db");

if (!existsSync(databasePath)) {
  console.log("Database belum dibuat. Jalankan npm run dev lalu lakukan registrasi terlebih dahulu.");
  process.exit(0);
}

const db = new DatabaseSync(databasePath, { readOnly: true });
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all().map((row) => row.name);
if (!tables.includes("users") || !tables.includes("user_sessions")) {
  console.log("Database belum memiliki tabel akun FlexiPay. Buka aplikasi sekali agar skema database dibuat.");
  db.close();
  process.exit(0);
}

const accounts = db.prepare(`SELECT full_name AS nama, email, phone AS nomor_hp,
  account_status AS status, created_at AS terdaftar
  FROM users ORDER BY created_at DESC`).all();

const loginHistory = db.prepare(`SELECT users.full_name AS nama, users.email,
  user_sessions.created_at AS waktu_login,
  CASE
    WHEN user_sessions.revoked_at IS NOT NULL THEN 'keluar'
    WHEN user_sessions.expires_at > ? THEN 'aktif'
    ELSE 'kedaluwarsa'
  END AS status_sesi
  FROM user_sessions JOIN users ON users.id = user_sessions.user_id
  ORDER BY user_sessions.created_at DESC`).all(new Date().toISOString());

console.log("\nAkun terdaftar:");
if (accounts.length) console.table(accounts);
else console.log("Belum ada akun.");

console.log("\nRiwayat login:");
if (loginHistory.length) console.table(loginHistory);
else console.log("Belum ada riwayat login.");

db.close();
