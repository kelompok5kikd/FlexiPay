# User Stories

## US-11 Daftar Merchant Partner FlexiPay

- **Prioritas:** Should | **Ukuran:** M | **Sprint:** 4
- **Sebagai** pengguna FlexiPay, **saya ingin** melihat daftar merchant partner, **agar** saya dapat mengetahui merchant yang ditampilkan sebagai tempat penggunaan layanan FlexiPay.

### Acceptance Criteria

1. **Given** pengguna membuka halaman merchant partner, **When** halaman berhasil dimuat, **Then** sistem menampilkan daftar merchant yang tersedia pada data aplikasi.
2. **Given** daftar merchant tersedia, **When** pengguna melihat sebuah item merchant, **Then** sistem menampilkan informasi yang disediakan, seperti nama merchant, kategori, dan logo jika tersedia.
3. **Given** data merchant belum tersedia, **When** halaman dibuka, **Then** sistem menampilkan keadaan kosong atau pesan bahwa daftar belum tersedia.
4. **Given** pengguna memilih salah satu merchant, **When** merchant memiliki halaman detail, **Then** sistem membuka detail merchant yang sesuai.
5. **Given** merchant ditampilkan hanya sebagai contoh atau data dummy, **When** pengguna melihat daftar, **Then** tampilan tidak mengklaim adanya kemitraan nyata yang belum dikonfirmasi.
6. **Given** daftar merchant gagal dimuat, **When** kegagalan terjadi, **Then** sistem menampilkan pesan yang jelas dan menyediakan cara untuk mencoba kembali jika didukung.
7. **Given** pengguna membuka halaman melalui perangkat berbeda, **When** daftar ditampilkan, **Then** daftar tetap mudah dibaca dan digunakan.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 8 Non-Fungsional, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-02 (informasi mengikuti data), BR-03 (data dummy diberi konteks).
- **Catatan:** Daftar merchant nyata dan status kemitraan perlu dikonfirmasi sebelum dipublikasikan sebagai informasi faktual.
