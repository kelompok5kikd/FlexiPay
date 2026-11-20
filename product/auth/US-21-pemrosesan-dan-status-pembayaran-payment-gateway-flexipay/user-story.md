# User Stories

## US-21 Pemrosesan dan Status Pembayaran melalui Payment Gateway

- **Prioritas:** Should | **Ukuran:** L | **Sprint:** 5
- **Sebagai** pengguna FlexiPay, **saya ingin** melihat proses dan status pembayaran melalui payment gateway, **agar** saya mengetahui apakah pembayaran berhasil, masih diproses, atau gagal.

### Acceptance Criteria

1. **Given** pengguna telah menyelesaikan tahap konfirmasi yang diwajibkan, **When** aplikasi memulai pembayaran melalui integrasi yang tersedia, **Then** sistem mengirim permintaan sesuai spesifikasi penyedia payment gateway.
2. **Given** penyedia payment gateway mengembalikan status menunggu atau diproses, **When** status diterima dan divalidasi, **Then** sistem menampilkan status pembayaran sebagai menunggu atau diproses.
3. **Given** penyedia mengonfirmasi pembayaran berhasil melalui respons yang valid, **When** sistem memverifikasi hasilnya, **Then** status transaksi diperbarui menjadi berhasil sesuai respons resmi.
4. **Given** penyedia mengembalikan status gagal atau pembayaran kedaluwarsa, **When** status diterima, **Then** sistem menampilkan status gagal atau kedaluwarsa sesuai respons.
5. **Given** respons penyedia belum diterima atau hasilnya belum pasti, **When** pengguna memeriksa status, **Then** sistem tidak langsung menandai pembayaran berhasil dan menampilkan status menunggu verifikasi.
6. **Given** terjadi gangguan jaringan atau kesalahan integrasi, **When** permintaan pembayaran gagal diproses, **Then** sistem menampilkan pesan yang sesuai dan menghindari pembuatan transaksi ganda akibat percobaan ulang.
7. **Given** aplikasi menerima notifikasi status dari penyedia, **When** notifikasi diproses, **Then** sistem memvalidasi sumber dan isi notifikasi sesuai mekanisme keamanan penyedia sebelum memperbarui status.
8. **Given** MVP belum terhubung dengan payment gateway, **When** pengguna menjalankan alur pembayaran, **Then** sistem menyajikan simulasi yang jelas dan tidak mengklaim pembayaran nyata telah diproses.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-02 (status sesuai respons yang valid), BR-03 (simulasi diberi label), BR-05 (umpan balik kesalahan), BR-06 (tidak mengklaim proses nyata tanpa integrasi), BR-07 (akses data sesuai akun).
- **Catatan:** Integrasi harus mengikuti dokumentasi payment gateway dan environment pengujian/produksi yang disepakati.
