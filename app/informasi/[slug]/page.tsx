import { connection } from "next/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";
import { getAvailableCredit } from "@/lib/commerce-db";
import { SiteHeader } from "../../site-header";
import { SiteFooter } from "../../site-footer";
import { informationLinks, siteInformation } from "../../site-information";

export const instant = false;

export function generateStaticParams() {
  return informationLinks.map(([slug]) => ({ slug }));
}

export default async function InformationPage({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const page = siteInformation[slug];
  if (!page) notFound();

  const user = await getCurrentUser();
  const availableLimit = user ? await getAvailableCredit(user.id) : 0;
  const faqGroups = page.faqs ? [
    { title: "Tentang FlexiPay", start: 0, end: 3 },
    { title: "Akun dan Verifikasi", start: 3, end: 7 },
    { title: "Limit dan Pengajuan", start: 7, end: 10 },
    { title: "Transaksi", start: 10, end: 14 },
    { title: "Tagihan dan Pembayaran", start: 14, end: 17 },
    { title: "Keamanan", start: 17, end: 19 },
    { title: "Bantuan", start: 19, end: 20 },
  ] : [];

  return <main className="information-page">
    <SiteHeader user={user} activePath={`/informasi/${slug}`} totalLimit={availableLimit} />
    <section className="information-hero">
      <Link href="/" className="information-back">← Kembali ke Beranda</Link>
      <span className="information-eyebrow">INFORMASI FLEXIPAY</span>
      <h1>{page.title}</h1>
      {page.intro && <p>{page.intro}</p>}
      {page.updated && <small className="information-updated">Terakhir diperbarui: {page.updated}</small>}
    </section>
    <div className="information-layout">
      <nav className="information-nav" aria-label="Halaman informasi">
        {informationLinks.map(([linkSlug, label]) => <a href={`/informasi/${linkSlug}`} key={linkSlug} aria-current={linkSlug === slug ? "page" : undefined}>{label}<span>↗</span></a>)}
      </nav>
      <article className="information-content">
        {page.draftNote && <aside className="information-draft-note">{page.draftNote}</aside>}
        {page.faqs ? faqGroups.map((group) => <section className="information-section faq-section" key={group.title}>
          <h2>{group.title}</h2>
          {page.faqs!.slice(group.start, group.end).map((faq) => <details className="faq-item" key={faq.question}>
            <summary>{faq.question}<span aria-hidden="true">+</span></summary>
            <p>{faq.answer}</p>
          </details>)}
        </section>) : page.sections.map((section) => <section className="information-section" key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
        </section>)}
        {slug === "about-us" && <section className="information-section"><h2>Hubungi Kami</h2><p>Jika memiliki pertanyaan, masukan, atau membutuhkan informasi lebih lanjut mengenai FlexiPay, silakan hubungi kami melalui <a href="mailto:support@flexipay.id">support@flexipay.id</a>.</p><p>Jam Layanan: Senin–Jumat, pukul 09.00–17.00 WIB.</p></section>}
      </article>
    </div>
    <SiteFooter />
  </main>;
}
