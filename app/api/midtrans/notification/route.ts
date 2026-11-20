import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getPaymentByOrderId, updateMidtransPayment } from "@/lib/installment-payments";

type MidtransNotification = {
  order_id?: unknown;
  status_code?: unknown;
  gross_amount?: unknown;
  signature_key?: unknown;
  transaction_id?: unknown;
  transaction_status?: unknown;
  fraud_status?: unknown;
  payment_type?: unknown;
};

export async function POST(request: Request) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY?.trim();
  if (!serverKey) return NextResponse.json({ error: "Konfigurasi pembayaran tidak tersedia." }, { status: 503 });

  let event: MidtransNotification;
  try { event = await request.json() as MidtransNotification; }
  catch { return NextResponse.json({ error: "Notifikasi tidak valid." }, { status: 400 }); }

  const orderId = typeof event.order_id === "string" ? event.order_id : "";
  const statusCode = typeof event.status_code === "string" || typeof event.status_code === "number" ? String(event.status_code) : "";
  const grossAmount = typeof event.gross_amount === "string" || typeof event.gross_amount === "number" ? String(event.gross_amount) : "";
  const signature = typeof event.signature_key === "string" ? event.signature_key : "";
  const transactionId = typeof event.transaction_id === "string" ? event.transaction_id : "";
  const transactionStatus = typeof event.transaction_status === "string" ? event.transaction_status : "";
  const paymentType = typeof event.payment_type === "string" ? event.payment_type : null;
  if (!orderId || !statusCode || !grossAmount || !signature || !transactionId || !transactionStatus) {
    return NextResponse.json({ error: "Data notifikasi belum lengkap." }, { status: 400 });
  }

  const expected = createHash("sha512").update(`${orderId}${statusCode}${grossAmount}${serverKey}`).digest();
  let received: Buffer;
  try { received = Buffer.from(signature, "hex"); } catch { return NextResponse.json({ error: "Signature tidak valid." }, { status: 401 }); }
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
    return NextResponse.json({ error: "Signature tidak valid." }, { status: 401 });
  }

  const payment = await getPaymentByOrderId(orderId);
  if (!payment) return NextResponse.json({ error: "Transaksi tidak ditemukan." }, { status: 404 });
  const amount = Number(grossAmount);
  if (!Number.isFinite(amount) || amount !== Number(payment.amount)) {
    return NextResponse.json({ error: "Nominal transaksi tidak cocok." }, { status: 400 });
  }

  const isSuccessful = transactionStatus === "settlement" || (transactionStatus === "capture" && event.fraud_status === "accept");
  const normalizedStatus = ["pending", "settlement", "capture", "expire", "cancel", "deny", "failure", "refund"].includes(transactionStatus)
    ? transactionStatus
    : "failure";
  try {
    const updated = await updateMidtransPayment({ orderId, transactionId, amount, status: normalizedStatus, paymentType, successful: isSuccessful });
    if (!updated) return NextResponse.json({ error: "Data pembayaran tidak cocok." }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Gagal menyimpan notifikasi Midtrans:", error);
    return NextResponse.json({ error: "Notifikasi belum dapat disimpan." }, { status: 500 });
  }
}
