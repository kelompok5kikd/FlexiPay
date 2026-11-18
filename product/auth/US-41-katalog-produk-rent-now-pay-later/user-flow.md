# UF-41 — User Flow Katalog Produk dan Rent Now, Pay Later

**User Story:** US-41 — Tampilan Pilihan Produk dan Tampilan Pilihan Rent Now Pay Later

## Tujuan
Menggambarkan dua jalur transaksi dalam katalog FlexiPay: pembelian produk dengan alamat penerima dan penyewaan kos/kontrakan selama 1–12 bulan. Kedua jalur menggunakan limit FlexiPay dan konfirmasi PIN.

## 1. Flowchart Mermaid

```mermaid
flowchart TD
    A([Mulai]) --> B[Pengguna login dan membuka Katalog]
    B --> C{Pilih tab}
    C -->|Produk| P1[Tampilkan daftar produk]
    C -->|Rent Now Pay Later| R1[Tampilkan daftar kos dan kontrakan]

    P1 --> P2[Pilih produk]
    P2 --> P3[Tampilkan checkout]
    P3 --> P4[Isi nama penerima, HP aktif, email, alamat lengkap, kode pos]
    P4 --> P5{Data checkout valid?}
    P5 -->|Tidak| PE1[Pesan validasi dan perbaiki data]
    PE1 --> P3
    P5 -->|Ya| P6[Hitung total dari harga server dan kuantitas]
    P6 --> P7{Limit tersedia cukup?}
    P7 -->|Tidak| PE2[ Tampilkan: Limit tidak cukup]
    PE2 --> P3
    P7 -->|Ya| P8[Masukkan PIN transaksi]
    P8 --> P9{PIN benar dan akun tidak terkunci?}
    P9 -->|Tidak| PE3[Tampilkan PIN salah / terkunci]
    PE3 --> P8
    P9 -->|Ya| P10[Catat transaksi dan ledger limit secara atomik]
    P10 --> P11[Kurangi limit dan tampilkan konfirmasi]
    P11 --> Z([Selesai])

    R1 --> R2[Pilih kos / kontrakan]
    R2 --> R3[Tampilkan detail: pemilik, nomor HP, alamat, harga per bulan]
    R3 --> R4[Pilih durasi sewa 1 sampai 12 bulan]
    R4 --> R5{Durasi valid dan listing tersedia?}
    R5 -->|Tidak| RE1[Tampilkan durasi / ketersediaan tidak valid]
    RE1 --> R3
    R5 -->|Ya| R6[Hitung total harga sewa sesuai durasi]
    R6 --> R7{Limit tersedia cukup?}
    R7 -->|Tidak| RE2[Tampilkan: Limit tidak cukup]
    RE2 --> R4
    R7 -->|Ya| R8[Klik Sewa Sekarang]
    R8 --> R9[Masukkan PIN transaksi]
    R9 --> R10{PIN benar dan akun tidak terkunci?}
    R10 -->|Tidak| RE3[Tampilkan PIN salah / terkunci]
    RE3 --> R9
    R10 -->|Ya| R11[Validasi ulang listing, harga, dan limit]
    R11 --> R12{Masih valid?}
    R12 -->|Tidak| RE4[Batalkan proses dan tampilkan alasan]
    RE4 --> R3
    R12 -->|Ya| R13[Buat booking dan ledger limit secara atomik]
    R13 --> R14[Kurangi limit dan tampilkan konfirmasi sewa]
    R14 --> R15[Klik Hubungi Pemilik via WhatsApp]
    R15 --> R16[Buka WhatsApp pemilik dengan referensi booking]
    R16 --> Z
```

## 2. Ringkasan Jalur Produk

1. Katalog → Produk.
2. Pilih produk.
3. Isi nama penerima, nomor telepon aktif, email, alamat lengkap, dan kode pos.
4. Validasi data dan hitung total transaksi.
5. Periksa limit.
6. Jika limit tidak cukup, tampilkan pesan **“Limit tidak cukup”** dan hentikan proses.
7. Jika limit cukup, minta PIN.
8. Verifikasi PIN di backend.
9. Jika valid, simpan transaksi dan pengurangan limit dalam satu database transaction.
10. Tampilkan konfirmasi.

## 3. Ringkasan Jalur Rent Now, Pay Later

1. Katalog → Rent Now, Pay Later.
2. Pilih kos/kontrakan.
3. Lihat detail pemilik, nomor telepon, alamat, dan harga per bulan.
4. Pilih durasi sewa 1–12 bulan.
5. Hitung total biaya dan periksa ketersediaan serta limit.
6. Jika limit tidak cukup, tampilkan **“Limit tidak cukup”**.
7. Jika cukup, klik **Sewa Sekarang** dan masukkan PIN.
8. Backend memvalidasi ulang harga, ketersediaan, PIN, dan limit.
9. Jika valid, simpan booking dan pengurangan limit secara atomik.
10. Tampilkan konfirmasi dan tombol WhatsApp pemilik.

## 4. Titik Validasi Penting

- Harga dan limit dihitung ulang di backend pada saat konfirmasi.
- PIN diverifikasi menggunakan hash PIN tersimpan; PIN asli tidak disimpan atau dicatat.
- Pengurangan limit dan penyimpanan transaksi/booking harus atomik.
- Permintaan berulang menggunakan idempotency key agar tidak terjadi transaksi ganda.
- WhatsApp pemilik baru dapat dibuka setelah booking berhasil.
