import { NextResponse } from "next/server";
import { createAdminSession, recordAdminLoginFailure } from "@/lib/admin-db";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Email atau PIN admin salah." }, { status: 401 }); }
  const email = typeof body.email === "string" ? body.email : "";
  const pin = typeof body.pin === "string" ? body.pin : "";
  if (!email || !/^\d{6}$/.test(pin)) {
    try {
      await recordAdminLoginFailure(email || "unknown");
      return NextResponse.json({ error: "Email atau PIN admin salah." }, { status: 401 });
    } catch (error) {
      console.error("Gagal mencatat percobaan login admin:", error);
      return NextResponse.json({ error: "Login admin belum dapat diproses. Coba lagi." }, { status: 500 });
    }
  }
  try {
    const result = await createAdminSession(email, pin);
    if (!result) return NextResponse.json({ error: "Email atau PIN admin salah." }, { status: 401 });
    const response = NextResponse.json({ admin: result.admin });
    response.cookies.set("flexipay_admin_session", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  } catch (error) {
    console.error("Gagal memproses login admin:", error);
    return NextResponse.json({ error: "Login admin belum dapat diproses. Coba lagi." }, { status: 500 });
  }
}
