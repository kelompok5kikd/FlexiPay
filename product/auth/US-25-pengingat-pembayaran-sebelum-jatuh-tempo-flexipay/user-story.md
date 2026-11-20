# User Stories

## US-25 Pengingat Pembayaran Sebelum Jatuh Tempo

- **Prioritas:** Could | **Ukuran:** M | **Sprint:** 6
- **Sebagai** pengguna FlexiPay yang memiliki tagihan belum lunas, **saya ingin** menerima atau melihat pengingat sebelum tanggal jatuh tempo, **agar** saya dapat mempersiapkan pembayaran tepat waktu.

### Acceptance Criteria

1. **Given** pengguna memiliki tagihan belum lunas dengan tanggal jatuh tempo yang tersedia, **When** tanggal pengingat yang dikonfigurasi tercapai, **Then** sistem menyiapkan pengingat sesuai mekanisme yang didukung aplikasi.
2. **Given** pengingat ditampilkan di dalam aplikasi, **When** pengguna membuka notifikasi atau bagian pengingat, **Then** informasi menunjukkan tagihan terkait dan tanggal jatuh tempo sesuai data.
3. **Given** tagihan telah lunas sebelum waktu pengingat, **When** sistem memeriksa tagihan, **Then** sistem tidak menampilkan pengingat yang menyatakan tagihan tersebut masih perlu dibayar.
4. **Given** tanggal jatuh tempo atau status tagihan belum tersedia, **When** sistem memeriksa pengingat, **Then** sistem tidak membuat pengingat dengan tanggal atau status yang dikarang.
5. **Given** pengingat otomatis belum didukung pada MVP, **When** pengguna melihat fitur pengingat, **Then** sistem menjelaskan keterbatasan tersebut atau hanya menampilkan simulasi yang diberi label.
6. **Given** pengingat berhasil dibuat, **When** pengingat ditampilkan, **Then** isi pesan jelas, tidak menyesatkan, dan tidak menyatakan denda atau biaya yang belum ditetapkan.
7. **Given** pengguna membuka pengingat, **When** pengguna memilih tautan atau aksi yang tersedia, **Then** sistem mengarahkan pengguna ke detail tagihan yang sesuai jika navigasi tersebut didukung.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-02 (status sesuai data), BR-03 (data dummy), BR-05 (umpan balik kesalahan), BR-07 (akses data sesuai akun).
- **Catatan:** Pengiriman notifikasi otomatis melalui SMS, email, atau push notification tidak diasumsikan tersedia sebelum kanal dan integrasinya ditetapkan.
