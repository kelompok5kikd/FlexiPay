"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogoutButton } from "./logout-button";

export function ProfileMenu({ user }: { user: { fullName: string; email: string; phone: string; createdAt: string; avatarUrl?: string | null } }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const initials = user.fullName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const memberSince = new Date(user.createdAt).toLocaleDateString("id-ID", { month: "long", year: "numeric", timeZone: "Asia/Jakarta" });

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return <div className="profile-menu" ref={rootRef}>
    <button className="profile-trigger" type="button" aria-expanded={open} aria-controls="profile-card" onClick={() => setOpen((value) => !value)}>
      <span className="profile-trigger-avatar">{user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : initials}</span><span className="profile-trigger-name">{user.fullName.split(/\s+/)[0]}</span><span className="profile-trigger-caret">⌄</span>
    </button>
    {open && <section className="profile-popover" id="profile-card" aria-label="Profil pengguna">
      <div className="popover-user"><span className="popover-avatar">{user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : initials}</span><div><b>{user.fullName}</b><small>Akun FlexiPay aktif</small></div></div>
      <div className="popover-details"><div><span>Email</span><b>{user.email}</b></div><div><span>Nomor HP</span><b>{user.phone}</b></div><div><span>Bergabung</span><b>{memberSince}</b></div></div>
      <Link className="popover-dashboard-link" href="/dashboard" onClick={() => setOpen(false)}>Dashboard nasabah <span>→</span></Link>
      <LogoutButton className="popover-logout" />
    </section>}
  </div>;
}
