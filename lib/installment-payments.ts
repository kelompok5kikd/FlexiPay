import "server-only";
import "@/lib/commerce-db";
import "@/lib/credit-applications";
import { DatabaseSync as NodeDatabaseSync } from "node:sqlite";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

type Statement = {
  run: (...values: unknown[]) => { changes: number };
  get: (...values: unknown[]) => Record<string, unknown> | undefined;
  all: (...values: unknown[]) => Record<string, unknown>[];
};
type Database = { exec: (sql: string) => void; prepare: (sql: string) => Statement };
const DatabaseSync = NodeDatabaseSync as unknown as new (path: string) => Database;
const db = new DatabaseSync(join(process.cwd(), "data", "flexipay.db"));
db.exec(`
  PRAGMA foreign_keys = ON;
  PRAGMA busy_timeout = 10000;
  CREATE TABLE IF NOT EXISTS installments (
    id TEXT PRIMARY KEY,
    application_id TEXT NOT NULL REFERENCES credit_applications(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    installment_no INTEGER NOT NULL CHECK (installment_no > 0),
    due_date TEXT NOT NULL,
    amount INTEGER NOT NULL CHECK (amount > 0),
    status TEXT NOT NULL DEFAULT 'unpaid' CHECK (status IN ('unpaid','paid')),
    paid_at TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    UNIQUE(application_id, installment_no)
  );
  CREATE INDEX IF NOT EXISTS idx_installments_user_due ON installments(user_id,due_date);
  CREATE TABLE IF NOT EXISTS installment_payments (
    id TEXT PRIMARY KEY,
    installment_id TEXT NOT NULL REFERENCES installments(id) ON DELETE CASCADE,
    order_id TEXT NOT NULL UNIQUE,
    midtrans_transaction_id TEXT,
    amount INTEGER NOT NULL CHECK (amount > 0),
    status TEXT NOT NULL CHECK (status IN ('creating','pending','settlement','capture','expire','cancel','deny','failure','refund')),
    payment_type TEXT,
    redirect_url TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE INDEX IF NOT EXISTS idx_installment_payments_installment ON installment_payments(installment_id,created_at DESC);
  CREATE UNIQUE INDEX IF NOT EXISTS idx_installment_single_open_payment ON installment_payments(installment_id) WHERE status IN ('creating','pending');
`);

function dateInJakarta(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Jakarta",
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function dueDateAfterMonths(sourceIso: string, monthsAfter: number) {
  const sourceDate = new Date(sourceIso);
  const source = dateInJakarta(sourceDate).split("-").map(Number);
  const targetIndex = source[1] - 1 + monthsAfter;
  const year = source[0] + Math.floor(targetIndex / 12);
  const month = targetIndex % 12;
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(Math.min(source[2], lastDay)).padStart(2, "0")}`;
}

export type UserInstallment = {
  id: string; installmentNumber: number; tenor: number; dueDate: string; amount: number;
  status: "unpaid" | "paid"; paymentStatus: string | null; redirectUrl: string | null;
};

export function getUserInstallments(userId: string): UserInstallment[] {
  const application = db.prepare(`SELECT id,approved_limit,approved_tenor FROM credit_applications
    WHERE user_id=? AND status='approved' ORDER BY reviewed_at DESC LIMIT 1`).get(userId);
  const firstBorrowing = db.prepare(`SELECT created_at FROM commerce_orders WHERE user_id=? AND status!='cancelled'
    ORDER BY created_at ASC LIMIT 1`).get(userId);
  if (!application || !firstBorrowing || !application.approved_limit || !application.approved_tenor) return [];

  const tenor = Number(application.approved_tenor);
  const approvedLimit = Number(application.approved_limit);
  const amount = Math.round(approvedLimit / tenor) + Math.round(approvedLimit * 0.005);
  db.exec("BEGIN IMMEDIATE");
  try {
    const insert = db.prepare(`INSERT OR IGNORE INTO installments(id,application_id,user_id,installment_no,due_date,amount)
      VALUES(?,?,?,?,?,?)`);
    for (let index = 1; index <= tenor; index += 1) {
      insert.run(randomUUID(), application.id, userId, index, dueDateAfterMonths(String(firstBorrowing.created_at), index), amount);
    }
    db.exec("COMMIT");
  } catch (error) {
    try { db.exec("ROLLBACK"); } catch { /* Keep the initial error. */ }
    throw error;
  }
  return db.prepare(`SELECT installments.*, latest.status AS payment_status, latest.redirect_url
    FROM installments LEFT JOIN installment_payments AS latest ON latest.id=(
      SELECT id FROM installment_payments WHERE installment_id=installments.id ORDER BY created_at DESC LIMIT 1
    ) WHERE installments.user_id=? AND installments.application_id=? ORDER BY installments.installment_no`)
    .all(userId, application.id).map((row) => ({
      id: String(row.id), installmentNumber: Number(row.installment_no), tenor,
      dueDate: String(row.due_date), amount: Number(row.amount),
      status: String(row.status) as "unpaid" | "paid",
      paymentStatus: row.payment_status == null ? null : String(row.payment_status),
      redirectUrl: row.redirect_url == null ? null : String(row.redirect_url),
    }));
}

export function reserveInstallmentPayment(userId: string, installmentId: string) {
  db.exec("BEGIN IMMEDIATE");
  try {
    const invoice = db.prepare("SELECT * FROM installments WHERE id=? AND user_id=?").get(installmentId, userId);
    if (!invoice) { db.exec("ROLLBACK"); return { success: false as const, reason: "not_found" as const }; }
    if (invoice.status === "paid") { db.exec("ROLLBACK"); return { success: false as const, reason: "paid" as const }; }
    if (Number(invoice.installment_no) > 1) {
      const previousInvoice = db.prepare(`SELECT due_date FROM installments WHERE application_id=? AND user_id=? AND installment_no=?`)
        .get(invoice.application_id, userId, Number(invoice.installment_no) - 1);
      if (!previousInvoice || String(previousInvoice.due_date) >= dateInJakarta(new Date())) {
        db.exec("ROLLBACK");
        return { success: false as const, reason: "locked" as const };
      }
    }
    const openPayment = db.prepare(`SELECT order_id,redirect_url FROM installment_payments
      WHERE installment_id=? AND status IN ('creating','pending') ORDER BY created_at DESC LIMIT 1`).get(installmentId);
    if (openPayment?.redirect_url) {
      db.exec("COMMIT");
      return { success: true as const, orderId: String(openPayment.order_id), redirectUrl: String(openPayment.redirect_url), reused: true };
    }
    if (openPayment) { db.exec("ROLLBACK"); return { success: false as const, reason: "processing" as const }; }

    const orderId = `FPB-${randomUUID().replaceAll("-", "").slice(0, 24).toUpperCase()}`;
    db.prepare(`INSERT INTO installment_payments(id,installment_id,order_id,amount,status) VALUES(?,?,?,?, 'creating')`)
      .run(randomUUID(), installmentId, orderId, Number(invoice.amount));
    db.exec("COMMIT");
    return { success: true as const, orderId, amount: Number(invoice.amount), installmentNumber: Number(invoice.installment_no), dueDate: String(invoice.due_date), reused: false };
  } catch (error) {
    try { db.exec("ROLLBACK"); } catch { /* Keep the initial error. */ }
    throw error;
  }
}

export function saveSnapRedirect(orderId: string, redirectUrl: string) {
  db.prepare(`UPDATE installment_payments SET status='pending',redirect_url=?,updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now')
    WHERE order_id=? AND status='creating'`).run(redirectUrl, orderId);
}

export function markSnapCreationFailed(orderId: string) {
  db.prepare(`UPDATE installment_payments SET status='failure',updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now')
    WHERE order_id=? AND status='creating'`).run(orderId);
}

export function getPaymentByOrderId(orderId: string) {
  return db.prepare(`SELECT installment_payments.*,installments.user_id,installments.status AS installment_status
    FROM installment_payments JOIN installments ON installments.id=installment_payments.installment_id WHERE order_id=?`).get(orderId) ?? null;
}

export function getLatestInstallmentPayment(userId: string, installmentId: string) {
  return db.prepare(`SELECT installment_payments.order_id,installment_payments.amount,installment_payments.status,
      installments.status AS installment_status
    FROM installment_payments JOIN installments ON installments.id=installment_payments.installment_id
    WHERE installments.id=? AND installments.user_id=? ORDER BY installment_payments.created_at DESC LIMIT 1`)
    .get(installmentId, userId) ?? null;
}

export function updateMidtransPayment(input: { orderId: string; transactionId: string; amount: number; status: string; paymentType: string | null; successful: boolean }) {
  const allowed = new Set(["pending", "settlement", "capture", "expire", "cancel", "deny", "failure", "refund"]);
  if (!allowed.has(input.status)) return false;
  db.exec("BEGIN IMMEDIATE");
  try {
    const payment = db.prepare(`SELECT installment_payments.*,installments.status AS installment_status FROM installment_payments
      JOIN installments ON installments.id=installment_payments.installment_id WHERE order_id=?`).get(input.orderId);
    if (!payment || Number(payment.amount) !== input.amount) { db.exec("ROLLBACK"); return false; }
    const isPaid = input.successful && ["settlement", "capture"].includes(input.status);
    db.prepare(`UPDATE installment_payments SET midtrans_transaction_id=?,status=?,payment_type=?,
      updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE order_id=?`)
      .run(input.transactionId, input.status, input.paymentType, input.orderId);
    if (isPaid && payment.installment_status !== "paid") {
      db.prepare(`UPDATE installments SET status='paid',paid_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=? AND status='unpaid'`)
        .run(payment.installment_id);
      db.prepare(`UPDATE installment_payments SET status='cancel',updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now')
        WHERE installment_id=? AND order_id!=? AND status IN ('creating','pending')`).run(payment.installment_id, input.orderId);
    }
    db.exec("COMMIT");
    return true;
  } catch (error) {
    try { db.exec("ROLLBACK"); } catch { /* Keep the initial error. */ }
    throw error;
  }
}
