# User Stories

## US-12 Pencarian Merchant Fashion dan Lifestyle

- **Prioritas:** Should | **Ukuran:** M | **Sprint:** 4
- **Sebagai** pengguna FlexiPay, **saya ingin** mencari merchant berdasarkan nama atau kategori fashion dan lifestyle, **agar** saya dapat menemukan merchant yang relevan dengan kebutuhan saya.

### Acceptance Criteria

1. **Given** pengguna membuka halaman merchant, **When** halaman ditampilkan, **Then** sistem menyediakan kolom pencarian jika fitur pencarian termasuk dalam rancangan final.
2. **Given** pengguna memasukkan kata kunci yang cocok dengan nama merchant, **When** pencarian dijalankan, **Then** sistem menampilkan merchant yang sesuai dengan kata kunci tersebut.
3. **Given** pengguna memilih atau memasukkan kategori fashion atau lifestyle, **When** pencarian atau penyaringan dijalankan, **Then** sistem menampilkan merchant yang sesuai dengan kategori yang tersedia pada data.
4. **Given** tidak ada merchant yang cocok dengan kata kunci, **When** hasil pencarian ditampilkan, **Then** sistem menampilkan keterangan bahwa hasil tidak ditemukan.
5. **Given** kolom pencarian kosong, **When** pengguna menjalankan pencarian, **Then** sistem menampilkan daftar awal atau memberi arahan yang sesuai dengan perilaku pencarian yang ditetapkan.
6. **Given** pengguna mengubah kata kunci, **When** pencarian dijalankan kembali, **Then** daftar hasil diperbarui berdasarkan kata kunci terbaru.
7. **Given** data merchant yang digunakan merupakan data dummy, **When** hasil pencarian ditampilkan, **Then** hasil tidak diklaim sebagai daftar merchant partner nyata yang belum terverifikasi.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 8 Non-Fungsional, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-02 (informasi mengikuti data), BR-03 (data dummy diberi konteks).
- **Catatan:** Pencarian dan filter kategori merupakan fitur usulan yang perlu diselaraskan dengan scope dan desain final.
