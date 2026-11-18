# Wireframe — US-17: Pilihan Tenor Cicilan FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay
- **Kebutuhan:** melihat dan memilih tenor cicilan yang tersedia
- **Tujuan:** saya dapat memahami opsi jangka waktu pembayaran dan estimasi cicilan sebelum melanjutkan
- **Prioritas:** Could
- **Ukuran:** M
- **Sprint:** 4

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-17**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Pilihan Tenor

2. Ringkasan Cicilan

3. Konfirmasi Pilihan

## 4. Rancangan Wireframe

### 1. Pilihan Tenor

```text
┌──────────────────────────────────────────┐
│ Pilihan Tenor                            │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Pilihan Tenor.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat dan memilih tenor cicilan yang tersedia**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Ringkasan Cicilan

```text
┌──────────────────────────────────────────┐
│ Ringkasan Cicilan                        │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Ringkasan Cicilan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat dan memilih tenor cicilan yang tersedia**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Konfirmasi Pilihan

```text
┌──────────────────────────────────────────┐
│ Konfirmasi Pilihan                       │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Konfirmasi Pilihan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat dan memilih tenor cicilan yang tersedia**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat dan memilih tenor cicilan yang tersedia.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna berada pada tahap pemilihan tenor,  
   **Aksi:** halaman ditampilkan,  
   **Respons UI:** sistem menampilkan pilihan tenor yang tersedia pada konfigurasi atau data simulasi.

2. **Kondisi:** pilihan tenor ditampilkan,  
   **Aksi:** pengguna memilih salah satu tenor,  
   **Respons UI:** sistem menandai pilihan yang dipilih secara jelas.

3. **Kondisi:** pengguna memilih tenor yang tersedia,  
   **Aksi:** ringkasan diperbarui,  
   **Respons UI:** sistem menampilkan tenor terpilih dan estimasi cicilan hanya jika data perhitungan yang diperlukan tersedia.

4. **Kondisi:** pengguna belum memilih tenor dan pilihan diwajibkan,  
   **Aksi:** pengguna mencoba melanjutkan,  
   **Respons UI:** sistem meminta pengguna memilih tenor terlebih dahulu.

5. **Kondisi:** tenor yang dipilih tidak tersedia atau tidak valid,  
   **Aksi:** pengguna mencoba melanjutkan,  
   **Respons UI:** sistem menolak pilihan tersebut dan menampilkan pesan yang sesuai.

6. **Kondisi:** estimasi cicilan atau biaya belum didukung perhitungan yang disepakati,  
   **Aksi:** pilihan tenor ditampilkan,  
   **Respons UI:** sistem tidak mengarang nilai cicilan, bunga, biaya, atau total pembayaran.

7. **Kondisi:** pilihan tenor merupakan simulasi,  
   **Aksi:** pengguna melihat hasilnya,  
   **Respons UI:** sistem menjelaskan bahwa nilai dan pilihan tersebut bukan penawaran kredit nyata.

8. **Kondisi:** pengguna membatalkan proses sebelum konfirmasi akhir,  
   **Aksi:** pembatalan dipilih,  
   **Respons UI:** sistem tidak membuat status transaksi atau pembiayaan berhasil.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-17 — Pilihan Tenor Cicilan FlexiPay.
- **Dokumen:** `user stories/US-17_*.md` dalam ZIP User Story FlexiPay.
