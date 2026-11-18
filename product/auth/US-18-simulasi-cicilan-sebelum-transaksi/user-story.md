# User Stories

## US-18 Simulasi Cicilan Sebelum Transaksi FlexiPay

- **Prioritas:** Could | **Ukuran:** M | **Sprint:** 5
- **Sebagai** pengguna FlexiPay, **saya ingin** melakukan simulasi cicilan sebelum transaksi, **agar** saya dapat memahami perkiraan pembayaran berdasarkan nominal dan tenor yang dipilih.

### Acceptance Criteria

1. **Given** pengguna berada pada alur simulasi cicilan, **When** halaman dibuka, **Then** sistem menampilkan input nominal dan pilihan tenor yang tersedia pada prototipe.
2. **Given** pengguna memasukkan nominal valid dan memilih tenor yang tersedia, **When** simulasi dijalankan, **Then** sistem menampilkan hasil perhitungan berdasarkan rumus dan parameter yang telah ditetapkan tim.
3. **Given** nominal kosong, nol, negatif, atau tidak valid, **When** pengguna menjalankan simulasi, **Then** sistem menolak input dan menampilkan pesan kesalahan yang jelas.
4. **Given** pengguna belum memilih tenor yang diwajibkan, **When** simulasi dijalankan, **Then** sistem meminta pengguna memilih tenor terlebih dahulu.
5. **Given** rumus, biaya, atau parameter perhitungan belum ditetapkan, **When** pengguna menjalankan simulasi, **Then** sistem tidak mengarang hasil perhitungan dan menampilkan keterangan bahwa simulasi belum tersedia atau menggunakan data contoh yang diberi label.
6. **Given** hasil simulasi ditampilkan, **When** pengguna membaca hasilnya, **Then** sistem menjelaskan bahwa nominal tersebut merupakan estimasi dan bukan tagihan final atau persetujuan pembiayaan.
7. **Given** pengguna mengubah nominal atau tenor, **When** simulasi dijalankan kembali, **Then** hasil diperbarui sesuai input terbaru dan parameter yang berlaku.

### Referensi

- **PRD:** Bagian 5 Scope MVP, Bagian 6 Fitur dan Prioritas, Bagian 7 Aturan Bisnis, Bagian 9 Asumsi dan Risiko.
- **Aturan bisnis terkait:** BR-01 (format Rupiah), BR-02 (hasil sesuai data), BR-03 (data simulasi diberi label), BR-05 (umpan balik input tidak valid), BR-06 (tidak mengklaim keputusan atau transaksi nyata tanpa integrasi).
- **Catatan:** Rumus cicilan dan biaya yang mengikat perlu ditetapkan secara resmi sebelum simulasi digunakan sebagai dasar keputusan finansial.
