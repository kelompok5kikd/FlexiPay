import "server-only";
import "@/lib/auth-db";
import { DatabaseSync as NodeDatabaseSync } from "node:sqlite";
import { chmodSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { createCipheriv, createDecipheriv, randomBytes, randomUUID } from "node:crypto";
import type { AdminUser } from "@/lib/admin-db";

type Statement = { run: (...args: unknown[]) => { changes: number }; get: (...args: unknown[]) => Record<string, unknown> | undefined; all: (...args: unknown[]) => Record<string, unknown>[] };
type Database = { exec: (sql: string) => void; prepare: (sql: string) => Statement };
const DatabaseSync = NodeDatabaseSync as unknown as new (path: string) => Database;
const dataDirectory = join(process.cwd(), "data");
const privateDocumentDirectory = join(dataDirectory, "credit-documents");
mkdirSync(privateDocumentDirectory, { recursive: true, mode: 0o700 });
try { chmodSync(privateDocumentDirectory, 0o700); } catch { /* retain platform default if chmod is unavailable */ }
const db = new DatabaseSync(join(dataDirectory, "flexipay.db"));
db.exec(`
  PRAGMA foreign_keys = ON;
  PRAGMA busy_timeout = 10000;
  CREATE TABLE IF NOT EXISTS credit_applications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    private_data TEXT NOT NULL,
    documents TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted','in_review','needs_revision','approved','rejected')),
    admin_note TEXT,
    approved_limit INTEGER CHECK (approved_limit IS NULL OR approved_limit > 0),
    approved_tenor INTEGER CHECK (approved_tenor IS NULL OR approved_tenor BETWEEN 1 AND 24),
    reviewed_by TEXT REFERENCES admin_accounts(id),
    submitted_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    reviewed_at TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_credit_applications_user_date ON credit_applications(user_id, submitted_at DESC);
  CREATE INDEX IF NOT EXISTS idx_credit_applications_status_date ON credit_applications(status, submitted_at DESC);
  CREATE TABLE IF NOT EXISTS credit_application_decisions (
    id TEXT PRIMARY KEY,
    application_id TEXT NOT NULL REFERENCES credit_applications(id) ON DELETE CASCADE,
    admin_id TEXT NOT NULL REFERENCES admin_accounts(id),
    status TEXT NOT NULL CHECK (status IN ('in_review','needs_revision','approved','rejected')),
    admin_note TEXT NOT NULL,
    approved_limit INTEGER,
    approved_tenor INTEGER,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
`);

type PrivateData = {
  fullName: string; nik: string; birthDate: string; maritalStatus: string; phone: string; email: string;
  ktpAddress: string; domicileAddress: string; employmentStatus: string; companyName: string;
  position: string; workingMonths: number; monthlyIncome: number; monthlyExpenses: number;
  requestedLimit: number; desiredTenor: number; purpose: string;
};
export type ApplicationDocumentKind = "ktp" | "selfie" | "income";
export type ApplicationDocumentInput = { kind: ApplicationDocumentKind; content: Buffer; mimeType: string; extension: string };
export type CreditApplication = {
  id: string; applicationNumber: string; status: string; submittedAt: string; adminNote: string | null;
  approvedLimit: number | null; approvedTenor: number | null; data: PrivateData;
  documents: Record<ApplicationDocumentKind, { mimeType: string; extension: string }>;
};
export type AdminCreditApplication = CreditApplication & { userId: string; userEmail: string; accountStatus: string };

function encryptionKey() {
  const encoded = process.env.FLEXIPAY_DATA_ENCRYPTION_KEY;
  if (!encoded || !/^[a-f0-9]{64}$/i.test(encoded)) throw new Error("FLEXIPAY_DATA_ENCRYPTION_KEY belum dikonfigurasi.");
  return Buffer.from(encoded, "hex");
}
function encryptBytes(value: Buffer) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);
  return Buffer.concat([Buffer.from("FP1"), iv, cipher.getAuthTag(), encrypted]);
}
function decryptBytes(value: Buffer) {
  if (value.length < 31 || value.subarray(0, 3).toString() !== "FP1") throw new Error("Dokumen terenkripsi tidak valid.");
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), value.subarray(3, 15));
  decipher.setAuthTag(value.subarray(15, 31));
  return Buffer.concat([decipher.update(value.subarray(31)), decipher.final()]);
}
const encryptText = (value: unknown) => encryptBytes(Buffer.from(JSON.stringify(value), "utf8")).toString("base64");
const decryptText = <T,>(value: string) => JSON.parse(decryptBytes(Buffer.from(value, "base64")).toString("utf8")) as T;
export const encryptPrivateRecord = (value: unknown) => encryptText(value);
export const decryptPrivateRecord = <T,>(value: string) => decryptText<T>(value);
const statusLabels: Record<string, string> = { submitted: "Menunggu review", in_review: "Dalam peninjauan", needs_revision: "Perlu perbaikan", approved: "Disetujui", rejected: "Ditolak" };

function mapApplication(row: Record<string, unknown>, userEmail?: string): CreditApplication | AdminCreditApplication {
  const data = decryptText<PrivateData>(String(row.private_data));
  const docs = decryptText<Record<ApplicationDocumentKind, { mimeType: string; extension: string }>>(String(row.documents));
  const base: CreditApplication = {
    id: String(row.id), applicationNumber: `FPC-${String(row.id).slice(0, 8).toUpperCase()}`,
    status: String(row.status), submittedAt: String(row.submitted_at), adminNote: row.admin_note == null ? null : String(row.admin_note),
    approvedLimit: row.approved_limit == null ? null : Number(row.approved_limit), approvedTenor: row.approved_tenor == null ? null : Number(row.approved_tenor), data, documents: docs,
  };
  if (userEmail === undefined) return base;
  return { ...base, userId: String(row.user_id), userEmail, accountStatus: String(row.account_status) };
}

export function getCreditApplicationForUser(userId: string): CreditApplication | null {
  const row = db.prepare("SELECT * FROM credit_applications WHERE user_id=? ORDER BY submitted_at DESC LIMIT 1").get(userId);
  return row ? mapApplication(row) as CreditApplication : null;
}

export function getApprovedLimitForUser(userId: string): number {
  const row = db.prepare("SELECT approved_limit FROM credit_applications WHERE user_id=? AND status='approved' ORDER BY reviewed_at DESC LIMIT 1").get(userId);
  return row?.approved_limit == null ? 0 : Number(row.approved_limit);
}

export function createCreditApplication(input: { userId: string; data: PrivateData; files: ApplicationDocumentInput[] }) {
  const existing = db.prepare("SELECT id,status FROM credit_applications WHERE user_id=? ORDER BY submitted_at DESC LIMIT 1").get(input.userId);
  if (existing && ["submitted", "in_review"].includes(String(existing.status))) return { success: false as const, reason: "pending" as const };
  const id = randomUUID();
  const documents: Partial<Record<ApplicationDocumentKind, { mimeType: string; extension: string }>> = {};
  const directory = join(privateDocumentDirectory, id);
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  try {
    for (const file of input.files) {
      const encrypted = encryptBytes(file.content);
      const target = join(directory, `${file.kind}.enc`);
      writeFileSync(target, encrypted, { flag: "wx", mode: 0o600 });
      documents[file.kind] = { mimeType: file.mimeType, extension: file.extension };
    }
    const now = new Date().toISOString();
    db.prepare("INSERT INTO credit_applications (id,user_id,private_data,documents,submitted_at) VALUES (?,?,?,?,?)")
      .run(id, input.userId, encryptText(input.data), encryptText(documents), now);
    return { success: true as const, applicationId: id, applicationNumber: `FPC-${id.slice(0, 8).toUpperCase()}` };
  } catch (error) {
    rmSync(directory, { recursive: true, force: true });
    throw error;
  }
}

export function listAdminCreditApplications(): AdminCreditApplication[] {
  return db.prepare(`SELECT credit_applications.*,users.email AS user_email,users.account_status
    FROM credit_applications JOIN users ON users.id=credit_applications.user_id
    ORDER BY CASE credit_applications.status WHEN 'submitted' THEN 0 WHEN 'in_review' THEN 1 WHEN 'needs_revision' THEN 2 ELSE 3 END,
      credit_applications.submitted_at DESC`).all().map((row) => mapApplication(row, String(row.user_email)) as AdminCreditApplication);
}

export function decideCreditApplication(input: { applicationId: string; admin: AdminUser; status: "in_review" | "needs_revision" | "approved" | "rejected"; note: string; approvedLimit: number | null; approvedTenor: number | null }) {
  if (!["credit_reviewer", "credit_approver", "super_admin"].includes(input.admin.role)) return { success: false as const, reason: "permission" as const };
  if (["approved", "rejected"].includes(input.status) && !["super_admin", "credit_approver"].includes(input.admin.role)) return { success: false as const, reason: "permission" as const };
  const existing = db.prepare("SELECT id FROM credit_applications WHERE id=?").get(input.applicationId);
  if (!existing) return { success: false as const, reason: "application" as const };
  const now = new Date().toISOString();
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare(`UPDATE credit_applications SET status=?,admin_note=?,approved_limit=?,approved_tenor=?,reviewed_by=?,reviewed_at=? WHERE id=?`)
      .run(input.status, input.note, input.approvedLimit, input.approvedTenor, input.admin.id, now, input.applicationId);
    db.prepare(`INSERT INTO credit_application_decisions (id,application_id,admin_id,status,admin_note,approved_limit,approved_tenor,created_at) VALUES (?,?,?,?,?,?,?,?)`)
      .run(randomUUID(), input.applicationId, input.admin.id, input.status, input.note, input.approvedLimit, input.approvedTenor, now);
    db.prepare(`INSERT INTO admin_audit_logs (id,admin_id,action,entity_type,entity_id,reason,created_at) VALUES (?,?,?,?,?,?,?)`)
      .run(randomUUID(), input.admin.id, `credit_application_${input.status}`, "credit_application", input.applicationId, input.note, now);
    db.exec("COMMIT");
    return { success: true as const };
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

export function readCreditApplicationDocument(applicationId: string, kind: ApplicationDocumentKind) {
  const row = db.prepare("SELECT documents FROM credit_applications WHERE id=?").get(applicationId);
  if (!row) return null;
  const documents = decryptText<Record<ApplicationDocumentKind, { mimeType: string; extension: string }>>(String(row.documents));
  const metadata = documents[kind];
  if (!metadata) return null;
  const filePath = resolve(privateDocumentDirectory, applicationId, `${kind}.enc`);
  if (!filePath.startsWith(`${resolve(privateDocumentDirectory)}${process.platform === "win32" ? "\\" : "/"}`)) return null;
  return { content: decryptBytes(readFileSync(filePath)), mimeType: metadata.mimeType, extension: metadata.extension };
}

export const creditApplicationStatusLabel = (status: string) => statusLabels[status] ?? status;

export function logCreditDocumentAccess(adminId: string, applicationId: string, kind: ApplicationDocumentKind) {
  db.prepare(`INSERT INTO admin_audit_logs (id,admin_id,action,entity_type,entity_id,reason) VALUES (?,?,?,?,?,?)`)
    .run(randomUUID(), adminId, "credit_application_document_viewed", "credit_application_document", applicationId, kind);
}
