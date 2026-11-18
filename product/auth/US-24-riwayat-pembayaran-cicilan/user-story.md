# User Stories

## US-24 Riwayat Pembayaran Cicilan FlexiPay

- **Prioritas:** Should | **Ukuran:** M | **Sprint:** 6
- **Sebagai** pengguna FlexiPay yang memiliki atau pernah memiliki tagihan cicilan, **saya ingin** melihat riwayat pembayaran cicilan, **agar** saya dapat memeriksa pembayaran yang pernah dilakukan beserta statusnya.

### Acceptance Criteria

1. **Given** pengguna sudah login, **When** pengguna membuka halaman riwayat pembayaran cicilan, **Then** sistem menampilkan daftar pembayaran cicilan yang terkait dengan akun tersebut.
2. **Given** riwayat pembayaran tersedia, **When** daftar ditampilkan, **Then** setiap item menampilkan informasi yang tersedia, seperti tanggal, nominal, tagihan terkait, dan status pembayaran.
3. **Given** pengguna memilih salah satu item riwayat, **When** detail dibuka, **Then** sistem menampilkan detail yang sesuai dengan catatan pembayaran yang dipilih.
4. **Given** belum ada pembayaran yang tercatat, **When** halaman riwayat dibuka, **Then** sistem menampilkan keterangan bahwa riwayat belum tersedia.
5. **Given** status pembayaran belum terkonfirmasi, **When** riwayat ditampilkan, **Then** status tetap ditampilkan sebagai menunggu atau status lain yang sesuai, bukan otomatis berhasil.
6. **Given** riwayat menggunakan data dummy, **When** informasi ditampilkan, **Then** sistem memberi label simulasi agar tidak disalahartikan sebagai riwayat keuangan nyata.
7. **Given** pengguna membuka riwayat, **When** data dimuat, **Then** sistem hanya menampilkan riwayat milik akun yang sedang login.
8. **Given** terjadi kegagalan saat mengambil riwayat, **When** halaman dibuka, **Then** sistem menampilkan pesan kesalahan dan tidak menampilkan data yang tidak terverifikasi.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional.
- **Aturan bisnis terkait:** BR-01 (format Rupiah), BR-02 (status sesuai data), BR-03 (data dummy), BR-07 (akses data sesuai akun).
