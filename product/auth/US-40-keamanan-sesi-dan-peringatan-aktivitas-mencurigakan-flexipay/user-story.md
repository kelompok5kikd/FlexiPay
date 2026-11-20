# User Stories

## US-40 Keamanan Sesi dan Peringatan Aktivitas Mencurigakan

- **Prioritas:** Should | **Ukuran:** L | **Sprint:** 9
- **Sebagai** pengguna FlexiPay, **saya ingin** sesi akun dikelola secara aman dan diberi informasi tentang aktivitas yang terindikasi mencurigakan, **agar** saya dapat melindungi akun dan mengambil tindakan jika diperlukan.

### Acceptance Criteria

1. **Given** pengguna berhasil login, **When** sesi dibuat, **Then** sistem menggunakan mekanisme sesi yang sesuai dengan rancangan keamanan aplikasi.
2. **Given** sesi telah melewati batas tidak aktif yang dikonfigurasi, **When** pengguna mencoba mengakses fitur yang dilindungi, **Then** sistem meminta autentikasi ulang atau mengakhiri sesi sesuai kebijakan.
3. **Given** pengguna memilih logout, **When** proses logout berhasil, **Then** sesi yang berlaku diakhiri dan halaman terlindungi tidak dapat diakses kembali menggunakan sesi tersebut.
4. **Given** sistem mendeteksi pola aktivitas yang memenuhi aturan risiko yang telah ditetapkan, **When** peristiwa diproses, **Then** sistem mencatat peristiwa dan menampilkan peringatan melalui kanal yang tersedia.
5. **Given** aktivitas tidak memenuhi kriteria deteksi, **When** sistem memproses aktivitas, **Then** sistem tidak menandainya sebagai mencurigakan tanpa dasar aturan.
6. **Given** peringatan aktivitas mencurigakan ditampilkan, **When** pengguna membukanya, **Then** sistem menyajikan informasi yang aman dan langkah yang dapat dilakukan, tanpa membocorkan detail deteksi yang sensitif.
7. **Given** sistem belum memiliki deteksi risiko atau notifikasi terintegrasi, **When** fitur dijalankan dalam prototipe, **Then** sistem memberi label simulasi dan tidak mengklaim pemantauan keamanan produksi aktif.
8. **Given** terjadi kesalahan pada pengelolaan sesi, **When** sistem menangani permintaan, **Then** akses ke data terlindungi tetap ditolak secara aman.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional, Bagian 9 Asumsi dan Risiko.
- **Catatan:** Batas sesi, indikator aktivitas mencurigakan, respons keamanan, dan kanal peringatan harus ditetapkan oleh tim keamanan.
