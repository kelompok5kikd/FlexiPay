# User Stories

## US-16 Pilihan Metode Pembayaran FlexiPay

- **Prioritas:** Could | **Ukuran:** M | **Sprint:** 4
- **Sebagai** pengguna FlexiPay, **saya ingin** melihat dan memilih metode pembayaran yang tersedia, **agar** saya dapat memilih opsi yang sesuai sebelum melanjutkan transaksi.

### Acceptance Criteria

1. **Given** pengguna berada pada tahap pemilihan metode pembayaran, **When** halaman ditampilkan, **Then** sistem menampilkan metode yang benar-benar tersedia pada konfigurasi atau prototipe.
2. **Given** terdapat satu atau lebih metode yang tersedia, **When** pengguna memilih salah satunya, **Then** sistem menandai pilihan tersebut dengan jelas.
3. **Given** pengguna belum memilih metode, **When** pengguna mencoba melanjutkan dan pemilihan diwajibkan, **Then** sistem meminta pengguna memilih metode terlebih dahulu.
4. **Given** metode yang dipilih tidak tersedia atau dinonaktifkan, **When** pengguna mencoba melanjutkan, **Then** sistem menolak pilihan tersebut dan menampilkan informasi yang sesuai.
5. **Given** pengguna mengubah metode pembayaran sebelum konfirmasi akhir, **When** pilihan baru dipilih, **Then** ringkasan menampilkan metode terbaru.
6. **Given** metode pembayaran hanya berupa opsi demo, **When** pengguna memilih metode, **Then** sistem menjelaskan bahwa pilihan tersebut merupakan simulasi dan tidak memproses pembayaran sungguhan.
7. **Given** tidak ada metode yang tersedia, **When** halaman dibuka, **Then** sistem menampilkan keterangan bahwa metode pembayaran belum tersedia dan tidak mengizinkan pengguna melanjutkan seolah-olah metode telah dipilih.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-02 (status sesuai data), BR-03 (data dummy), BR-05 (umpan balik kesalahan), BR-06 (tidak mengklaim proses nyata tanpa integrasi).
- **Catatan:** Metode yang didukung dan integrasi pembayaran nyata perlu ditentukan tim; PRD awal tidak mencakup pemrosesan pembayaran sungguhan.
