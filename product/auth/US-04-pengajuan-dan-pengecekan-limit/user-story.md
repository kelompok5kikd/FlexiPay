# User Stories

## US-04 Pengajuan dan Pengecekan Limit FlexiPay

- **Prioritas:** Must | **Ukuran:** L | **Sprint:** 3
- **Sebagai** pengguna FlexiPay yang sudah memiliki akun, **saya ingin** mengajukan layanan dan melihat informasi limit yang tersedia, **agar** saya mengetahui apakah saya dapat menggunakan layanan FlexiPay dan berapa limit yang ditampilkan untuk akun saya.

### Acceptance Criteria

1. **Given** pengguna sudah login, **When** pengguna membuka fitur pengajuan FlexiPay, **Then** sistem menampilkan informasi dan langkah pengajuan yang tersedia.
2. **Given** pengguna belum login, **When** pengguna mencoba membuka fitur pengajuan yang memerlukan akun, **Then** sistem meminta pengguna login terlebih dahulu.
3. **Given** pengguna mengisi seluruh data pengajuan yang diwajibkan pada prototipe, **When** pengguna mengirim pengajuan, **Then** sistem memvalidasi kelengkapan dan format data sebelum melanjutkan.
4. **Given** data pengajuan belum lengkap atau formatnya tidak valid, **When** pengguna mengirim pengajuan, **Then** sistem menolak pengiriman dan menunjukkan bagian yang harus diperbaiki.
5. **Given** data pengajuan valid, **When** pengguna mengirim pengajuan pada MVP, **Then** sistem menyimpan atau menampilkan status pengajuan sesuai kemampuan prototipe dan tidak mengklaim adanya keputusan kredit nyata jika belum terintegrasi.
6. **Given** informasi limit tersedia untuk akun pengguna, **When** pengguna membuka halaman limit, **Then** sistem menampilkan nilai limit dan informasi pemakaian yang tersedia dengan format Rupiah yang konsisten.
7. **Given** informasi limit belum tersedia, **When** pengguna membuka halaman limit, **Then** sistem menampilkan status belum tersedia atau instruksi yang sesuai, bukan angka yang menyesatkan.
8. **Given** limit ditampilkan berdasarkan data dummy, **When** pengguna melihat informasi limit, **Then** tampilan memberi konteks yang jelas bahwa data tersebut merupakan simulasi jika diperlukan untuk mencegah salah paham.

### Referensi

- **PRD:** Bagian 4 Tujuan dan Metrik, Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis.
- **Aturan bisnis terkait:** BR-01 (format Rupiah), BR-02 (status mengikuti data), BR-03 (data demo ditandai sebagai dummy), BR-05 (umpan balik input tidak valid), BR-06 (tidak mengklaim proses nyata tanpa integrasi).
- **Catatan:** Penilaian kelayakan kredit dan penetapan limit secara nyata tidak termasuk MVP selama belum disepakati dan diintegrasikan.
