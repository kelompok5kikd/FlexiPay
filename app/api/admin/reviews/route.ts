import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminForSession, saveAdminReview } from "@/lib/admin-db";

const statuses = new Set(["in_review", "needs_revision", "eligible", "not_eligible"]);

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const admin = await getAdminForSession(cookieStore.get("flexipay_admin_session")?.value);
  if (!admin) return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 401 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Data review tidak valid." }, { status: 400 }); }
  const userId = typeof body.userId === "string" ? body.userId : "";
  const status = typeof body.status === "string" ? body.status : "";
  const reason = typeof body.reason === "string" ? body.reason.trim() : "";
  const notes = typeof body.notes === "string" ? body.notes.trim() : "";
  const amount = body.approvedLimit === "" || body.approvedLimit == null ? null : Number(body.approvedLimit);
  if (!userId || !statuses.has(status) || reason.length < 3 || reason.length > 1000 || notes.length > 3000) {
    return NextResponse.json({ error: "Lengkapi status dan alasan review (minimal 3 karakter)." }, { status: 400 });
  }
  if (status === "eligible" && (!amount || !Number.isInteger(amount) || amount <= 0)) {
    return NextResponse.json({ error: "Masukkan nominal limit lebih besar dari nol untuk keputusan layak." }, { status: 400 });
  }
  if (status !== "eligible" && amount !== null) return NextResponse.json({ error: "Nominal limit hanya diisi untuk status layak." }, { status: 400 });
  if ((status === "eligible" || status === "not_eligible") && !["credit_approver", "super_admin"].includes(admin.role)) {
    return NextResponse.json({ error: "Role admin ini tidak memiliki izin menetapkan keputusan limit." }, { status: 403 });
  }
  try {
    const result = await saveAdminReview({ userId, adminId: admin.id, status: status as "in_review" | "needs_revision" | "eligible" | "not_eligible", approvedLimit: amount, reason, notes });
    if (!result.success) return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gagal menyimpan review admin:", error);
    return NextResponse.json({ error: "Review gagal disimpan." }, { status: 500 });
  }
}
