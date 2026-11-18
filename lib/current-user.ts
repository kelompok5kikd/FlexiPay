import "server-only";
import { cookies } from "next/headers";
import { getUserForSession } from "@/lib/auth-db";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  return getUserForSession(cookieStore.get("flexipay_session")?.value);
}
