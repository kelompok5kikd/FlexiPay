# Wireframe — US-27: Riwayat Seluruh Transaksi FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay yang sudah login
- **Kebutuhan:** melihat riwayat seluruh transaksi FlexiPay
- **Tujuan:** saya dapat meninjau aktivitas akun dari satu halaman
- **Prioritas:** Should
- **Ukuran:** M
- **Sprint:** 6

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-27**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Riwayat Transaksi

2. Filter Transaksi

3. Detail Transaksi

## 4. Rancangan Wireframe

### 1. Riwayat Transaksi

```text
┌──────────────────────────────────────────┐
│ Riwayat Transaksi                        │
├──────────────────────────────────────────┤
│ [Ringkasan atau judul halaman]           │
│ [Pencarian / filter bila relevan]        │
│ [Daftar kartu / item data]               │
│ [Empty state jika data tidak tersedia]   │
│ [Navigasi bawah: Beranda | Aktivitas | B │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Riwayat Transaksi.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat riwayat seluruh transaksi FlexiPay**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Filter Transaksi

```text
┌──────────────────────────────────────────┐
│ Filter Transaksi                         │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Filter Transaksi.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat riwayat seluruh transaksi FlexiPay**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Detail Transaksi

```text
┌──────────────────────────────────────────┐
│ Detail Transaksi                         │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Detail Transaksi.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat riwayat seluruh transaksi FlexiPay**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat riwayat seluruh transaksi FlexiPay.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna sudah login,  
   **Aksi:** pengguna membuka halaman riwayat transaksi,  
   **Respons UI:** sistem menampilkan transaksi yang terkait dengan akun tersebut.

2. **Kondisi:** data transaksi tersedia,  
   **Aksi:** daftar ditampilkan,  
   **Respons UI:** setiap item menampilkan informasi yang tersedia, seperti tanggal, jenis transaksi, merchant, nominal, dan status.

3. **Kondisi:** pengguna memilih satu transaksi,  
   **Aksi:** detail dibuka,  
   **Respons UI:** sistem menampilkan rincian transaksi yang sesuai dengan item tersebut.

4. **Kondisi:** terdapat banyak transaksi,  
   **Aksi:** daftar ditampilkan,  
   **Respons UI:** sistem menyajikan daftar dengan cara yang tetap mudah dibaca dan menyediakan paginasi atau pemuatan bertahap jika diperlukan oleh rancangan.

5. **Kondisi:** pengguna tidak memiliki transaksi,  
   **Aksi:** halaman dibuka,  
   **Respons UI:** sistem menampilkan keadaan kosong dengan keterangan yang jelas.

6. **Kondisi:** status transaksi belum final,  
   **Aksi:** riwayat ditampilkan,  
   **Respons UI:** sistem menampilkan status yang sesuai dan tidak menandainya sebagai berhasil tanpa konfirmasi.

7. **Kondisi:** riwayat memuat data dummy,  
   **Aksi:** data ditampilkan,  
   **Respons UI:** sistem memberi label simulasi agar tidak disalahartikan sebagai catatan transaksi nyata.

8. **Kondisi:** pengguna membuka riwayat transaksi,  
   **Aksi:** sistem mengambil data,  
   **Respons UI:** hanya transaksi milik akun yang sedang login yang dapat ditampilkan.

9. **Kondisi:** data gagal dimuat,  
   **Aksi:** terjadi kesalahan,  
   **Respons UI:** sistem menampilkan pesan yang jelas dan tidak mengganti riwayat dengan informasi yang tidak terverifikasi.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-27 — Riwayat Seluruh Transaksi FlexiPay.
- **Dokumen:** `user stories/US-27_*.md` dalam ZIP User Story FlexiPay.
