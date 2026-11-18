# US-04 — Database: Pengajuan dan pengecekan limit

**User Story:** US-04 Membuat fitur pengajuan dan pengecekan limit.

## Data yang dibutuhkan

### Struktur
`limit_applications: id uuid PK, user_id uuid FK, requested_limit numeric(14,2), approved_limit numeric(14,2), status varchar, submitted_at timestamptz, reviewed_at timestamptz`

### Struktur
`credit_limits: id uuid PK, user_id uuid FK, total_limit numeric(14,2), available_limit numeric(14,2), status varchar`

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
