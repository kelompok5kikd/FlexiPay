# US-22 — Database: Daftar/detail tagihan

**User Story:** US-22 Membuat fitur daftar/detail tagihan.

## Data yang dibutuhkan

### Struktur
`financings: id uuid PK, transaction_id uuid FK, principal_amount numeric(14,2), tenor_months int, status varchar`

### Struktur
`installments: id uuid PK, financing_id uuid FK, installment_no int, due_date date, total_due numeric(14,2), paid_amount numeric(14,2), status varchar`

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
