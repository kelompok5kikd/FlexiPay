import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminForSession } from "@/lib/admin-db";
import { logCreditDocumentAccess, readCreditApplicationDocument, type ApplicationDocumentKind } from "@/lib/credit-applications";

const documentKinds = new Set<ApplicationDocumentKind>(["ktp", "selfie", "income"]);

export async function GET(_request: Request, { params }: { params: Promise<{ id: string; kind: string }> }) {
  const jar = await cookies();
  const admin = await getAdminForSession(jar.get("flexipay_admin_session")?.value);
  if (!admin) return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 401 });
  if (!["credit_reviewer", "credit_approver", "super_admin"].includes(admin.role)) {
    return NextResponse.json({ error: "Role admin ini tidak dapat membuka dokumen." }, { status: 403 });
  }
  const { id, kind } = await params;
  if (!documentKinds.has(kind as ApplicationDocumentKind)) {
    return NextResponse.json({ error: "Dokumen tidak ditemukan." }, { status: 404 });
  }

  try {
    const documentKind = kind as ApplicationDocumentKind;
    const file = await readCreditApplicationDocument(id, documentKind);
    if (!file) return NextResponse.json({ error: "Dokumen tidak ditemukan." }, { status: 404 });
    await logCreditDocumentAccess(admin.id, id, documentKind);
    return new NextResponse(new Uint8Array(file.content), {
      headers: {
        "Content-Type": file.mimeType,
        "Content-Disposition": "inline",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Gagal membaca dokumen pengajuan kredit:", error);
    return NextResponse.json({ error: "Dokumen tidak dapat dibuka." }, { status: 500 });
  }
}
