# User Stories

## US-22 Daftar dan Detail Tagihan Cicilan FlexiPay

- **Prioritas:** Must | **Ukuran:** M | **Sprint:** 5
- **Sebagai** pengguna FlexiPay yang memiliki data cicilan, **saya ingin** melihat daftar dan detail tagihan, **agar** saya dapat memahami nominal, tanggal jatuh tempo, dan status setiap tagihan.

### Acceptance Criteria

1. **Given** pengguna sudah login dan memiliki data tagihan, **When** pengguna membuka halaman tagihan, **Then** sistem menampilkan daftar tagihan yang terkait dengan akun tersebut.
2. **Given** daftar tagihan ditampilkan, **When** pengguna melihat sebuah tagihan, **Then** sistem menampilkan informasi yang tersedia, seperti nominal, tanggal jatuh tempo, dan status tagihan.
3. **Given** pengguna memilih salah satu tagihan, **When** halaman detail dibuka, **Then** sistem menampilkan rincian tagihan yang sesuai dengan item yang dipilih.
4. **Given** pengguna tidak memiliki tagihan atau data belum tersedia, **When** halaman dibuka, **Then** sistem menampilkan keadaan kosong atau keterangan bahwa tagihan belum tersedia.
5. **Given** status tagihan tersedia, **When** daftar atau detail ditampilkan, **Then** status mengikuti data yang tersimpan dan tidak disimpulkan sebagai lunas atau terlambat tanpa dasar data.
6. **Given** nominal tagihan ditampilkan, **When** pengguna membaca rinciannya, **Then** nominal menggunakan format Rupiah yang konsisten.
7. **Given** tagihan menggunakan data dummy, **When** daftar atau detail ditampilkan, **Then** sistem memberi label simulasi agar tidak disalahartikan sebagai kewajiban nyata.
8. **Given** pengguna membuka tagihan, **When** sistem mengambil data, **Then** hanya tagihan milik akun pengguna yang dapat ditampilkan.
9. **Given** data tagihan gagal dimuat, **When** terjadi kegagalan, **Then** sistem menampilkan pesan yang jelas dan tidak menampilkan status pembayaran yang tidak terverifikasi.

### Referensi

- **PRD:** Bagian 4 Tujuan dan Metrik, Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional.
- **Aturan bisnis terkait:** BR-01 (format Rupiah), BR-02 (status sesuai data), BR-03 (data dummy), BR-07 (akses data sesuai akun).
