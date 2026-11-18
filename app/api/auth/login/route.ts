import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth-db";
import { recordUserLoginFailure, recordUserLoginSuccess } from "@/lib/admin-db";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Email/PIN salah atau belum terdaftar." }, { status: 401 }); }
  const email = typeof body.email === "string" ? body.email : "";
  const pin = typeof body.pin === "string" ? body.pin : "";
  if (!email || !pin) return NextResponse.json({ error: "Email dan PIN wajib diisi." }, { status: 400 });
  if (!/^\d{6}$/.test(pin)) {
    recordUserLoginFailure(email);
    return NextResponse.json({ error: "Email/PIN salah atau belum terdaftar." }, { status: 401 });
  }
  try {
    const result = createSession(email, pin);
    if (!result) {
      recordUserLoginFailure(email);
      return NextResponse.json({ error: "Email/PIN salah atau belum terdaftar." }, { status: 401 });
    }
    recordUserLoginSuccess(result.user.id, result.user.email);
    const response = NextResponse.json({ user: result.user });
    response.cookies.set("flexipay_session", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Login belum dapat diproses. Coba lagi sebentar." }, { status: 500 });
  }
}
