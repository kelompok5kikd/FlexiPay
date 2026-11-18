# Wireframe — US-08: Dashboard Utama FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay yang sudah login
- **Kebutuhan:** melihat dashboard utama
- **Tujuan:** saya dapat memahami kondisi akun dan menemukan fitur penting dengan cepat
- **Prioritas:** Must
- **Ukuran:** M
- **Sprint:** 3

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-08**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Dashboard

2. Ringkasan Akun

3. Akses Menu Utama

## 4. Rancangan Wireframe

### 1. Dashboard

```text
┌──────────────────────────────────────────┐
│ Dashboard                                │
├──────────────────────────────────────────┤
│ [Ringkasan atau judul halaman]           │
│ [Pencarian / filter bila relevan]        │
│ [Daftar kartu / item data]               │
│ [Empty state jika data tidak tersedia]   │
│ [Navigasi bawah: Beranda | Aktivitas | B │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Dashboard.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat dashboard utama**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Ringkasan Akun

```text
┌──────────────────────────────────────────┐
│ Ringkasan Akun                           │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Ringkasan Akun.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat dashboard utama**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Akses Menu Utama

```text
┌──────────────────────────────────────────┐
│ Akses Menu Utama                         │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Akses Menu Utama.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat dashboard utama**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat dashboard utama.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna berhasil login,  
   **Aksi:** pengguna membuka dashboard,  
   **Respons UI:** sistem menampilkan halaman utama FlexiPay.

2. **Kondisi:** dashboard ditampilkan,  
   **Aksi:** pengguna melihat ringkasan halaman,  
   **Respons UI:** sistem menampilkan informasi utama yang tersedia, seperti ringkasan limit, transaksi, dan tagihan.

3. **Kondisi:** pengguna memilih menu atau pintasan pada dashboard,  
   **Aksi:** tindakan dilakukan,  
   **Respons UI:** sistem mengarahkan pengguna ke halaman fitur yang sesuai.

4. **Kondisi:** pengguna belum login,  
   **Aksi:** pengguna mencoba mengakses dashboard yang memerlukan autentikasi,  
   **Respons UI:** sistem meminta pengguna login terlebih dahulu.

5. **Kondisi:** sebagian data dashboard belum tersedia,  
   **Aksi:** dashboard dibuka,  
   **Respons UI:** sistem menampilkan status kosong atau informasi belum tersedia tanpa mengarang nilai.

6. **Kondisi:** dashboard menggunakan data dummy,  
   **Aksi:** informasi ditampilkan,  
   **Respons UI:** data disajikan sebagai simulasi dan tidak dinyatakan sebagai transaksi nyata.

7. **Kondisi:** pengguna membuka dashboard melalui ukuran layar yang berbeda,  
   **Aksi:** halaman ditampilkan,  
   **Respons UI:** informasi dan navigasi utama tetap terbaca serta dapat digunakan.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-08 — Dashboard Utama FlexiPay.
- **Dokumen:** `user stories/US-08_*.md` dalam ZIP User Story FlexiPay.
