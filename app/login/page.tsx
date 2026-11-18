import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { getUserForSession } from "@/lib/auth-db";
import { LoginForm } from "./login-form";

export const metadata = { title: "Masuk — FlexiPay" };
export const instant = false;

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ registered?: string; next?: string }> }) {
  await connection();
  const cookieStore = await cookies();
  const params = await searchParams;
  const next = params.next?.startsWith("/") && !params.next.startsWith("//") ? params.next : "/";
  if (getUserForSession(cookieStore.get("flexipay_session")?.value)) redirect(next);
  return <main className="auth-page"><div className="auth-backdrop"/><section className="auth-card login-card">
    <Link className="auth-logo" href="/" aria-label="Kembali ke beranda"><img src="/flexipay-logo.png" alt="FlexiPay" /></Link>
    <div className="auth-eyebrow"><span/> WELCOME TO FLEXIPAY</div><h1>Selamat datang kembali</h1><p className="auth-intro">Masuk menggunakan email dan PIN FlexiPay.</p>
    {params.registered === "1" && <p className="auth-success" role="status">Registrasi berhasil. Silakan login dengan akun yang baru dibuat.</p>}
    <LoginForm redirectTo={next} />
    <div className="auth-switch">Belum punya akun? <Link href={next === "/" ? "/register" : `/register?next=${encodeURIComponent(next)}`}>Buat akun</Link></div>
    <div className="auth-footnote">Informasi akun diproses secara aman.</div>
  </section></main>;
}
