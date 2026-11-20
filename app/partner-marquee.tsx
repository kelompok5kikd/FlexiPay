"use client";

import { useMemo, useState } from "react";

const partners = [
  { name: "Nike", logo: "nike", category: "Olahraga" },
  { name: "Adidas", logo: "adidas", category: "Olahraga" },
  { name: "Zara", logo: "zara", category: "Fashion" },
  { name: "Uniqlo", logo: "uniqlo", category: "Fashion" },
  { name: "Puma", logo: "puma", category: "Olahraga" },
  { name: "New Balance", logo: "newbalance", category: "Olahraga" },
  { name: "Samsung", logo: "samsung", category: "Teknologi" },
  { name: "Xiaomi", logo: "xiaomi", category: "Teknologi" },
  { name: "Apple", logo: "apple", category: "Teknologi" },
  { name: "Under Armour", logo: "underarmour", category: "Olahraga" },
  { name: "Reebok", logo: "reebok", category: "Olahraga" },
  { name: "Fila", logo: "fila", category: "Olahraga" },
  { name: "Airbnb", logo: "airbnb", category: "Hunian & lifestyle" },
  { name: "Booking.com", logo: "bookingdotcom", category: "Hunian & lifestyle" },
  { name: "IKEA", logo: "ikea", category: "Hunian & lifestyle" },
];

const categories = ["Semua", "Fashion", "Olahraga", "Teknologi", "Hunian & lifestyle"];

export function PartnerMarquee() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("id-ID");
    return partners.filter((partner) =>
      (category === "Semua" || partner.category === category)
      && (!normalizedQuery || partner.name.toLocaleLowerCase("id-ID").includes(normalizedQuery)
        || partner.category.toLocaleLowerCase("id-ID").includes(normalizedQuery)),
    );
  }, [category, query]);

  return (
    <section className="partner-showcase" id="merchant-partner" aria-labelledby="partner-title">
      <div className="partner-marquee-heading">
    <h2 id="partner-title" className="eyebrow dark-eyebrow">MERCHANT PARTNER</h2>
      </div>
      <div className="partner-marquee" aria-label="Logo merchant pilihan">
        <div className="partner-lane">
          <div className="partner-track">
            {[0, 1].map((copy) => (
              <div className="partner-set" key={copy} aria-hidden={copy === 1}>
                {partners.map((partner) => (
                  <img
                    className="partner-logo"
                    key={partner.logo}
                    src={`/partner-logos/${partner.logo}.svg`}
                    alt={copy === 0 ? partner.name : ""}
                    width="48"
                    height="48"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="partner-directory">
        <div className="partner-directory-heading">
          <div><span className="partner-directory-kicker">JELAJAHI PILIHAN</span><h3>Daftar merchant</h3></div>
          <span className="partner-result-count">{results.length} merchant</span>
        </div>
        <div className="partner-directory-controls">
          <label className="partner-search-label">
            <span className="sr-only">Cari merchant</span>
            <span aria-hidden="true">⌕</span>
            <input
              suppressHydrationWarning
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari nama atau kategori merchant"
            />
          </label>
          <label className="partner-category-label">
            <span className="sr-only">Filter kategori</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        {results.length ? <div className="partner-directory-grid">
          {results.map((partner) => <article className="partner-directory-card" key={partner.logo}>
            <div className="partner-directory-logo"><img src={`/partner-logos/${partner.logo}.svg`} alt="" width="58" height="58" loading="lazy" decoding="async" /></div>
            <div className="partner-directory-name">{partner.name}</div>
            <div className="partner-directory-category">{partner.category}</div>
          </article>)}
        </div> : <p className="partner-empty" role="status">Merchant tidak ditemukan. Coba kata kunci atau kategori lain.</p>}
      </div>
    </section>
  );
}
