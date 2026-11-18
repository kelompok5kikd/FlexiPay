# Wireframe — US-10: Informasi Jatuh Tempo Cicilan

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay yang memiliki informasi cicilan pada akun
- **Kebutuhan:** melihat tanggal jatuh tempo dan nominal cicilan
- **Tujuan:** saya dapat mengetahui kapan pembayaran perlu dilakukan
- **Prioritas:** Must
- **Ukuran:** M
- **Sprint:** 3

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-10**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Daftar Tagihan

2. Detail Jatuh Tempo

3. Pengaturan Pengingat

## 4. Rancangan Wireframe

### 1. Daftar Tagihan

```text
┌──────────────────────────────────────────┐
│ Daftar Tagihan                           │
├──────────────────────────────────────────┤
│ [Ringkasan atau judul halaman]           │
│ [Pencarian / filter bila relevan]        │
│ [Daftar kartu / item data]               │
│ [Empty state jika data tidak tersedia]   │
│ [Navigasi bawah: Beranda | Aktivitas | B │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Daftar Tagihan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat tanggal jatuh tempo dan nominal cicilan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Detail Jatuh Tempo

```text
┌──────────────────────────────────────────┐
│ Detail Jatuh Tempo                       │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Detail Jatuh Tempo.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat tanggal jatuh tempo dan nominal cicilan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Pengaturan Pengingat

```text
┌──────────────────────────────────────────┐
│ Pengaturan Pengingat                     │
├──────────────────────────────────────────┤
│ [Label field sesuai kebutuhan fitur]     │
│ [Input / pilihan pengguna]               │
│ [Petunjuk format dan validasi]           │
│ [Pesan kesalahan inline bila tidak valid │
│ [Tombol: Lanjutkan / Simpan]             │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Pengaturan Pengingat.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat tanggal jatuh tempo dan nominal cicilan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat tanggal jatuh tempo dan nominal cicilan.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna sudah login dan memiliki data cicilan,  
   **Aksi:** pengguna membuka bagian jatuh tempo,  
   **Respons UI:** sistem menampilkan tanggal jatuh tempo dan nominal cicilan sesuai data yang tersedia.

2. **Kondisi:** data cicilan ditampilkan,  
   **Aksi:** pengguna melihat informasi pembayaran,  
   **Respons UI:** nominal ditampilkan dalam format Rupiah dan tanggal ditampilkan dengan format yang konsisten.

3. **Kondisi:** cicilan memiliki status tertentu,  
   **Aksi:** informasi ditampilkan,  
   **Respons UI:** status mengikuti data yang tersimpan dan tidak dibuat-buat.

4. **Kondisi:** pengguna tidak memiliki data cicilan atau data belum tersedia,  
   **Aksi:** halaman jatuh tempo dibuka,  
   **Respons UI:** sistem menampilkan keterangan bahwa belum ada data cicilan yang tersedia.

5. **Kondisi:** tanggal jatuh tempo sudah lewat menurut data yang tersedia,  
   **Aksi:** sistem menampilkan cicilan,  
   **Respons UI:** status ditampilkan sesuai aturan dan data yang ditetapkan aplikasi, tanpa mengarang denda atau biaya tambahan.

6. **Kondisi:** informasi cicilan berasal dari data dummy,  
   **Aksi:** informasi ditampilkan,  
   **Respons UI:** sistem menandainya sebagai simulasi jika diperlukan agar tidak disalahartikan sebagai kewajiban nyata.

7. **Kondisi:** data gagal dimuat,  
   **Aksi:** pengguna membuka bagian jatuh tempo,  
   **Respons UI:** sistem menampilkan pesan kegagalan dan tidak menampilkan nilai yang menyesatkan.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-10 — Informasi Jatuh Tempo Cicilan.
- **Dokumen:** `user stories/US-10_*.md` dalam ZIP User Story FlexiPay.
