import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserForSession } from "@/lib/auth-db";
import { submitCommerceCheckout, type CheckoutInput } from "@/lib/commerce-db";
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request:Request){
 const jar=await cookies(),user=getUserForSession(jar.get("flexipay_session")?.value);
 if(!user)return NextResponse.json({error:"Silakan login untuk menggunakan limit FlexiPay."},{status:401});
 let body:Record<string,unknown>;try{body=await request.json()}catch{return NextResponse.json({error:"Data checkout tidak valid."},{status:400})}
 const kind=body.kind==="product"?"product":body.kind==="rental"?"rental":null;
 const itemId=typeof body.itemId==="string"?body.itemId.trim():"";
 const pin=typeof body.pin==="string"?body.pin:"";
 const idempotencyKey=typeof body.idempotencyKey==="string"?body.idempotencyKey:"";
 const quantity=Number(body.quantity??1),durationMonths=body.durationMonths==null?null:Number(body.durationMonths);
 const raw=body.recipient&&typeof body.recipient==="object"?body.recipient as Record<string,unknown>:{};
 const recipient={name:String(raw.name??"").trim(),phone:String(raw.phone??"").trim(),email:String(raw.email??"").trim().toLowerCase(),address:String(raw.address??"").trim(),postalCode:String(raw.postalCode??"").trim()};
 if(!kind||!itemId||!/^[0-9]{6}$/.test(pin)||!/^[A-Za-z0-9-]{16,100}$/.test(idempotencyKey))return NextResponse.json({error:"Periksa pilihan item dan PIN 6 digit."},{status:400});
 if(kind==="product"&&(!Number.isInteger(quantity)||quantity<1||quantity>10||recipient.name.length<2||recipient.name.length>150||recipient.phone.length<7||recipient.phone.length>25||!emailPattern.test(recipient.email)||recipient.address.length<8||recipient.address.length>500||!/^\d{5,10}$/.test(recipient.postalCode)))return NextResponse.json({error:"Lengkapi nama penerima, telepon, email, alamat, dan kode pos dengan benar."},{status:400});
 if(kind==="rental"&&(!Number.isInteger(durationMonths)||Number(durationMonths)<1||Number(durationMonths)>12))return NextResponse.json({error:"Durasi sewa harus 1 sampai 12 bulan."},{status:400});
 try{
  const result=submitCommerceCheckout({userId:user.id,kind,itemId,quantity,durationMonths,idempotencyKey,pin,...(kind==="product"?{recipient}:{})} as CheckoutInput);
  if(!result.success){const status=result.reason==="pin_locked"?423:result.reason==="invalid"?400:result.reason==="unavailable"?409:result.reason==="limit"?409:401;const error=result.reason==="pin"?"PIN transaksi salah. Coba lagi.":result.reason==="pin_locked"?"Terlalu banyak PIN salah. Coba lagi dalam 15 menit.":result.reason==="limit"?"Limit tidak cukup.":result.reason==="unavailable"?"Produk atau listing sudah tidak tersedia.":"Data transaksi tidak valid.";return NextResponse.json({error,code:result.reason,availableLimit:result.availableLimit},{status})}
  const message=encodeURIComponent(`Halo, saya sudah melakukan booking FlexiPay dengan referensi ${result.referenceNumber}.`);
  return NextResponse.json({...result,whatsappUrl:result.whatsappNumber?`https://wa.me/${result.whatsappNumber}?text=${message}`:null});
 }catch(error){
  console.error("[commerce/checkout] Transaksi gagal:",error);
  return NextResponse.json({error:"Transaksi gagal diproses dan limit tidak berubah."},{status:500});
 }
}
