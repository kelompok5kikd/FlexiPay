# Wireframe — US-09: Ringkasan Limit, Transaksi, dan Tagihan

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay yang sudah login
- **Kebutuhan:** melihat ringkasan limit, transaksi, dan tagihan
- **Tujuan:** saya dapat memantau informasi penggunaan layanan dari satu tempat
- **Prioritas:** Must
- **Ukuran:** M
- **Sprint:** 3

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-09**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Ringkasan Limit

2. Form Pengajuan Limit

3. Hasil Pengajuan

## 4. Rancangan Wireframe

### 1. Ringkasan Limit

```text
┌──────────────────────────────────────────┐
│ Ringkasan Limit                          │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Ringkasan Limit.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat ringkasan limit, transaksi, dan tagihan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Form Pengajuan Limit

```text
┌──────────────────────────────────────────┐
│ Form Pengajuan Limit                     │
├──────────────────────────────────────────┤
│ [Label field sesuai kebutuhan fitur]     │
│ [Input / pilihan pengguna]               │
│ [Petunjuk format dan validasi]           │
│ [Pesan kesalahan inline bila tidak valid │
│ [Tombol: Lanjutkan / Simpan]             │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Form Pengajuan Limit.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat ringkasan limit, transaksi, dan tagihan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Hasil Pengajuan

```text
┌──────────────────────────────────────────┐
│ Hasil Pengajuan                          │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Hasil Pengajuan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat ringkasan limit, transaksi, dan tagihan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat ringkasan limit, transaksi, dan tagihan.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna sudah login dan membuka dashboard,  
   **Aksi:** data tersedia,  
   **Respons UI:** sistem menampilkan ringkasan limit, transaksi, dan tagihan sesuai data akun.

2. **Kondisi:** informasi limit tersedia,  
   **Aksi:** ringkasan ditampilkan,  
   **Respons UI:** sistem menampilkan nominal limit dalam format Rupiah yang konsisten.

3. **Kondisi:** informasi transaksi tersedia,  
   **Aksi:** ringkasan ditampilkan,  
   **Respons UI:** sistem menampilkan ringkasan transaksi beserta status yang sesuai data.

4. **Kondisi:** informasi tagihan tersedia,  
   **Aksi:** ringkasan ditampilkan,  
   **Respons UI:** sistem menampilkan total atau ringkasan tagihan yang dapat dibedakan dari transaksi lainnya.

5. **Kondisi:** salah satu jenis data belum tersedia,  
   **Aksi:** ringkasan dimuat,  
   **Respons UI:** sistem menampilkan keadaan kosong atau keterangan belum tersedia untuk bagian tersebut.

6. **Kondisi:** data transaksi atau tagihan menggunakan data dummy,  
   **Aksi:** ringkasan ditampilkan,  
   **Respons UI:** informasi tidak diklaim sebagai data keuangan nyata.

7. **Kondisi:** pengguna membuka ringkasan,  
   **Aksi:** data sedang dimuat atau terjadi kegagalan,  
   **Respons UI:** sistem menampilkan indikator pemuatan atau pesan kegagalan yang jelas dan tidak mengganti data dengan nilai yang menyesatkan.

8. **Kondisi:** pengguna sedang login,  
   **Aksi:** ringkasan dimuat,  
   **Respons UI:** hanya data yang sesuai dengan akun pengguna yang ditampilkan.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-09 — Ringkasan Limit, Transaksi, dan Tagihan.
- **Dokumen:** `user stories/US-09_*.md` dalam ZIP User Story FlexiPay.
