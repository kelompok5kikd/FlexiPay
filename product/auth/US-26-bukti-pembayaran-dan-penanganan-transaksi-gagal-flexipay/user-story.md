# User Stories

## US-26 Bukti Pembayaran dan Penanganan Transaksi Gagal

- **Prioritas:** Should | **Ukuran:** M | **Sprint:** 6
- **Sebagai** pengguna FlexiPay, **saya ingin** melihat bukti pembayaran yang terkonfirmasi dan memperoleh informasi ketika transaksi gagal, **agar** saya memiliki catatan pembayaran serta mengetahui langkah berikutnya jika terjadi masalah.

### Acceptance Criteria

1. **Given** pembayaran telah dikonfirmasi berhasil oleh sumber status yang valid, **When** pengguna membuka detail transaksi, **Then** sistem menampilkan bukti atau ringkasan pembayaran dengan informasi yang tersedia, seperti nomor referensi, tanggal, nominal, dan status.
2. **Given** pembayaran masih menunggu konfirmasi, **When** pengguna membuka detail transaksi, **Then** sistem tidak menerbitkan bukti yang menyatakan pembayaran berhasil.
3. **Given** transaksi gagal atau dibatalkan, **When** status ditampilkan, **Then** sistem menjelaskan bahwa pembayaran belum berhasil dan memberikan arahan yang sesuai jika tersedia.
4. **Given** transaksi gagal karena gangguan sementara, **When** pengguna melihat informasi kegagalan, **Then** sistem dapat menyediakan opsi mencoba kembali hanya jika aman dan didukung, tanpa membuat transaksi ganda.
5. **Given** sistem belum menerima konfirmasi final dari penyedia pembayaran, **When** pengguna memeriksa transaksi, **Then** sistem menampilkan status menunggu verifikasi dan tidak menyimpulkan pembayaran gagal atau berhasil tanpa dasar.
6. **Given** bukti pembayaran berasal dari data simulasi, **When** bukti ditampilkan, **Then** sistem memberi label simulasi dan tidak menyatakannya sebagai bukti pembayaran resmi.
7. **Given** pengguna membuka detail transaksi, **When** sistem memuat data, **Then** hanya informasi transaksi milik akun pengguna yang ditampilkan.
8. **Given** bukti gagal dimuat atau tidak tersedia, **When** pengguna membuka halaman, **Then** sistem menampilkan pesan yang jelas dan tidak membuat bukti palsu.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-01 (format Rupiah), BR-02 (status sesuai hasil), BR-03 (data dummy), BR-05 (umpan balik kesalahan), BR-06 (tidak mengklaim proses nyata tanpa integrasi), BR-07 (akses data sesuai akun).
