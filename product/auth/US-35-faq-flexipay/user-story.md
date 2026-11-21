# User Stories

## US-35 FAQ FlexiPay

- **Prioritas:** Could | **Ukuran:** S | **Sprint:** 8
- **Sebagai** pengguna atau calon pengguna FlexiPay, **saya ingin** membaca daftar pertanyaan yang sering diajukan, **agar** saya dapat memahami fitur, cara penggunaan, dan ketentuan layanan tanpa harus langsung menghubungi customer support.

### Acceptance Criteria

1. **Given** pengguna membuka halaman FAQ, **When** halaman dimuat, **Then** sistem menampilkan daftar pertanyaan dan jawaban yang telah disetujui.
2. **Given** daftar FAQ tersedia, **When** pengguna memilih salah satu pertanyaan, **Then** sistem menampilkan jawaban yang sesuai.
3. **Given** FAQ dikelompokkan berdasarkan topik, **When** pengguna memilih kategori, **Then** sistem menampilkan pertanyaan yang termasuk kategori tersebut.
4. **Given** fitur pencarian FAQ tersedia, **When** pengguna memasukkan kata kunci, **Then** sistem menampilkan pertanyaan yang relevan atau pesan bahwa hasil tidak ditemukan.
5. **Given** belum ada FAQ yang tersedia, **When** halaman dibuka, **Then** sistem menampilkan keterangan yang jelas dan jalur bantuan alternatif jika tersedia.
6. **Given** informasi terkait biaya, cicilan, atau ketentuan belum disahkan, **When** FAQ ditampilkan, **Then** sistem tidak mengarang jawaban dan hanya menampilkan informasi yang telah disetujui.
7. **Given** pengguna membuka FAQ dari perangkat berbeda, **When** halaman dimuat, **Then** konten tetap mudah dibaca dan digunakan.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 8 Non-Fungsional, Bagian 9 Asumsi dan Risiko.
- **Catatan:** Isi FAQ harus ditinjau dan disetujui pemilik produk sebelum dipublikasikan.
