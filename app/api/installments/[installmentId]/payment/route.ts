import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserForSession } from "@/lib/auth-db";
import {
  markSnapCreationFailed,
  reserveInstallmentPayment,
  saveSnapRedirect,
} from "@/lib/installment-payments";

type SnapResponse = { redirect_url?: string };

export async function POST(request: Request, context: { params: Promise<{ installmentId: string }> }) {
  const session = await cookies();
  const user = await getUserForSession(session.get("flexipay_session")?.value);
  if (!user) return NextResponse.json({ error: "Silakan login untuk membayar cicilan." }, { status: 401 });

  const serverKey = process.env.MIDTRANS_SERVER_KEY?.trim();
  if (!serverKey) return NextResponse.json({ error: "Midtrans belum dikonfigurasi di server." }, { status: 503 });

  const production = process.env.MIDTRANS_IS_PRODUCTION === "true";
  if ((production && !serverKey.startsWith("Mid-server-")) || (!production && !serverKey.startsWith("SB-Mid-server-"))) {
    return NextResponse.json({ error: "Mode Midtrans dan jenis Server Key belum cocok." }, { status: 503 });
  }

  const { installmentId } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(installmentId)) {
    return NextResponse.json({ error: "Tagihan tidak ditemukan." }, { status: 404 });
  }

  let reservedOrderId: string | null = null;
  try {
    const reservation = await reserveInstallmentPayment(user.id, installmentId);
    if (!reservation.success) {
      const status = reservation.reason === "not_found" ? 404 : reservation.reason === "processing" ? 409 : 409;
      const error = reservation.reason === "not_found" ? "Tagihan tidak ditemukan." : reservation.reason === "paid" ? "Tagihan ini sudah lunas." : reservation.reason === "locked" ? "Cicilan ini akan terbuka setelah tanggal jatuh tempo cicilan sebelumnya lewat." : "Pembayaran sedang disiapkan. Muat ulang halaman sebentar lagi.";
      return NextResponse.json({ error }, { status });
    }
    if (reservation.reused) return NextResponse.json({ redirectUrl: reservation.redirectUrl });
    reservedOrderId = reservation.orderId;

    const originValue = process.env.NEXT_PUBLIC_APP_URL?.trim();
    const origin = originValue ? new URL(originValue) : new URL(request.url);
    if (origin.protocol !== "https:" && origin.hostname !== "localhost" && origin.hostname !== "127.0.0.1") {
      await markSnapCreationFailed(reservation.orderId);
      return NextResponse.json({ error: "Alamat aplikasi harus menggunakan HTTPS." }, { status: 503 });
    }

    const endpoint = production
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        transaction_details: { order_id: reservation.orderId, gross_amount: reservation.amount },
        item_details: [{ id: reservation.orderId, price: reservation.amount, quantity: 1, name: `Cicilan FlexiPay ${reservation.installmentNumber}` }],
        customer_details: { first_name: user.fullName, email: user.email },
        callbacks: { finish: new URL("/dashboard?payment=returned", origin).toString() },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const payload = await response.json().catch(() => ({})) as SnapResponse;
    const expectedSnapHost = production ? "app.midtrans.com" : "app.sandbox.midtrans.com";
    let redirectHost = "";
    try { redirectHost = new URL(payload.redirect_url ?? "").hostname; } catch { /* Invalid response URL. */ }
    if (!response.ok || redirectHost !== expectedSnapHost || typeof payload.redirect_url !== "string") {
      await markSnapCreationFailed(reservation.orderId);
      return NextResponse.json({ error: "Midtrans belum dapat membuat halaman pembayaran. Coba lagi." }, { status: 502 });
    }
    await saveSnapRedirect(reservation.orderId, payload.redirect_url);
    return NextResponse.json({ redirectUrl: payload.redirect_url });
  } catch (error) {
    console.error("Gagal memulai pembayaran cicilan:", error);
    if (reservedOrderId) {
      try {
        await markSnapCreationFailed(reservedOrderId);
      } catch (databaseError) {
        console.error("Gagal memperbarui status reservasi pembayaran:", databaseError);
      }
    }
    return NextResponse.json({ error: "Pembayaran belum dapat dimulai. Coba lagi." }, { status: 500 });
  }
}
