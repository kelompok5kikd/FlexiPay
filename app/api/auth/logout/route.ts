import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revokeSession } from "@/lib/auth-db";
import { recordUserLogout } from "@/lib/admin-db";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("flexipay_session")?.value;
  await Promise.all([recordUserLogout(token), revokeSession(token)]);
  const response = NextResponse.json({ message: "Anda sudah keluar." });
  response.cookies.set("flexipay_session", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
