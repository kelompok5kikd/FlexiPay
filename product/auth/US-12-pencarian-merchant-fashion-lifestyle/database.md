# US-12 — Database: Pencarian merchant

**User Story:** US-12 Membuat fitur pencarian merchant.

## Data yang dibutuhkan

### Struktur
`merchants: id uuid PK, name varchar, category_id uuid FK, searchable_text text, status varchar`

### Struktur
`merchant_categories: id uuid PK, name varchar`

## Prinsip database
- Gunakan UUID sebagai primary key, `numeric(14,2)` untuk nominal uang, dan `timestamptz` untuk waktu.
- Terapkan foreign key, unique constraint, serta validasi status menggunakan CHECK/enum.
- Password, OTP, PIN, dan token harus disimpan sebagai hash; jangan menyimpan nilai mentah.
- Data identitas dienkripsi dan aksesnya dibatasi.
- File bukti/dokumen disimpan di object storage; database menyimpan metadata atau file reference.
- Catat audit untuk perubahan data sensitif dan status transaksi.

## Relasi/dependensi
- Hubungkan tabel ke entitas inti FlexiPay melalui foreign key sesuai struktur yang disebutkan.
- Pastikan tabel sumber (users, transactions, merchants, financings, installments) tersedia sebelum migrasi fitur ini.

## Catatan implementasi
Dokumen ini merupakan rancangan kebutuhan database per user story. Selaraskan nama kolom dan constraint dengan ERD/migrasi utama sebelum implementasi.
