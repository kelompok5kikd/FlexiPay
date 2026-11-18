import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminForSession } from "@/lib/admin-db";
import { decideCreditApplication } from "@/lib/credit-applications";
const allowed = new Set(["in_review","needs_revision","approved","rejected"]);
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}) {
 const jar=await cookies(), admin=getAdminForSession(jar.get("flexipay_admin_session")?.value); if(!admin)return NextResponse.json({error:"Akses admin diperlukan."},{status:401});
 let body:Record<string,unknown>; try{body=await request.json()}catch{return NextResponse.json({error:"Data keputusan tidak valid."},{status:400})}
 const status=String(body.status??""),note=typeof body.note==="string"?body.note.trim():"",amount=body.approvedLimit==null||body.approvedLimit===""?null:Number(body.approvedLimit),tenor=body.approvedTenor==null||body.approvedTenor===""?null:Number(body.approvedTenor);
 if(!allowed.has(status)||note.length<3||note.length>2000)return NextResponse.json({error:"Pilih status dan tuliskan catatan minimal 3 karakter."},{status:400});
 if(status==="approved"&&(!Number.isSafeInteger(amount)||Number(amount)<=0||!Number.isInteger(tenor)||Number(tenor)<1||Number(tenor)>24))return NextResponse.json({error:"Limit harus lebih dari nol dan tenor 1–24 bulan."},{status:400});
 if(status!=="approved"&&(amount!==null||tenor!==null))return NextResponse.json({error:"Limit dan tenor hanya diisi untuk pengajuan disetujui."},{status:400});
 try{const {id}=await params;const result=decideCreditApplication({applicationId:id,admin,status:status as "in_review"|"needs_revision"|"approved"|"rejected",note,approvedLimit:amount,approvedTenor:tenor});if(!result.success)return NextResponse.json({error:result.reason==="permission"?"Role admin ini tidak dapat menyetujui pengajuan.":"Pengajuan tidak ditemukan."},{status:result.reason==="permission"?403:404});return NextResponse.json({success:true})}catch{return NextResponse.json({error:"Keputusan gagal disimpan."},{status:500})}
}
