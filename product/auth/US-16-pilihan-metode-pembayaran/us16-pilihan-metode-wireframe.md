# Wireframe — US-16: Pilihan Metode Pembayaran FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay
- **Kebutuhan:** melihat dan memilih metode pembayaran yang tersedia
- **Tujuan:** saya dapat memilih opsi yang sesuai sebelum melanjutkan transaksi
- **Prioritas:** Could
- **Ukuran:** M
- **Sprint:** 4

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-16**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Pilih Metode Pembayaran

2. Detail Metode

3. Ringkasan Pembayaran

## 4. Rancangan Wireframe

### 1. Pilih Metode Pembayaran

```text
┌──────────────────────────────────────────┐
│ Pilih Metode Pembayaran                  │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Pilih Metode Pembayaran.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat dan memilih metode pembayaran yang tersedia**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Detail Metode

```text
┌──────────────────────────────────────────┐
│ Detail Metode                            │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Detail Metode.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat dan memilih metode pembayaran yang tersedia**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Ringkasan Pembayaran

```text
┌──────────────────────────────────────────┐
│ Ringkasan Pembayaran                     │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Ringkasan Pembayaran.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat dan memilih metode pembayaran yang tersedia**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat dan memilih metode pembayaran yang tersedia.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna berada pada tahap pemilihan metode pembayaran,  
   **Aksi:** halaman ditampilkan,  
   **Respons UI:** sistem menampilkan metode yang benar-benar tersedia pada konfigurasi atau prototipe.

2. **Kondisi:** terdapat satu atau lebih metode yang tersedia,  
   **Aksi:** pengguna memilih salah satunya,  
   **Respons UI:** sistem menandai pilihan tersebut dengan jelas.

3. **Kondisi:** pengguna belum memilih metode,  
   **Aksi:** pengguna mencoba melanjutkan dan pemilihan diwajibkan,  
   **Respons UI:** sistem meminta pengguna memilih metode terlebih dahulu.

4. **Kondisi:** metode yang dipilih tidak tersedia atau dinonaktifkan,  
   **Aksi:** pengguna mencoba melanjutkan,  
   **Respons UI:** sistem menolak pilihan tersebut dan menampilkan informasi yang sesuai.

5. **Kondisi:** pengguna mengubah metode pembayaran sebelum konfirmasi akhir,  
   **Aksi:** pilihan baru dipilih,  
   **Respons UI:** ringkasan menampilkan metode terbaru.

6. **Kondisi:** metode pembayaran hanya berupa opsi demo,  
   **Aksi:** pengguna memilih metode,  
   **Respons UI:** sistem menjelaskan bahwa pilihan tersebut merupakan simulasi dan tidak memproses pembayaran sungguhan.

7. **Kondisi:** tidak ada metode yang tersedia,  
   **Aksi:** halaman dibuka,  
   **Respons UI:** sistem menampilkan keterangan bahwa metode pembayaran belum tersedia dan tidak mengizinkan pengguna melanjutkan seolah-olah metode telah dipilih.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-16 — Pilihan Metode Pembayaran FlexiPay.
- **Dokumen:** `user stories/US-16_*.md` dalam ZIP User Story FlexiPay.
