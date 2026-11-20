import "server-only";
import { createCipheriv, createDecipheriv, randomBytes, randomUUID } from "node:crypto";
import type { AdminUser } from "@/lib/admin-db";
import { queryOne, queryRows, withTransaction } from "@/lib/postgres";

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

const statusLabels: Record<string, string> = {
  submitted: "Menunggu review", in_review: "Dalam peninjauan", needs_revision: "Perlu perbaikan",
  approved: "Disetujui", rejected: "Ditolak",
};

function mapApplication(row: Record<string, unknown>, userEmail?: string): CreditApplication | AdminCreditApplication {
  const data = decryptText<PrivateData>(String(row.private_data));
  const docs = decryptText<Record<ApplicationDocumentKind, { mimeType: string; extension: string }>>(String(row.documents));
  const base: CreditApplication = {
    id: String(row.id),
    applicationNumber: `FPC-${String(row.id).slice(0, 8).toUpperCase()}`,
    status: String(row.status),
    submittedAt: String(row.submitted_at),
    adminNote: row.admin_note == null ? null : String(row.admin_note),
    approvedLimit: row.approved_limit == null ? null : Number(row.approved_limit),
    approvedTenor: row.approved_tenor == null ? null : Number(row.approved_tenor),
    data,
    documents: docs,
  };
  if (userEmail === undefined) return base;
  return { ...base, userId: String(row.user_id), userEmail, accountStatus: String(row.account_status) };
}

export async function getCreditApplicationForUser(userId: string): Promise<CreditApplication | null> {
  const row = await queryOne("SELECT * FROM credit_applications WHERE user_id = $1 ORDER BY submitted_at DESC LIMIT 1", [userId]);
  return row ? mapApplication(row) as CreditApplication : null;
}

export async function getApprovedLimitForUser(userId: string): Promise<number> {
  const row = await queryOne(`SELECT approved_limit FROM credit_applications
    WHERE user_id = $1 AND status = 'approved' ORDER BY reviewed_at DESC LIMIT 1`, [userId]);
  return row?.approved_limit == null ? 0 : Number(row.approved_limit);
}

export async function createCreditApplication(input: { userId: string; data: PrivateData; files: ApplicationDocumentInput[] }) {
  const id = randomUUID();
  const documents: Partial<Record<ApplicationDocumentKind, { mimeType: string; extension: string }>> = {};
  const encryptedFiles = input.files.map((file) => {
    documents[file.kind] = { mimeType: file.mimeType, extension: file.extension };
    return { kind: file.kind, content: encryptBytes(file.content), mimeType: file.mimeType, extension: file.extension };
  });
  return withTransaction(async (client) => {
    const user = await client.query("SELECT id FROM users WHERE id = $1 FOR UPDATE", [input.userId]);
    if (!user.rowCount) return { success: false as const, reason: "user" as const };
    const existing = await client.query(
      "SELECT id, status FROM credit_applications WHERE user_id = $1 ORDER BY submitted_at DESC LIMIT 1",
      [input.userId],
    );
    if (existing.rows[0] && ["submitted", "in_review"].includes(String(existing.rows[0].status))) {
      return { success: false as const, reason: "pending" as const };
    }
    const now = new Date().toISOString();
    await client.query(`INSERT INTO credit_applications (id,user_id,private_data,documents,submitted_at)
      VALUES ($1,$2,$3,$4,$5)`,
    [id, input.userId, encryptText(input.data), encryptText(documents), now]);
    for (const file of encryptedFiles) {
      await client.query(`INSERT INTO application_documents (application_id,kind,content,mime_type,extension)
        VALUES ($1,$2,$3,$4,$5)`,
      [id, file.kind, file.content, file.mimeType, file.extension]);
    }
    return { success: true as const, applicationId: id, applicationNumber: `FPC-${id.slice(0, 8).toUpperCase()}` };
  });
}

export async function listAdminCreditApplications(): Promise<AdminCreditApplication[]> {
  const rows = await queryRows(`SELECT credit_applications.*,users.email AS user_email,users.account_status
    FROM credit_applications JOIN users ON users.id = credit_applications.user_id
    ORDER BY CASE credit_applications.status WHEN 'submitted' THEN 0 WHEN 'in_review' THEN 1 WHEN 'needs_revision' THEN 2 ELSE 3 END,
      credit_applications.submitted_at DESC`);
  return rows.map((row) => mapApplication(row, String(row.user_email)) as AdminCreditApplication);
}

export async function decideCreditApplication(input: {
  applicationId: string;
  admin: AdminUser;
  status: "in_review" | "needs_revision" | "approved" | "rejected";
  note: string;
  approvedLimit: number | null;
  approvedTenor: number | null;
}) {
  if (!["credit_reviewer", "credit_approver", "super_admin"].includes(input.admin.role)) {
    return { success: false as const, reason: "permission" as const };
  }
  if (["approved", "rejected"].includes(input.status) && !["super_admin", "credit_approver"].includes(input.admin.role)) {
    return { success: false as const, reason: "permission" as const };
  }
  return withTransaction(async (client) => {
    const existing = await client.query("SELECT id FROM credit_applications WHERE id = $1 FOR UPDATE", [input.applicationId]);
    if (!existing.rowCount) return { success: false as const, reason: "application" as const };
    const now = new Date().toISOString();
    await client.query(`UPDATE credit_applications SET status=$1,admin_note=$2,approved_limit=$3,
      approved_tenor=$4,reviewed_by=$5,reviewed_at=$6 WHERE id=$7`,
    [input.status, input.note, input.approvedLimit, input.approvedTenor, input.admin.id, now, input.applicationId]);
    await client.query(`INSERT INTO credit_application_decisions
      (id,application_id,admin_id,status,admin_note,approved_limit,approved_tenor,created_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [randomUUID(), input.applicationId, input.admin.id, input.status, input.note, input.approvedLimit, input.approvedTenor, now]);
    await client.query(`INSERT INTO admin_audit_logs
      (id,admin_id,action,entity_type,entity_id,reason,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [randomUUID(), input.admin.id, `credit_application_${input.status}`, "credit_application", input.applicationId, input.note, now]);
    return { success: true as const };
  });
}

export async function readCreditApplicationDocument(applicationId: string, kind: ApplicationDocumentKind) {
  const row = await queryOne(`SELECT content,mime_type,extension FROM application_documents
    WHERE application_id = $1 AND kind = $2`, [applicationId, kind]);
  if (!row) return null;
  const encrypted = Buffer.isBuffer(row.content) ? row.content : Buffer.from(row.content as Uint8Array);
  return { content: decryptBytes(encrypted), mimeType: String(row.mime_type), extension: String(row.extension) };
}

export const creditApplicationStatusLabel = (status: string) => statusLabels[status] ?? status;

export async function logCreditDocumentAccess(adminId: string, applicationId: string, kind: ApplicationDocumentKind) {
  await withTransaction(async (client) => {
    await client.query(`INSERT INTO admin_audit_logs (id,admin_id,action,entity_type,entity_id,reason)
      VALUES ($1,$2,$3,$4,$5,$6)`,
    [randomUUID(), adminId, "credit_application_document_viewed", "credit_application_document", applicationId, kind]);
  });
}
