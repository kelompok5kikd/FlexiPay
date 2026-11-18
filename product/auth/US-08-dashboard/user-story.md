# User Stories

## US-08 Dashboard Utama FlexiPay

- **Prioritas:** Must | **Ukuran:** M | **Sprint:** 3
- **Sebagai** pengguna FlexiPay yang sudah login, **saya ingin** melihat dashboard utama, **agar** saya dapat memahami kondisi akun dan menemukan fitur penting dengan cepat.

### Acceptance Criteria

1. **Given** pengguna berhasil login, **When** pengguna membuka dashboard, **Then** sistem menampilkan halaman utama FlexiPay.
2. **Given** dashboard ditampilkan, **When** pengguna melihat ringkasan halaman, **Then** sistem menampilkan informasi utama yang tersedia, seperti ringkasan limit, transaksi, dan tagihan.
3. **Given** pengguna memilih menu atau pintasan pada dashboard, **When** tindakan dilakukan, **Then** sistem mengarahkan pengguna ke halaman fitur yang sesuai.
4. **Given** pengguna belum login, **When** pengguna mencoba mengakses dashboard yang memerlukan autentikasi, **Then** sistem meminta pengguna login terlebih dahulu.
5. **Given** sebagian data dashboard belum tersedia, **When** dashboard dibuka, **Then** sistem menampilkan status kosong atau informasi belum tersedia tanpa mengarang nilai.
6. **Given** dashboard menggunakan data dummy, **When** informasi ditampilkan, **Then** data disajikan sebagai simulasi dan tidak dinyatakan sebagai transaksi nyata.
7. **Given** pengguna membuka dashboard melalui ukuran layar yang berbeda, **When** halaman ditampilkan, **Then** informasi dan navigasi utama tetap terbaca serta dapat digunakan.

### Referensi

- **PRD:** Bagian 4 Tujuan dan Metrik, Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 8 Non-Fungsional.
- **Aturan bisnis terkait:** BR-02 (status sesuai data), BR-03 (data demo ditandai sebagai dummy), BR-07 (akses data sesuai akun).
