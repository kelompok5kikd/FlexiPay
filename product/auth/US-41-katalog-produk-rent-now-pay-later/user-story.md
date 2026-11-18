# US-41 — Tampilan Pilihan Produk dan Pilihan Rent Now Pay Later

## 1. Informasi User Story

- **ID:** US-41
- **Nama:** Tampilan Pilihan Product dan Tampilan Pilihan Rent Now Pay Later
- **Epic:** Katalog Produk dan Layanan Rent Now Pay Later
- **Aktor utama:** Pengguna FlexiPay yang sudah login dan memiliki limit aktif
- **Prioritas:** High

## 2. User Story

Sebagai **pengguna FlexiPay**, saya ingin melihat dan memilih produk maupun properti kos/kontrakan melalui pilihan **Produk** dan **Rent Now, Pay Later**, agar saya dapat melakukan pembelian atau penyewaan menggunakan limit FlexiPay dan membayar sesuai skema cicilan yang tersedia.

## 3. Deskripsi Fitur

Halaman katalog menyediakan dua tab utama:

1. **Produk** — menampilkan barang seperti tas, sepatu, jam tangan, dan produk lifestyle. Pengguna dapat memilih produk, mengisi data penerima, lalu melakukan konfirmasi menggunakan PIN transaksi.
2. **Rent Now, Pay Later** — menampilkan daftar kos dan kontrakan. Pengguna dapat melihat detail properti, memilih durasi sewa 1–12 bulan, lalu menyewa menggunakan limit FlexiPay.

Kedua jenis transaksi harus memeriksa limit yang tersedia sebelum transaksi disetujui. Limit hanya berkurang setelah transaksi berhasil dicatat secara atomik.

## 4. Alur Fitur Produk

1. Pengguna membuka katalog dan memilih tab **Produk**.
2. Sistem menampilkan kartu produk yang tersedia, meliputi foto, nama, kategori, deskripsi singkat, harga, dan tombol **Tambah ke keranjang / Beli**.
3. Pengguna memilih produk.
4. Sistem menampilkan halaman checkout berisi:
   - Nama penerima
   - Nomor telepon aktif
   - Email
   - Alamat lengkap
   - Kode pos
   - Ringkasan produk, jumlah, harga, dan total transaksi
5. Pengguna mengisi atau memeriksa data penerima dan alamat.
6. Sistem memvalidasi kelengkapan serta format data.
7. Sistem memeriksa limit tersedia.
   - Jika limit tidak cukup, tampilkan pesan **“Limit tidak cukup”** dan jangan membuat transaksi berhasil atau mengurangi limit.
   - Jika limit cukup, pengguna dapat melanjutkan.
8. Pengguna memasukkan PIN transaksi.
9. Sistem memverifikasi PIN terhadap kredensial PIN yang tersimpan secara aman di database (hash, bukan PIN teks biasa).
10. Jika PIN salah, tampilkan pesan kesalahan dan izinkan percobaan ulang sesuai batas keamanan.
11. Jika PIN benar, sistem membuat transaksi pembelian dan mengurangi limit dalam satu proses database yang atomik.
12. Sistem menampilkan konfirmasi/status transaksi.

## 5. Alur Fitur Rent Now, Pay Later

1. Pengguna membuka katalog dan memilih tab **Rent Now, Pay Later**.
2. Sistem menampilkan daftar kos dan kontrakan dengan foto, tipe properti, nama listing, lokasi, harga per bulan, dan durasi minimum 1 bulan.
3. Pengguna memilih salah satu properti.
4. Sistem menampilkan halaman detail yang setidaknya berisi:
   - Foto dan deskripsi properti
   - Nama pemilik
   - Nomor telepon pemilik
   - Alamat properti
   - Harga sewa per bulan
   - Pilihan durasi sewa 1 sampai 12 bulan
   - Total biaya sesuai durasi
5. Pengguna memilih durasi sewa (1–12 bulan).
6. Sistem menghitung total biaya sewa dan memvalidasi ketersediaan listing serta limit pengguna.
7. Jika limit tidak cukup, tampilkan **“Limit tidak cukup”** dan transaksi tidak dilanjutkan.
8. Jika limit cukup, pengguna menekan **Sewa Sekarang**.
9. Sistem meminta konfirmasi PIN transaksi.
10. Sistem memverifikasi PIN. PIN salah menyebabkan transaksi ditolak; PIN benar melanjutkan proses.
11. Sistem membuat booking/sewa dan mengurangi limit secara atomik. Sistem menyimpan harga per bulan, durasi, total biaya, dan snapshot data listing/pemilik pada saat booking.
12. Setelah booking berhasil, sistem menampilkan konfirmasi dan tombol **Hubungi Pemilik via WhatsApp**.
13. Tombol WhatsApp membuka percakapan dengan nomor pemilik listing yang telah dinormalisasi ke format internasional, disertai pesan awal berisi referensi booking.

## 6. Acceptance Criteria

### A. Katalog dan Produk
- [ ] Pengguna dapat membuka tab Produk.
- [ ] Sistem hanya menampilkan produk aktif/tersedia.
- [ ] Kartu produk menampilkan foto, nama, kategori, deskripsi, dan harga.
- [ ] Pengguna dapat memilih produk dan masuk ke halaman checkout.
- [ ] Checkout menampilkan nama penerima, nomor HP aktif, email, alamat lengkap, dan kode pos.
- [ ] Data wajib harus tervalidasi sebelum pengguna melanjutkan.
- [ ] Sistem menampilkan pesan **“Limit tidak cukup”** jika total transaksi melebihi limit tersedia.
- [ ] Limit tidak berubah ketika validasi gagal, limit tidak cukup, atau PIN salah.
- [ ] PIN diverifikasi menggunakan hash PIN yang tersimpan, bukan membandingkan PIN teks biasa.
- [ ] Jika PIN benar dan transaksi berhasil, transaksi tersimpan dan limit berkurang tepat satu kali.

### B. Rent Now, Pay Later
- [ ] Pengguna dapat membuka tab Rent Now, Pay Later.
- [ ] Sistem menampilkan listing kos/kontrakan yang aktif.
- [ ] Pengguna dapat membuka detail properti.
- [ ] Detail menampilkan nama pemilik, nomor telepon, alamat, harga per bulan, dan deskripsi properti.
- [ ] Durasi sewa yang tersedia adalah 1 sampai 12 bulan; durasi kurang dari 1 atau lebih dari 12 bulan ditolak.
- [ ] Sistem menghitung total biaya = harga sewa per bulan × durasi sewa, beserta biaya lain yang berlaku jika dikonfigurasi.
- [ ] Sistem memeriksa limit berdasarkan total biaya sewa.
- [ ] Jika limit tidak cukup, tombol penyelesaian transaksi tidak dapat diproses dan pesan **“Limit tidak cukup”** ditampilkan.
- [ ] Tombol **Sewa Sekarang** memulai konfirmasi PIN.
- [ ] Jika PIN benar, booking tersimpan dan limit berkurang tepat satu kali.
- [ ] Setelah booking berhasil, pengguna dapat membuka WhatsApp pemilik melalui tombol yang tersedia.
- [ ] Jika booking gagal, limit tidak boleh berkurang.
- [ ] Sistem mencegah dua booking aktif yang bertabrakan untuk listing dan periode yang sama, sesuai aturan ketersediaan.

### C. Keamanan dan Konsistensi
- [ ] Semua data transaksi hanya dapat diakses oleh pemilik transaksi dan pihak berwenang.
- [ ] PIN tidak pernah disimpan dalam bentuk teks biasa.
- [ ] Pengurangan limit, pencatatan transaksi/booking, dan perubahan status dilakukan dalam database transaction.
- [ ] Permintaan berulang (double click/retry) tidak boleh membuat transaksi atau pengurangan limit ganda; gunakan idempotency key.
- [ ] Harga produk dan harga sewa dihitung dari data server, bukan mempercayai nominal dari browser.

## 7. Business Rules

| Kode | Aturan |
|---|---|
| BR-01 | Pengguna harus login untuk melakukan checkout atau penyewaan. |
| BR-02 | Pengguna harus memiliki limit aktif dan status akun yang memenuhi syarat. |
| BR-03 | Total transaksi produk dihitung dari harga produk aktif × kuantitas, ditambah biaya yang berlaku. |
| BR-04 | Total biaya sewa dihitung dari harga bulanan × durasi 1–12 bulan, ditambah biaya yang berlaku. |
| BR-05 | Limit tersedia harus lebih besar atau sama dengan total transaksi. |
| BR-06 | Limit hanya dikurangi setelah PIN valid dan transaksi/booking berhasil disimpan. |
| BR-07 | PIN disimpan sebagai hash yang aman dan diverifikasi di backend. |
| BR-08 | Durasi sewa minimum 1 bulan dan maksimum 12 bulan. |
| BR-09 | Kontak WhatsApp hanya ditawarkan setelah booking berhasil. |
| BR-10 | Harga, limit, ketersediaan, dan status transaksi wajib divalidasi ulang di server saat konfirmasi. |

## 8. Data Input dan Output

### Input Produk
- `product_id`
- `quantity`
- `recipient_name`
- `recipient_phone`
- `recipient_email`
- `shipping_address`
- `postal_code`
- `transaction_pin`
- `idempotency_key`

### Input Rent Now, Pay Later
- `rental_listing_id`
- `duration_months` (1–12)
- `transaction_pin`
- `idempotency_key`

### Output
- Status transaksi/booking
- Nomor referensi transaksi/booking
- Total transaksi
- Limit sebelum dan sesudah transaksi
- Jadwal cicilan (jika modul cicilan telah mengaktifkan pembentukan jadwal)
- Tautan WhatsApp pemilik untuk booking yang berhasil

## 9. Kondisi Error

| Kondisi | Respons sistem |
|---|---|
| Data checkout tidak lengkap | Tampilkan field yang harus diperbaiki. |
| Produk tidak aktif/stok habis | Tolak checkout dan minta pengguna memilih produk lain. |
| Listing tidak tersedia | Tolak booking dan tampilkan informasi ketersediaan terbaru. |
| Limit tidak cukup | Tampilkan **“Limit tidak cukup”**; jangan kurangi limit. |
| PIN salah | Tampilkan pesan PIN salah; jangan buat transaksi. |
| PIN terkunci | Minta pengguna mengikuti proses pemulihan/pembukaan PIN. |
| Terjadi kegagalan penyimpanan | Rollback seluruh perubahan transaksi dan limit. |
| Permintaan duplikat | Kembalikan hasil permintaan sebelumnya berdasarkan idempotency key. |

## 10. Catatan Implementasi

- Integrasi payment gateway yang sudah digunakan FlexiPay tetap mengikuti tanggung jawabnya sebagai pemroses pembayaran yang relevan. Penggunaan limit BNPL harus dicatat sebagai fasilitas pembiayaan FlexiPay/mitra pembiayaan, bukan menganggap payment gateway sebagai penyedia cicilan.
- Pengurangan limit sebaiknya dicatat sebagai ledger/pergerakan limit, bukan hanya mengubah satu angka tanpa histori.
- Untuk WhatsApp, gunakan nomor pemilik yang telah dinormalisasi dan URL `https://wa.me/<nomor>`; jangan menambahkan tanda `+`, spasi, atau tanda baca pada bagian nomor.
- Aturan stok produk, deposit, biaya layanan, pembatalan/refund, dan kebijakan pengembalian dana perlu mengikuti konfigurasi bisnis yang ditetapkan.
