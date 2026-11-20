import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revokeAdminSession } from "@/lib/admin-db";

export async function POST() {
  const cookieStore = await cookies();
  await revokeAdminSession(cookieStore.get("flexipay_admin_session")?.value);
  const response = NextResponse.json({ success: true });
  response.cookies.set("flexipay_admin_session", "", { httpOnly: true, sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
