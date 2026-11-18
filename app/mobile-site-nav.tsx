"use client";

import { useState } from "react";

const links = [
  ["/", "Beranda"],
  ["/keunggulan", "Keunggulan"],
  ["/produk", "Pilihan produk"],
  ["/cara-kerja", "Cara kerja"],
  ["/pengajuan-kredit", "Pengajuan kredit"],
] as const;

export function MobileSiteNav({ activePath }: { activePath: string }) {
  const [open, setOpen] = useState(false);

  return <div className="mobile-site-nav">
    <button
      className="mobile-nav-toggle"
      type="button"
      aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
      aria-expanded={open}
      aria-controls="mobile-primary-navigation"
      onClick={() => setOpen((value) => !value)}
    >
      <span aria-hidden="true">{open ? "×" : "☰"}</span>
    </button>
    {open && <nav id="mobile-primary-navigation" className="mobile-nav-panel" aria-label="Navigasi utama">
      {links.map(([href, label]) => <a key={href} href={href} aria-current={activePath === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">→</span></a>)}
    </nav>}
  </div>;
}
