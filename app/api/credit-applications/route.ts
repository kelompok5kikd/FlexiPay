import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserForSession } from "@/lib/auth-db";
import { createCreditApplication, type ApplicationDocumentInput, type ApplicationDocumentKind } from "@/lib/credit-applications";

const maxFileSize = 3 * 1024 * 1024;
const kinds: ApplicationDocumentKind[] = ["ktp", "selfie", "income"];
const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const integer = (value: string) => /^\d+$/.test(value) ? Number(value) : NaN;
function detectedType(kind: ApplicationDocumentKind, file: File, bytes: Buffer) {
  if (!file.size || file.size > maxFileSize) return null;
  const jpg = bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const png = bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const pdf = bytes.subarray(0,5).toString() === "%PDF-";
  if (jpg) return { mimeType:"image/jpeg", extension:"jpg" };
  if (png) return { mimeType:"image/png", extension:"png" };
  if (kind !== "selfie" && pdf) return { mimeType:"application/pdf", extension:"pdf" };
  return null;
}
export async function POST(request: Request) {
  const jar = await cookies();
  const user = await getUserForSession(jar.get("flexipay_session")?.value);
  if (!user) return NextResponse.json({ error: "Silakan login untuk mengajukan kredit.", redirect: "/login?next=%2Fpengajuan-kredit" }, { status: 401 });
  try {
    const form = await request.formData();
    const fullName=text(form,"fullName"), nik=text(form,"nik"), birthDate=text(form,"birthDate"), maritalStatus=text(form,"maritalStatus"), phone=text(form,"phone"), ktpAddress=text(form,"ktpAddress"), domicileAddress=text(form,"domicileAddress"), employmentStatus=text(form,"employmentStatus"), companyName=text(form,"companyName"), position=text(form,"position"), purpose=text(form,"purpose");
    const workingMonths=integer(text(form,"workingMonths")), monthlyIncome=integer(text(form,"monthlyIncome")), monthlyExpenses=integer(text(form,"monthlyExpenses")), requestedLimit=integer(text(form,"requestedLimit")), desiredTenor=integer(text(form,"desiredTenor"));
    if ([fullName,nik,birthDate,maritalStatus,phone,ktpAddress,domicileAddress,employmentStatus,companyName,position,purpose].some(v=>!v) || !/^\d{16}$/.test(nik) || !Number.isInteger(workingMonths) || workingMonths<0 || !Number.isInteger(monthlyIncome) || monthlyIncome<1 || !Number.isInteger(monthlyExpenses) || monthlyExpenses<0 || !Number.isInteger(requestedLimit) || requestedLimit<1 || !Number.isInteger(desiredTenor) || desiredTenor<1 || desiredTenor>24) return NextResponse.json({ error: "Periksa kembali data wajib, NIK 16 digit, nominal, dan tenor 1–24 bulan." }, { status: 400 });
    const files: ApplicationDocumentInput[]=[];
    for (const kind of kinds) { const raw=form.get(kind); if (!(raw instanceof File)) return NextResponse.json({ error: "KTP, selfie dengan KTP, dan slip penghasilan wajib diunggah." }, { status: 400 }); const bytes=Buffer.from(await raw.arrayBuffer()); const detected=detectedType(kind,raw,bytes);if(!detected)return NextResponse.json({ error: "Dokumen harus JPG, PNG, atau PDF (selfie JPG/PNG), maksimal 3 MB." }, { status: 400 }); files.push({kind,content:bytes,...detected}); }
    const result=await createCreditApplication({ userId:user.id, data:{ fullName,nik,birthDate,maritalStatus,phone,email:user.email,ktpAddress,domicileAddress,employmentStatus,companyName,position,workingMonths,monthlyIncome,monthlyExpenses,requestedLimit,desiredTenor,purpose }, files });
    if (!result.success) {
      if (result.reason === "user") return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });
      return NextResponse.json({ error: "Pengajuan sebelumnya masih menunggu review. Periksa status pengajuan yang sedang berjalan." }, { status: 409 });
    }
    return NextResponse.json(result,{status:201});
  } catch (error) {
    console.error("Gagal menyimpan pengajuan kredit:", error);
    return NextResponse.json({ error: "Pengajuan belum dapat disimpan. Coba lagi setelah server diperiksa." },{status:500});
  }
}
