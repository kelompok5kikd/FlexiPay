import { ScanQR } from "./scan-qr";
import { AuthTrigger } from "./auth-trigger";
import { ProfileMenu } from "./profile-menu";
import { MobileSiteNav } from "./mobile-site-nav";
import type { AuthUser } from "@/lib/auth-db";

const links = [
  ["/", "Beranda"],
  ["/keunggulan", "Keunggulan"],
  ["/produk", "Pilihan produk"],
  ["/cara-kerja", "Cara kerja"],
  ["/pengajuan-kredit", "Pengajuan kredit"],
] as const;

export function SiteHeader({ user, activePath = "/", totalLimit = 0 }: { user: AuthUser | null; activePath?: string; totalLimit?: number }) {
  const formattedLimit = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(totalLimit);
  return <header className="site-header">
    <a className="brand" href="/" aria-label="FlexiPay, Beranda"><img className="brand-logo" src="/flexipay-logo.png" alt="FlexiPay — your payment, your flexibility" /></a>
    <MobileSiteNav activePath={activePath} />
    <nav aria-label="Navigasi utama">{links.map(([href, label]) => <a key={href} href={href} aria-current={activePath === href ? "page" : undefined}>{label}</a>)}</nav>
    <div className="header-actions"><div className="limit"><small>Total limit</small><b>{formattedLimit}</b></div><ScanQR />{user ? <ProfileMenu user={user} /> : <><AuthTrigger mode="login" className="login">Masuk</AuthTrigger><AuthTrigger mode="register" className="button button-small">Buat akun <span>↗</span></AuthTrigger></>}</div>
  </header>;
}
