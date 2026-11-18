# Dokumentasi FlexiPay

Folder ini menyimpan spesifikasi produk yang menjadi acuan implementasi.

## Konteks produk

FlexiPay adalah prototipe aplikasi Buy Now, Pay Later (BNPL) untuk membantu pengguna memahami layanan, transaksi, dan tagihan. MVP menggunakan data prototipe; pembayaran uang sungguhan, integrasi bank/merchant, dan penilaian kredit nyata tidak termasuk dalam cakupan. Baca [PRD FlexiPay](general/prd.md) untuk tujuan, ruang lingkup, aturan bisnis, dan batasan produk. Gunakan [persona pengguna](general/personas_flexipay.md) sebagai referensi kebutuhan dan konteks pengguna.

## User stories

- [US-01 — Landing page](auth/US-01-landing-page/)
- [US-02 — Login dan logout](auth/US-02-login-logout/)
- [US-03 — Registrasi akun](auth/US-03-register/)
- [US-04 — Pengajuan dan pengecekan limit](auth/US-04-pengajuan-dan-pengecekan-limit/)
- [US-05 — Verifikasi identitas pengguna](auth/US-05-verifikasi-identitas-pengguna/)
- [US-07 — Profil dan edit data pengguna](auth/US-07-profil-dan-edit-data-pengguna/)
- [US-08 — Dashboard utama nasabah](auth/US-08-dashboard/)
- [US-09 — Ringkasan limit, transaksi, dan tagihan](auth/US-09-ringkasan-limit/)
- [US-10 — Informasi jatuh tempo cicilan](auth/US-10-informasi-jatuh-tempo-cicilan/)
- [US-11 — Daftar merchant partner](auth/US-11-daftar-merchant-partner/)
- [US-12 — Pencarian merchant fashion dan lifestyle](auth/US-12-pencarian-merchant-fashion-lifestyle/)
- [US-13 — Scan QRIS](auth/US-13-scan-qris/)
- [US-16 — Pilihan metode pembayaran](auth/US-16-pilihan-metode-pembayaran/)
- [US-17 — Pilihan tenor cicilan](auth/US-17-pilihan-tenor-cicilan/)
- [US-18 — Simulasi cicilan sebelum transaksi](auth/US-18-simulasi-cicilan-sebelum-transaksi/)
- [US-19 — Rincian biaya dan ketentuan cicilan](auth/US-19-rincian-biaya-dan-ketentuan-cicilan/)
- [US-22 — Daftar dan detail tagihan cicilan](auth/US-22-daftar-dan-detail-tagihan-cicilan/)
- [US-24 — Riwayat pembayaran cicilan](auth/US-24-riwayat-pembayaran-cicilan/)
- [US-41 — Katalog produk dan Rent Now, Pay Later](auth/US-41-katalog-produk-rent-now-pay-later/)
- [US-42 — Portal admin](auth/US-42-admin/) — portal admin tersedia di `/admin`.

## Identitas brand

Panduan sumber: [Brand Identity FlexiPay](brand/Brand%20Identity%20FlexiPay.pdf). Logo utama dan ikon aplikasi yang digunakan website tersedia di `public/flexipay-primary-logo.png` dan `public/flexipay-app-icon.png`.

## Keputusan implementasi

Lihat [catatan implementasi](auth/IMPLEMENTATION-NOTES.md) untuk keputusan produk terbaru yang menyelaraskan dokumen backlog dengan perilaku website. Baca juga [tech stack](general/tech-stack.md) sebelum mengubah arsitektur atau dependensi.
