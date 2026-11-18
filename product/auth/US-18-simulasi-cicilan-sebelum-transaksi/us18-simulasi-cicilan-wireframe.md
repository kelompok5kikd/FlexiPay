# Wireframe — US-18: Simulasi Cicilan Sebelum Transaksi FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay
- **Kebutuhan:** melakukan simulasi cicilan sebelum transaksi
- **Tujuan:** saya dapat memahami perkiraan pembayaran berdasarkan nominal dan tenor yang dipilih
- **Prioritas:** Could
- **Ukuran:** M
- **Sprint:** 5

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-18**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Kalkulator Simulasi

2. Hasil Simulasi Cicilan

3. Ringkasan Simulasi

## 4. Rancangan Wireframe

### 1. Kalkulator Simulasi

```text
┌──────────────────────────────────────────┐
│ Kalkulator Simulasi                      │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Kalkulator Simulasi.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melakukan simulasi cicilan sebelum transaksi**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Hasil Simulasi Cicilan

```text
┌──────────────────────────────────────────┐
│ Hasil Simulasi Cicilan                   │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Hasil Simulasi Cicilan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melakukan simulasi cicilan sebelum transaksi**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Ringkasan Simulasi

```text
┌──────────────────────────────────────────┐
│ Ringkasan Simulasi                       │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Ringkasan Simulasi.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melakukan simulasi cicilan sebelum transaksi**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melakukan simulasi cicilan sebelum transaksi.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna berada pada alur simulasi cicilan,  
   **Aksi:** halaman dibuka,  
   **Respons UI:** sistem menampilkan input nominal dan pilihan tenor yang tersedia pada prototipe.

2. **Kondisi:** pengguna memasukkan nominal valid dan memilih tenor yang tersedia,  
   **Aksi:** simulasi dijalankan,  
   **Respons UI:** sistem menampilkan hasil perhitungan berdasarkan rumus dan parameter yang telah ditetapkan tim.

3. **Kondisi:** nominal kosong, nol, negatif, atau tidak valid,  
   **Aksi:** pengguna menjalankan simulasi,  
   **Respons UI:** sistem menolak input dan menampilkan pesan kesalahan yang jelas.

4. **Kondisi:** pengguna belum memilih tenor yang diwajibkan,  
   **Aksi:** simulasi dijalankan,  
   **Respons UI:** sistem meminta pengguna memilih tenor terlebih dahulu.

5. **Kondisi:** rumus, biaya, atau parameter perhitungan belum ditetapkan,  
   **Aksi:** pengguna menjalankan simulasi,  
   **Respons UI:** sistem tidak mengarang hasil perhitungan dan menampilkan keterangan bahwa simulasi belum tersedia atau menggunakan data contoh yang diberi label.

6. **Kondisi:** hasil simulasi ditampilkan,  
   **Aksi:** pengguna membaca hasilnya,  
   **Respons UI:** sistem menjelaskan bahwa nominal tersebut merupakan estimasi dan bukan tagihan final atau persetujuan pembiayaan.

7. **Kondisi:** pengguna mengubah nominal atau tenor,  
   **Aksi:** simulasi dijalankan kembali,  
   **Respons UI:** hasil diperbarui sesuai input terbaru dan parameter yang berlaku.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-18 — Simulasi Cicilan Sebelum Transaksi FlexiPay.
- **Dokumen:** `user stories/US-18_*.md` dalam ZIP User Story FlexiPay.
