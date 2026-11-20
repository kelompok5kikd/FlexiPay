# User Stories

## US-14 Validasi QRIS dan Konfirmasi Merchant

- **Prioritas:** Should | **Ukuran:** M | **Sprint:** 4
- **Sebagai** pengguna FlexiPay, **saya ingin** melihat hasil validasi QRIS dan informasi merchant sebelum melanjutkan, **agar** saya dapat memastikan detail merchant sesuai dengan tujuan pembayaran.

### Acceptance Criteria

1. **Given** pengguna telah memindai atau memilih contoh kode QRIS, **When** hasil pemindaian tersedia, **Then** sistem memeriksa apakah data QR memiliki format yang didukung oleh aplikasi atau simulasi.
2. **Given** data QR valid dan berisi informasi merchant yang dapat dibaca, **When** validasi selesai, **Then** sistem menampilkan informasi merchant yang tersedia untuk diperiksa pengguna.
3. **Given** data QR tidak valid, tidak lengkap, atau tidak didukung, **When** validasi dilakukan, **Then** sistem menolak melanjutkan alur dan menampilkan pesan kesalahan yang jelas.
4. **Given** informasi merchant ditampilkan, **When** pengguna meninjau detailnya, **Then** sistem memberi pilihan untuk melanjutkan atau membatalkan sebelum masuk ke tahap berikutnya.
5. **Given** pengguna membatalkan proses, **When** pembatalan dipilih, **Then** sistem menghentikan alur pembayaran dan kembali ke halaman yang sesuai tanpa menyatakan transaksi berhasil.
6. **Given** QRIS atau merchant hanya berupa data demo, **When** hasil validasi ditampilkan, **Then** sistem tidak menyatakan bahwa merchant atau kode QR telah diverifikasi oleh jaringan pembayaran resmi.
7. **Given** validasi gagal karena masalah pemrosesan, **When** kegagalan terjadi, **Then** sistem menampilkan status gagal dan tidak mengarahkan pengguna ke konfirmasi pembayaran seolah-olah validasi berhasil.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-02 (status sesuai data), BR-03 (data dummy), BR-05 (umpan balik kesalahan), BR-06 (tidak mengklaim proses nyata tanpa integrasi).
- **Catatan:** Validasi resmi QRIS memerlukan integrasi dengan penyedia yang berwenang; acceptance criteria ini mencakup validasi prototipe kecuali scope diperluas.
