"use client";
import { useState } from "react";
import Link from "next/link";
import type { AuthUser } from "@/lib/auth-db";
import type { CatalogProduct, RentalListing } from "@/lib/commerce-db";
const money=(n:number)=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
function checkoutHref(user:AuthUser|null,id:string){const next=`/checkout?product=${encodeURIComponent(id)}`;return user?next:`/login?next=${encodeURIComponent(next)}`}
export function ProductCatalog({products,rentals,user,availableLimit}:{products:CatalogProduct[];rentals:RentalListing[];user:AuthUser|null;availableLimit:number}){
 const [tab,setTab]=useState<"products"|"rentals">("products");
 return <div className="catalog-experience"><div className="catalog-tabs" role="tablist"><button type="button" role="tab" aria-selected={tab==="products"} className={tab==="products"?"active":""} onClick={()=>setTab("products")}>Produk</button><button type="button" role="tab" aria-selected={tab==="rentals"} className={tab==="rentals"?"active":""} onClick={()=>setTab("rentals")}>Rent Now, Pay Later <span className="catalog-new">BARU</span></button><span className="catalog-available">Limit tersedia <b>{money(availableLimit)}</b></span></div>
 {tab==="products"?<div className="catalog-grid">{products.map(p=><article className="catalog-card" key={p.id}><div className="catalog-image"><img src={p.imageUrl} alt={p.name}/><span>{p.category}</span></div><div className="catalog-card-copy"><h2>{p.name}</h2><p>{p.description}</p><strong>{money(p.price)}</strong><small>{p.stock} tersedia</small><Link className="catalog-buy" href={checkoutHref(user,p.id)}>Beli dengan limit <span>→</span></Link></div></article>)}</div>:<div className="catalog-grid">{rentals.map(r=><article className="catalog-card rental-card" key={r.id}><Link className="catalog-image" href={`/sewa/${r.id}`}><img src={r.imageUrl} alt={r.title}/><span>{r.propertyType}</span></Link><div className="catalog-card-copy"><h2>{r.title}</h2><p>{r.city} · {r.addressLine}</p><strong>{money(r.monthlyPrice)} <small>/ bulan</small></strong><Link className="catalog-rental-link" href={`/sewa/${r.id}`}>Lihat detail & pemilik <span>↗</span></Link></div></article>)}</div>}
 <p className="catalog-prototype-note">Katalog dan transaksi ini adalah simulasi prototipe FlexiPay. Pastikan limit cukup sebelum konfirmasi.</p></div>
}
