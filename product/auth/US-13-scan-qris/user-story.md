# User Stories

## US-13 Scan QRIS untuk Pembayaran

- **Prioritas:** Should | **Ukuran:** L | **Sprint:** 4
- **Sebagai** pengguna FlexiPay, **saya ingin** memindai kode QRIS pada merchant, **agar** saya dapat memulai alur pembayaran melalui QRIS menggunakan FlexiPay.

### Acceptance Criteria

1. **Given** pengguna sudah login dan membuka fitur scan QRIS, **When** halaman scan ditampilkan, **Then** sistem menampilkan antarmuka pemindaian atau simulasi pemindaian sesuai kemampuan MVP.
2. **Given** perangkat dan aplikasi mendukung akses kamera, **When** pengguna memberikan izin kamera dan memulai pemindaian, **Then** sistem dapat memproses kode QR yang didukung.
3. **Given** pengguna menolak izin kamera atau kamera tidak tersedia, **When** fitur scan dibuka, **Then** sistem menampilkan pesan yang jelas dan pilihan alternatif jika tersedia.
4. **Given** kode QR berhasil terbaca, **When** hasil pemindaian diproses, **Then** sistem meneruskan informasi QR ke tahap validasi sebelum pembayaran dilanjutkan.
5. **Given** kode QR tidak terbaca atau formatnya tidak didukung, **When** pemindaian diproses, **Then** sistem menampilkan pesan gagal dan memberi kesempatan untuk mencoba kembali.
6. **Given** MVP belum terhubung dengan layanan QRIS atau penyedia pembayaran, **When** pengguna menjalankan fitur scan, **Then** sistem menandai proses sebagai simulasi dan tidak mengklaim pembayaran nyata telah dimulai.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-02 (status sesuai data), BR-03 (data dummy), BR-05 (umpan balik kesalahan), BR-06 (tidak mengklaim proses nyata tanpa integrasi).
- **Catatan:** Integrasi QRIS sungguhan belum termasuk dalam PRD awal dan perlu persetujuan perubahan scope.
