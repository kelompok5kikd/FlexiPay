"use client";

import { ReactNode, useEffect, useState } from "react";
import { LoginForm } from "./login/login-form";
import { RegisterForm } from "./register/register-form";
import type { AuthMode } from "./auth-trigger";

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AuthMode | null>(null);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const open = (event: Event) => {
      const detail = (event as CustomEvent<{ mode: AuthMode }>).detail;
      setRegistered(false);
      setMode(detail.mode);
    };
    window.addEventListener("flexipay:auth", open);
    return () => window.removeEventListener("flexipay:auth", open);
  }, []);

  useEffect(() => {
    if (!mode) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMode(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mode]);

  return <>
    {children}
    {mode && <div className="auth-modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setMode(null); }}>
      <section className={`auth-card auth-modal-card ${mode === "register" ? "register-card" : "login-card"}`} role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        <button className="auth-modal-close" type="button" aria-label="Tutup" onClick={() => setMode(null)}>×</button>
        <div className="auth-logo"><img src="/flexipay-logo.png" alt="FlexiPay" /></div>
        <div className="auth-eyebrow"><span/> WELCOME TO FLEXIPAY</div>
        <h1 id="auth-modal-title">{mode === "login" ? "Selamat datang kembali" : "Buat akun FlexiPay"}</h1>
        <p className="auth-intro">{mode === "login" ? "Masuk menggunakan email dan PIN FlexiPay." : "Lengkapi data untuk membuat akun FlexiPay."}</p>
        {registered && <p className="auth-success" role="status">Registrasi berhasil. Silakan masuk dengan email dan PIN Anda.</p>}
        {mode === "login" ? <LoginForm onSuccess={() => setMode(null)} /> : <RegisterForm onSuccess={() => { setMode("login"); setRegistered(true); }} />}
        <div className="auth-switch">{mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"} <button type="button" onClick={() => { setRegistered(false); setMode(mode === "login" ? "register" : "login"); }}>{mode === "login" ? "Buat akun" : "Masuk"}</button></div>
        <div className="auth-footnote">PIN dienkripsi sebagai hash sebelum disimpan.</div>
      </section>
    </div>}
  </>;
}
