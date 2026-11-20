import { ReactNode } from "react";
import type { AuthUser } from "@/lib/auth-db";
import { SiteHeader } from "./site-header";
import { AuthTrigger } from "./auth-trigger";
import { getAvailableCredit, getCommerceCatalog } from "@/lib/commerce-db";
import { ProductCatalog } from "./product-catalog";
import { SiteFooter } from "./site-footer";

export type FeaturePageKey = "keunggulan" | "produk" | "cara-kerja" | "pengajuan-kredit";

const pageContent: Record<FeaturePageKey, { eyebrow: string; title: ReactNode; intro: string }> = {
  keunggulan: { eyebrow: "KENAPA FLEXIPAY", title: <>Lebih leluasa dalam<br /><em>setiap pilihan.</em></>, intro: "Kenali cara FlexiPay membantu pengalaman belanja dan pembayaran terasa lebih mudah dipahami." },
  produk: { eyebrow: "A LITTLE SOMETHING FOR YOU", title: <>Temukan yang cocok<br /><em>dengan gayamu.</em></>, intro: "Jelajahi produk pilihan atau temukan kos dan kontrakan dengan Rent Now, Pay Later." },
  "cara-kerja": { eyebrow: "CARA KERJA", title: <>Mulai dalam<br /><em>tiga langkah.</em></>, intro: "Alur sederhana untuk memahami pengalaman FlexiPay dari membuat akun hingga memilih cara pembayaran." },
  "pengajuan-kredit": { eyebrow: "INFORMASI PENGAJUAN", title: <>Rencanakan dengan<br /><em>lebih fleksibel.</em></>, intro: "Pelajari gambaran pengajuan FlexiPay. Fitur ini masih berupa prototipe dan belum memproses pengajuan kredit sungguhan." },
};

const benefits = [
  { number: "01", icon: "↗", title: "Bayar sesuai kemampuan", body: "Lihat gambaran pilihan pembayaran dan cicilan untuk membantu merencanakan belanja." },
  { number: "02", icon: "▦", title: "QRIS di satu alur", body: "Buka pemindai QR dari website untuk mencoba alur pembacaan QRIS secara simulasi." },
  { number: "03", icon: "✓", title: "Informasi transparan", body: "Pahami nominal dan pilihan pembayaran sebelum melanjutkan ke tahap berikutnya." },
];

function FeatureContent({ page, catalog, user, availableLimit }: { page: FeaturePageKey; catalog: Awaited<ReturnType<typeof getCommerceCatalog>> | null; user: AuthUser | null; availableLimit: number }) {
  if (page === "keunggulan") return <div className="feature-cards">{benefits.map((item) => <article className="benefit-card" key={item.number}><span className="card-number">{item.number}</span><div className="card-icon">{item.icon}</div><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>;

  if (page === "produk" && catalog) return <ProductCatalog products={catalog.products} rentals={catalog.rentals} user={user} availableLimit={availableLimit} />;

  if (page === "cara-kerja") return <div className="steps feature-steps"><article><span>01</span><h3>Buat akun</h3><p>Daftar menggunakan nama, nomor HP, email, dan PIN FlexiPay.</p></article><article><span>02</span><h3>Pindai QRIS</h3><p>Buka fitur Scan QR dan izinkan kamera. Pembacaan QR pada prototipe hanya simulasi.</p></article><article><span>03</span><h3>Pahami pilihan bayar</h3><p>Lihat ilustrasi pilihan pembayaran. Tidak ada uang atau pembayaran nyata yang diproses.</p></article></div>;

  return <div className="application-info"><div className="application-info-icon">i</div><div><h2>Pengajuan kredit belum tersedia</h2><p>Halaman ini menjelaskan konsep layanan FlexiPay. Pengajuan, pemeriksaan kelayakan, dan pencairan kredit sungguhan belum terhubung di prototipe.</p><p>Jangan masukkan data finansial atau identitas sensitif untuk mencoba fitur ini.</p><AuthTrigger mode="register" className="button">Buat akun FlexiPay <span>↗</span></AuthTrigger></div></div>;
}

export async function FeaturePage({ page, user }: { page: FeaturePageKey; user: AuthUser | null }) {
  const content = pageContent[page];
  const [catalog, availableLimit] = await Promise.all([
    page === "produk" ? getCommerceCatalog() : Promise.resolve(null),
    user ? getAvailableCredit(user.id) : Promise.resolve(0),
  ]);
  return <main className="feature-page">
    <SiteHeader user={user} activePath={`/${page}`} totalLimit={availableLimit} />
    <section className={`feature-hero feature-hero-${page}`}><div className="eyebrow dark-eyebrow"><span /> {content.eyebrow}</div><h1>{content.title}</h1><p>{content.intro}</p></section>
    <section className={`feature-body feature-body-${page}`}><FeatureContent page={page} catalog={catalog} user={user} availableLimit={availableLimit} /></section>
    <SiteFooter />
  </main>;
}
