import "server-only";
import { randomUUID } from "node:crypto";
import { execute, queryOne, withTransaction } from "@/lib/postgres";

function dateInJakarta(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Jakarta",
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function dueDateAfterMonths(sourceIso: string, monthsAfter: number) {
  const source = dateInJakarta(new Date(sourceIso)).split("-").map(Number);
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

export async function getUserInstallments(userId: string): Promise<UserInstallment[]> {
  return withTransaction(async (client) => {
    const applicationResult = await client.query(`SELECT id,approved_limit,approved_tenor FROM credit_applications
      WHERE user_id = $1 AND status = 'approved' ORDER BY reviewed_at DESC LIMIT 1`, [userId]);
    const application = applicationResult.rows[0];
    const borrowingResult = await client.query(`SELECT created_at FROM commerce_orders
      WHERE user_id = $1 AND status != 'cancelled' ORDER BY created_at ASC LIMIT 1`, [userId]);
    const firstBorrowing = borrowingResult.rows[0];
    if (!application || !firstBorrowing || !application.approved_limit || !application.approved_tenor) return [];

    const tenor = Number(application.approved_tenor);
    const approvedLimit = Number(application.approved_limit);
    const amount = Math.round(approvedLimit / tenor) + Math.round(approvedLimit * 0.005);
    for (let index = 1; index <= tenor; index += 1) {
      await client.query(`INSERT INTO installments (id,application_id,user_id,installment_no,due_date,amount)
        VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (application_id,installment_no) DO NOTHING`,
      [randomUUID(), application.id, userId, index, dueDateAfterMonths(String(firstBorrowing.created_at), index), amount]);
    }
    const rows = await client.query(`SELECT installments.*, latest.status AS payment_status, latest.redirect_url
      FROM installments LEFT JOIN LATERAL (
        SELECT status,redirect_url FROM installment_payments WHERE installment_id = installments.id
        ORDER BY created_at DESC LIMIT 1
      ) AS latest ON true
      WHERE installments.user_id = $1 AND installments.application_id = $2 ORDER BY installments.installment_no`,
    [userId, application.id]);
    return rows.rows.map((row) => ({
      id: String(row.id),
      installmentNumber: Number(row.installment_no),
      tenor,
      dueDate: String(row.due_date),
      amount: Number(row.amount),
      status: String(row.status) as "unpaid" | "paid",
      paymentStatus: row.payment_status == null ? null : String(row.payment_status),
      redirectUrl: row.redirect_url == null ? null : String(row.redirect_url),
    }));
  });
}

export async function reserveInstallmentPayment(userId: string, installmentId: string) {
  return withTransaction(async (client) => {
    const result = await client.query("SELECT * FROM installments WHERE id = $1 AND user_id = $2 FOR UPDATE", [installmentId, userId]);
    const invoice = result.rows[0];
    if (!invoice) return { success: false as const, reason: "not_found" as const };
    if (invoice.status === "paid") return { success: false as const, reason: "paid" as const };
    if (Number(invoice.installment_no) > 1) {
      const previous = await client.query(`SELECT due_date FROM installments
        WHERE application_id = $1 AND user_id = $2 AND installment_no = $3`,
      [invoice.application_id, userId, Number(invoice.installment_no) - 1]);
      if (!previous.rows[0] || String(previous.rows[0].due_date) >= dateInJakarta(new Date())) {
        return { success: false as const, reason: "locked" as const };
      }
    }
    const openPayment = await client.query(`SELECT order_id,redirect_url FROM installment_payments
      WHERE installment_id = $1 AND status IN ('creating','pending') ORDER BY created_at DESC LIMIT 1`,
    [installmentId]);
    if (openPayment.rows[0]?.redirect_url) {
      return {
        success: true as const,
        orderId: String(openPayment.rows[0].order_id),
        redirectUrl: String(openPayment.rows[0].redirect_url),
        reused: true,
      };
    }
    if (openPayment.rows[0]) return { success: false as const, reason: "processing" as const };
    const orderId = `FPB-${randomUUID().replaceAll("-", "").slice(0, 24).toUpperCase()}`;
    await client.query(`INSERT INTO installment_payments (id,installment_id,order_id,amount,status)
      VALUES ($1,$2,$3,$4,'creating')`,
    [randomUUID(), installmentId, orderId, Number(invoice.amount)]);
    return {
      success: true as const,
      orderId,
      amount: Number(invoice.amount),
      installmentNumber: Number(invoice.installment_no),
      dueDate: String(invoice.due_date),
      reused: false,
    };
  });
}

export async function saveSnapRedirect(orderId: string, redirectUrl: string) {
  await execute(`UPDATE installment_payments SET status='pending',redirect_url=$1,updated_at=$2
    WHERE order_id=$3 AND status='creating'`, [redirectUrl, new Date().toISOString(), orderId]);
}

export async function markSnapCreationFailed(orderId: string) {
  await execute(`UPDATE installment_payments SET status='failure',updated_at=$1
    WHERE order_id=$2 AND status='creating'`, [new Date().toISOString(), orderId]);
}

export async function getPaymentByOrderId(orderId: string) {
  return await queryOne(`SELECT installment_payments.*,installments.user_id,installments.status AS installment_status
    FROM installment_payments JOIN installments ON installments.id = installment_payments.installment_id
    WHERE order_id = $1`, [orderId]) ?? null;
}

export async function getLatestInstallmentPayment(userId: string, installmentId: string) {
  return await queryOne(`SELECT installment_payments.order_id,installment_payments.amount,installment_payments.status,
      installments.status AS installment_status
    FROM installment_payments JOIN installments ON installments.id = installment_payments.installment_id
    WHERE installments.id = $1 AND installments.user_id = $2
    ORDER BY installment_payments.created_at DESC LIMIT 1`,
  [installmentId, userId]) ?? null;
}

export async function updateMidtransPayment(input: {
  orderId: string; transactionId: string; amount: number; status: string; paymentType: string | null; successful: boolean;
}) {
  const allowed = new Set(["pending", "settlement", "capture", "expire", "cancel", "deny", "failure", "refund"]);
  if (!allowed.has(input.status)) return false;
  return withTransaction(async (client) => {
    const result = await client.query(`SELECT installment_payments.*,installments.status AS installment_status
      FROM installment_payments JOIN installments ON installments.id = installment_payments.installment_id
      WHERE order_id = $1 FOR UPDATE OF installment_payments, installments`, [input.orderId]);
    const payment = result.rows[0];
    if (!payment || Number(payment.amount) !== input.amount) return false;
    const now = new Date().toISOString();
    const isPaid = input.successful && ["settlement", "capture"].includes(input.status);
    await client.query(`UPDATE installment_payments SET midtrans_transaction_id=$1,status=$2,payment_type=$3,updated_at=$4
      WHERE order_id=$5`,
    [input.transactionId, input.status, input.paymentType, now, input.orderId]);
    if (isPaid && payment.installment_status !== "paid") {
      await client.query("UPDATE installments SET status='paid',paid_at=$1 WHERE id=$2 AND status='unpaid'", [now, payment.installment_id]);
      await client.query(`UPDATE installment_payments SET status='cancel',updated_at=$1
        WHERE installment_id=$2 AND order_id != $3 AND status IN ('creating','pending')`,
      [now, payment.installment_id, input.orderId]);
    }
    return true;
  });
}
