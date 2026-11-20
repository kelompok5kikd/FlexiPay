import { connection } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { SiteHeader } from "./site-header";
import { AuthTrigger } from "./auth-trigger";
import { PartnerMarquee } from "./partner-marquee";
import { getAvailableCredit } from "@/lib/commerce-db";
import { SiteFooter } from "./site-footer";

const videoUrl = "https://www.pexels.com/download/video/34597340/";

const benefits = [
  { number: "01", title: "Bayar sesuai kemampuan", body: "Atur cicilan dengan pilihan tenor yang membantu belanja tetap nyaman." },
  { number: "02", title: "QRIS di banyak merchant", body: "Nikmati pengalaman pembayaran praktis untuk kebutuhan sehari-hari." },
  { number: "03", title: "Semua lebih transparan", body: "Lihat pilihan pembayaran dan pahami biaya sebelum melanjutkan." },
];

export const instant = false;

export default async function Home() {
  await connection();
  const user = await getCurrentUser();
  return (
    <main>
      <SiteHeader user={user} totalLimit={user ? getAvailableCredit(user.id) : 0} />

      <section className="hero" id="beranda">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=2000" aria-label="Suasana kota modern">
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-content"><div className="eyebrow"><span /> BUY NOW, PAY LATER</div>
          <h1>Belanja<br />sekarang,<br /><em>bayar lebih</em><br />fleksibel.</h1>
          <p>Nikmati pengalaman belanja di merchant dengan pembayaran QRIS dan pilihan cicilan yang bisa disesuaikan dengan kebutuhanmu.</p>
          <div className="hero-buttons">{user ? <a className="button" href="/produk">Jelajahi produk <span>↗</span></a> : <><AuthTrigger mode="register" className="button">Buat akun <span>↗</span></AuthTrigger><AuthTrigger mode="login" className="button button-outline">Login <span>→</span></AuthTrigger></>}</div>
          <div className="hero-note"><span className="note-icon">✓</span> Praktis, fleksibel, dan transparan.</div>
        </div>
        <a className="scroll-cue" href="/keunggulan">JELAJAHI KEUNGGULAN <span>↗</span></a>
      </section>

      <PartnerMarquee />

      <section className="benefits section" id="keunggulan"><div className="section-heading"><div><div className="eyebrow dark-eyebrow"><span /> KENAPA FLEXIPAY</div><h2>Lebih leluasa<br />dalam setiap <em>pilihan.</em></h2></div><p>Atur cara bayar dengan nyaman. FlexiPay membantu pengalaman belanja terasa lebih sederhana dari awal sampai selesai.</p></div>
        <div className="benefit-grid">{benefits.map((item) => <article className="benefit-card" key={item.number}><span className="card-number">{item.number}</span><div className="card-icon">{item.number === "01" ? "↗" : item.number === "02" ? "▦" : "✓"}</div><h3>{item.title}</h3><p>{item.body}</p><a href="/keunggulan" aria-label={`Pelajari ${item.title}`}>↗</a></article>)}</div>
      </section>

      <section className="product-section" id="produk"><div className="product-copy"><div className="eyebrow"><span /> PILIHAN PEMBAYARAN</div><h2>Satu akun.<br /><em>Banyak cara.</em></h2><p>Bayar praktis menggunakan QRIS atau pilih cicilan yang sesuai dengan rencana belanjamu. Semua pilihan ditampilkan dengan jelas sebelum kamu mengonfirmasi.</p><a className="button" href="/produk">Jelajahi pilihan produk <span>↗</span></a></div><div className="product-visual"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="phone-card"><div className="phone-top"><span>flexipay</span><span>•••</span></div><div className="phone-label">Pembayaran kamu</div><strong>Rp 450.000</strong><div className="phone-merchant">Kopi & Cerita <span>✓</span></div><div className="phone-options"><div><b>Bayar sekarang</b><span>Rp 450.000</span></div><div><b>Cicilan 3 bulan</b><span>Rp 150.000 / bulan</span></div></div><div className="phone-pay">Pilih pembayaran</div></div><span className="floating-chip chip-qris">▦ &nbsp; QRIS</span><span className="floating-chip chip-flex">✳ &nbsp; Fleksibel</span></div></section>

      <section className="how section" id="cara-kerja"><div className="eyebrow dark-eyebrow"><span /> CARA KERJA</div><div className="how-heading"><h2>Mulai dalam<br /><em>tiga langkah.</em></h2><p>Proses yang jelas supaya kamu bisa fokus menikmati pengalaman belanja.</p></div><div className="steps"><article><span>01</span><h3>Buat akun</h3><p>Daftar dengan informasi yang diperlukan untuk memulai.</p></article><article><span>02</span><h3>Pilih merchant</h3><p>Temukan merchant dan scan QRIS saat akan membayar.</p></article><article><span>03</span><h3>Tentukan cara bayar</h3><p>Pilih pembayaran yang tersedia dan sesuai kebutuhanmu.</p></article></div><a className="button" href="/cara-kerja">Pelajari cara kerja <span>↗</span></a></section>

      <section className="final-cta" id="mulai"><div><div className="eyebrow"><span /> {user ? "AKUN FLEXIPAY" : "LANGKAH PERTAMAMU"}</div><h2>{user ? <>Senang melihatmu<br /><em>kembali.</em></> : <>Belanja nyaman,<br /><em>atur sesukamu.</em></>}</h2><p>{user ? `Kamu masuk sebagai ${user.email}.` : "Kenali FlexiPay dan pilihan pembayarannya."}</p><a className="button button-light" href="/pengajuan-kredit">Lihat informasi pengajuan <span>↗</span></a></div><div className="cta-orb">F<span>✳</span></div></section>

      <SiteFooter />
    </main>
  );
}
