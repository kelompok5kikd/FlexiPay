import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserForSession } from "@/lib/auth-db";
import { getLatestInstallmentPayment, updateMidtransPayment } from "@/lib/installment-payments";

type MidtransStatus = {
  order_id?: unknown;
  transaction_id?: unknown;
  transaction_status?: unknown;
  fraud_status?: unknown;
  gross_amount?: unknown;
  payment_type?: unknown;
};

export async function GET(_request: Request, context: { params: Promise<{ installmentId: string }> }) {
  const session = await cookies();
  const user = await getUserForSession(session.get("flexipay_session")?.value);
  if (!user) return NextResponse.json({ error: "Silakan login kembali." }, { status: 401 });

  const { installmentId } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(installmentId)) return NextResponse.json({ error: "Tagihan tidak ditemukan." }, { status: 404 });

  const payment = await getLatestInstallmentPayment(user.id, installmentId);
  if (!payment) return NextResponse.json({ status: "unpaid" });
  if (payment.installment_status === "paid") return NextResponse.json({ status: "paid" });
  if (payment.status !== "pending") return NextResponse.json({ status: String(payment.status) });

  const serverKey = process.env.MIDTRANS_SERVER_KEY?.trim();
  if (!serverKey) return NextResponse.json({ error: "Midtrans belum dikonfigurasi." }, { status: 503 });
  const production = process.env.MIDTRANS_IS_PRODUCTION === "true";
  if ((production && !serverKey.startsWith("Mid-server-")) || (!production && !serverKey.startsWith("SB-Mid-server-"))) {
    return NextResponse.json({ error: "Mode Midtrans dan Server Key belum cocok." }, { status: 503 });
  }

  try {
    const baseUrl = production ? "https://api.midtrans.com/v2" : "https://api.sandbox.midtrans.com/v2";
    const response = await fetch(`${baseUrl}/${encodeURIComponent(String(payment.order_id))}/status`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`,
        Accept: "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    const result = await response.json().catch(() => ({})) as MidtransStatus;
    if (!response.ok) return NextResponse.json({ status: "pending" });

    const orderId = typeof result.order_id === "string" ? result.order_id : "";
    const transactionId = typeof result.transaction_id === "string" ? result.transaction_id : "";
    const transactionStatus = typeof result.transaction_status === "string" ? result.transaction_status : "";
    const amount = Number(result.gross_amount);
    const allowedStatuses = new Set(["pending", "settlement", "capture", "expire", "cancel", "deny", "failure", "refund"]);
    if (orderId !== payment.order_id || !transactionId || !allowedStatuses.has(transactionStatus) || amount !== Number(payment.amount)) {
      return NextResponse.json({ status: "pending" });
    }

    const successful = transactionStatus === "settlement" || (transactionStatus === "capture" && result.fraud_status === "accept");
    const updated = await updateMidtransPayment({
      orderId,
      transactionId,
      amount,
      status: transactionStatus,
      paymentType: typeof result.payment_type === "string" ? result.payment_type : null,
      successful,
    });
    if (!updated) return NextResponse.json({ error: "Status pembayaran belum dapat disimpan." }, { status: 500 });
    return NextResponse.json({ status: successful ? "paid" : transactionStatus });
  } catch (error) {
    console.error("Gagal memeriksa status pembayaran Midtrans:", error);
    return NextResponse.json({ error: "Status pembayaran belum dapat diperiksa." }, { status: 500 });
  }
}
