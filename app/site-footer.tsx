import Link from "next/link";
import { informationLinks } from "./site-information";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <Link className="brand footer-brand" href="/" aria-label="FlexiPay, Beranda">
          <img className="brand-logo" src="/flexipay-logo.png" alt="FlexiPay — your payment, your flexibility" />
        </Link>
        <nav className="footer-information-links" aria-label="Informasi FlexiPay">
          {informationLinks.map(([slug, label]) => <a href={`/informasi/${slug}`} key={slug}>{label}</a>)}
        </nav>
        <div className="footer-contact">
          <a href="mailto:support@flexipay.id">Email: support@flexipay.id</a>
          <span>Jam Layanan: Senin–Jumat, pukul 09.00–17.00 WIB</span>
        </div>
      </div>
    </footer>
  );
}
