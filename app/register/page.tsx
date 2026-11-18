import Link from "next/link";
import { RegisterForm } from "./register-form";
import { connection } from "next/server";

export const metadata = { title: "Buat akun — FlexiPay" };

export const instant = false;
export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  await connection();
  const params = await searchParams;
  const next = params.next?.startsWith("/") && !params.next.startsWith("//") ? params.next : "/";
  const loginAfterRegister = `/login?registered=1${next === "/" ? "" : `&next=${encodeURIComponent(next)}`}`;
  return <main className="auth-page"><div className="auth-backdrop"/><section className="auth-card register-card">
    <Link className="auth-logo" href="/" aria-label="Kembali ke beranda"><img src="/flexipay-logo.png" alt="FlexiPay" /></Link>
    <div className="auth-eyebrow"><span/> WELCOME TO FLEXIPAY</div><h1>Buat akun FlexiPay</h1><p className="auth-intro">Lengkapi data untuk membuat akun FlexiPay.</p>
    <RegisterForm afterRegistrationPath={loginAfterRegister} />
    <div className="auth-switch">Sudah punya akun? <Link href={next === "/" ? "/login" : `/login?next=${encodeURIComponent(next)}`}>Masuk</Link></div>
    <div className="auth-footnote">PIN FlexiPay disimpan secara aman.</div>
  </section></main>;
}
