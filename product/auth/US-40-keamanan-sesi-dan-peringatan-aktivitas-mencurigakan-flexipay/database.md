# US-40 — Database: Keamanan sesi/aktivitas mencurigakan

**User Story:** US-40 Membuat fitur keamanan sesi/aktivitas mencurigakan.

## Data yang dibutuhkan

### Struktur
`user_sessions: id uuid PK, user_id uuid FK, device_label varchar, ip_address inet, created_at timestamptz, last_seen_at timestamptz, expires_at timestamptz, revoked_at timestamptz`

### Struktur
`security_events: id uuid PK, user_id uuid FK, event_type varchar, risk_level varchar, details jsonb, occurred_at timestamptz`

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
