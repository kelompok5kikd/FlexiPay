import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth-db";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Data pendaftaran tidak valid." }, { status: 400 }); }
  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const pin = typeof body.pin === "string" ? body.pin : "";
  if (fullName.length < 2 || fullName.length > 100) return NextResponse.json({ error: "Masukkan nama lengkap (2–100 karakter)." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return NextResponse.json({ field: "email", error: "Masukkan format email yang valid." }, { status: 400 });
  if (!/^\+?[0-9\s()-]{9,18}$/.test(phone)) return NextResponse.json({ field: "phone", error: "Masukkan nomor HP yang valid." }, { status: 400 });
  if (!/^\d{6}$/.test(pin)) return NextResponse.json({ field: "pin", error: "PIN harus terdiri dari 6 angka." }, { status: 400 });
  if (body.acceptTerms !== true) return NextResponse.json({ field: "acceptTerms", error: "Setujui syarat dan ketentuan untuk melanjutkan." }, { status: 400 });
  try {
    const result = await registerUser({ fullName, email, phone: phone.replace(/[\s()-]/g, ""), pin });
    if (!result.success) return NextResponse.json({ field: result.reason, error: result.reason === "email" ? "Email sudah digunakan." : "Nomor HP sudah terdaftar." }, { status: 409 });
    return NextResponse.json({ message: "Registrasi berhasil. Silakan masuk dengan email dan PIN Anda." }, { status: 201 });
  } catch (error) {
    console.error("Gagal membuat akun FlexiPay:", error);
    return NextResponse.json({ error: "Akun belum dapat dibuat. Coba lagi sebentar." }, { status: 500 });
  }
}
