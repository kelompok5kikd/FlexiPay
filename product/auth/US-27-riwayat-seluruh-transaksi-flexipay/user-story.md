# User Stories

## US-27 Riwayat Seluruh Transaksi FlexiPay

- **Prioritas:** Should | **Ukuran:** M | **Sprint:** 6
- **Sebagai** pengguna FlexiPay yang sudah login, **saya ingin** melihat riwayat seluruh transaksi FlexiPay, **agar** saya dapat meninjau aktivitas akun dari satu halaman.

### Acceptance Criteria

1. **Given** pengguna sudah login, **When** pengguna membuka halaman riwayat transaksi, **Then** sistem menampilkan transaksi yang terkait dengan akun tersebut.
2. **Given** data transaksi tersedia, **When** daftar ditampilkan, **Then** setiap item menampilkan informasi yang tersedia, seperti tanggal, jenis transaksi, merchant, nominal, dan status.
3. **Given** pengguna memilih satu transaksi, **When** detail dibuka, **Then** sistem menampilkan rincian transaksi yang sesuai dengan item tersebut.
4. **Given** terdapat banyak transaksi, **When** daftar ditampilkan, **Then** sistem menyajikan daftar dengan cara yang tetap mudah dibaca dan menyediakan paginasi atau pemuatan bertahap jika diperlukan oleh rancangan.
5. **Given** pengguna tidak memiliki transaksi, **When** halaman dibuka, **Then** sistem menampilkan keadaan kosong dengan keterangan yang jelas.
6. **Given** status transaksi belum final, **When** riwayat ditampilkan, **Then** sistem menampilkan status yang sesuai dan tidak menandainya sebagai berhasil tanpa konfirmasi.
7. **Given** riwayat memuat data dummy, **When** data ditampilkan, **Then** sistem memberi label simulasi agar tidak disalahartikan sebagai catatan transaksi nyata.
8. **Given** pengguna membuka riwayat transaksi, **When** sistem mengambil data, **Then** hanya transaksi milik akun yang sedang login yang dapat ditampilkan.
9. **Given** data gagal dimuat, **When** terjadi kesalahan, **Then** sistem menampilkan pesan yang jelas dan tidak mengganti riwayat dengan informasi yang tidak terverifikasi.

### Referensi

- **PRD:** Bagian 4 Tujuan dan Metrik, Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional.
- **Aturan bisnis terkait:** BR-01 (format Rupiah), BR-02 (status sesuai data), BR-03 (data dummy), BR-07 (akses data sesuai akun).
