import Link from "next/link";
import { connection } from "next/server";
import { notFound,redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { getApprovedLimitForUser } from "@/lib/credit-applications";
import { getAvailableCredit,getCatalogProduct } from "@/lib/commerce-db";
import { SiteHeader } from "../site-header";
import { ProductCheckoutForm } from "./checkout-form";
export const metadata={title:"Checkout produk — FlexiPay"};export const instant=false;
export default async function Page({searchParams}:{searchParams:Promise<{product?:string}>}){await connection();const params=await searchParams;const user=await getCurrentUser();const productId=params.product??"";if(!user)redirect(`/login?next=${encodeURIComponent(`/checkout?product=${productId}`)}`);const approved=getApprovedLimitForUser(user.id);if(approved<=0)redirect("/pengajuan-kredit");const product=getCatalogProduct(productId);if(!product)notFound();return <main className="commerce-page"><SiteHeader user={user} activePath="/produk" totalLimit={getAvailableCredit(user.id)}/><div className="commerce-container"><Link className="commerce-back-link" href="/produk">← Kembali ke katalog</Link><div className="commerce-heading"><span>FLEXIPAY CHECKOUT</span><h1>Selesaikan <em>pembelian.</em></h1><p>Lengkapi data pengiriman dan konfirmasi menggunakan PIN FlexiPay.</p></div><div className="commerce-layout"><section className="commerce-card"><ProductCheckoutForm user={user} product={product} availableLimit={getAvailableCredit(user.id)}/></section><aside className="commerce-side-note"><b>Pembayaran dengan limit FlexiPay</b><p>Limit hanya dipotong setelah data, stok, dan PIN berhasil divalidasi.</p><Link href="/pengajuan-kredit">Informasi pengajuan limit ↗</Link></aside></div></div></main>}
