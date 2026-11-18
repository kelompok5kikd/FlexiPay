# AGENTS.md — panduan kerja proyek FlexiPay

## Konteks umum — baca sebelum mengubah kode

- `product/general/prd.md` — tujuan produk, ruang lingkup MVP, dan batasan.
- `product/general/personas_flexipay.md` — kebutuhan, konteks, dan pain point persona pengguna FlexiPay.
- `product/brand/` — identitas visual dan aset brand FlexiPay.
- `product/auth/IMPLEMENTATION-NOTES.md` — keputusan implementasi lintas fitur.
- `product/general/tech-stack.md` — teknologi dan batasan teknis proyek.

Untuk pekerjaan pada fitur tertentu, baca semua dokumen yang tersedia di folder fiturnya: `user-story.md`, `user-flow.md`, `database.md`, flowchart, dan catatan implementasi. Dokumen produk adalah konteks untuk pekerjaan; ikuti permintaan pengguna saat ini jika ada perubahan arahan.

## Struktur proyek

- Spesifikasi produk dan user story berada di `product/`, dikelompokkan berdasarkan area dan fitur.
- UI halaman dan API berada di `app/` mengikuti Next.js App Router.
- Logika domain dan akses database berada di `lib/`.
- Aset yang dilayani langsung oleh aplikasi berada di `public/`.
- Jangan membuat folder `modules/` atau memindahkan arsitektur yang sudah ada tanpa kebutuhan yang jelas. Pertahankan pola proyek saat ini.
- Letakkan dokumen umum baru di `product/general/`; dokumen fitur tetap bersama dokumen fitur terkait.

## Aturan implementasi

- Pertahankan Next.js App Router dan TypeScript. Gunakan pola dan komponen yang sudah ada sebelum menambah dependensi atau abstraksi baru.
- Baca dokumentasi fitur dan implementasi terkait sebelum mengubah alur, skema, atau tampilan.
- Perubahan UI harus responsif, dapat digunakan dengan keyboard, dan menjaga gaya brand FlexiPay.
- Perubahan database harus mempertahankan data yang sudah ada. Jangan menghapus atau mengubah data pengguna, pengajuan, transaksi, maupun migrasi yang telah berjalan sebagai bagian dari pekerjaan UI.
- Validasi aturan penting di server/API, bukan hanya pada browser.
- Jangan menyimpan PIN, kata sandi, token, kunci enkripsi, atau rahasia dalam teks biasa, kode sumber, log, atau respons API. Gunakan `.env.local` untuk nilai lokal; jangan pernah menyalin rahasia ke dokumentasi.
- Jangan mengklaim pembayaran, penilaian kredit, atau integrasi eksternal berhasil jika layanan terkait belum dikonfigurasi.
- Hindari mengganti atau menghapus aset logo dan gambar yang sudah dipakai tanpa instruksi yang relevan.

## Perintah proyek

- `npm run dev` — server pengembangan.
- `npm run build` — build produksi.
- `npm run lint` — pemeriksaan ESLint.
- `npm run db:users` — tampilkan daftar akun lokal melalui skrip proyek.

Jalankan hanya pemeriksaan yang diminta pengguna atau yang memang diperlukan untuk memastikan perubahan yang dibuat.
