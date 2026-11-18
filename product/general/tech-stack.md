# Tech stack FlexiPay

## Framework dan bahasa

- Next.js `16.4.5` dengan App Router.
- React dan React DOM `19.3.0`.
- TypeScript `5`.
- Node.js `24` atau lebih baru. Proyek memakai modul bawaan `node:sqlite`.

## Tampilan

- Tailwind CSS `4` tersedia dan diimpor melalui `app/globals.css`.
- Gaya utama saat ini menggunakan CSS proyek di `app/globals.css`; pertahankan token, komponen, dan breakpoint yang sudah ada.
- Aset statis, termasuk logo, berada di `public/` dan dipanggil dengan path dari root, misalnya `/flexipay-primary-logo.png`.
- Pertahankan desain responsif untuk ponsel, tablet, laptop, serta layar lebar.

## Server dan API

- Next.js Route Handlers di `app/api/` menangani endpoint server.
- Logika domain dan akses data berada di `lib/` dan modul server harus tetap berjalan di server, bukan di Client Component.
- Dependensi inti dijaga tetap ringan. Jangan menambah library sebelum memeriksa apakah kemampuan yang diperlukan sudah tersedia di proyek atau platform.

## Database dan penyimpanan

- Database lokal menggunakan SQLite melalui `node:sqlite` (`DatabaseSync`). File database lokal berada di `data/flexipay.db`.
- Skema dan inisialisasi database saat ini dikelola oleh modul domain di `lib/`; proyek belum memakai Prisma atau ORM lain.
- Jangan membuat database terpisah per fitur. Pertahankan tabel, relasi, constraint, dan pola akses yang sudah ada.
- Data di `data/` dan dokumen pengajuan pengguna adalah data persisten lokal. Jangan menghapus, mereset, atau mengganti skemanya tanpa migrasi yang menjaga data lama.
- Sebelum deployment, pastikan lingkungan menyediakan penyimpanan SQLite persisten yang kompatibel. Sistem file sementara/serverless tidak menjamin file database tetap ada setelah instance diganti; gunakan database persisten yang sesuai untuk hosting.

## Autentikasi dan keamanan

- Autentikasi pengguna dan admin ditangani oleh kode server di `lib/` serta endpoint `app/api/`.
- PIN pengguna disimpan sebagai hash, bukan PIN mentah. Jangan menambahkan penyimpanan kata sandi atau PIN dalam teks biasa.
- Kunci enkripsi dan kredensial admin diambil dari environment variable. Gunakan `.env.local` untuk konfigurasi lokal dan `.env.example` hanya untuk nama variabel serta placeholder.
- Jangan mencatat data identitas atau dokumen sensitif ke log maupun respons yang tidak berwenang.

## Perintah yang tersedia

- `npm run dev` — menjalankan server pengembangan.
- `npm run build` — membuat build produksi.
- `npm run start` — menjalankan build produksi.
- `npm run lint` — menjalankan ESLint.
- `npm run db:users` — melihat daftar akun lokal.

## Integrasi eksternal

- Midtrans belum menjadi dependensi atau integrasi aktif di `package.json`. Jangan menganggap pembayaran sungguhan sudah dapat diproses sampai konfigurasi dan alur callback Midtrans benar-benar diterapkan.
- Katalog dan beberapa data demo dikelola oleh kode proyek; bedakan data simulasi dari layanan eksternal produksi.
