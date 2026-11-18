# User Stories

## US-10 Informasi Jatuh Tempo Cicilan

- **Prioritas:** Must | **Ukuran:** M | **Sprint:** 3
- **Sebagai** pengguna FlexiPay yang memiliki informasi cicilan pada akun, **saya ingin** melihat tanggal jatuh tempo dan nominal cicilan, **agar** saya dapat mengetahui kapan pembayaran perlu dilakukan.

### Acceptance Criteria

1. **Given** pengguna sudah login dan memiliki data cicilan, **When** pengguna membuka bagian jatuh tempo, **Then** sistem menampilkan tanggal jatuh tempo dan nominal cicilan sesuai data yang tersedia.
2. **Given** data cicilan ditampilkan, **When** pengguna melihat informasi pembayaran, **Then** nominal ditampilkan dalam format Rupiah dan tanggal ditampilkan dengan format yang konsisten.
3. **Given** cicilan memiliki status tertentu, **When** informasi ditampilkan, **Then** status mengikuti data yang tersimpan dan tidak dibuat-buat.
4. **Given** pengguna tidak memiliki data cicilan atau data belum tersedia, **When** halaman jatuh tempo dibuka, **Then** sistem menampilkan keterangan bahwa belum ada data cicilan yang tersedia.
5. **Given** tanggal jatuh tempo sudah lewat menurut data yang tersedia, **When** sistem menampilkan cicilan, **Then** status ditampilkan sesuai aturan dan data yang ditetapkan aplikasi, tanpa mengarang denda atau biaya tambahan.
6. **Given** informasi cicilan berasal dari data dummy, **When** informasi ditampilkan, **Then** sistem menandainya sebagai simulasi jika diperlukan agar tidak disalahartikan sebagai kewajiban nyata.
7. **Given** data gagal dimuat, **When** pengguna membuka bagian jatuh tempo, **Then** sistem menampilkan pesan kegagalan dan tidak menampilkan nilai yang menyesatkan.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 8 Non-Fungsional, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-01 (format Rupiah), BR-02 (status sesuai data), BR-03 (data dummy), BR-07 (akses data sesuai akun).
- **Catatan:** Pengingat otomatis dan pembayaran cicilan nyata tidak diasumsikan tersedia kecuali ditambahkan ke ruang lingkup proyek.
