# Wireframe — US-40: Keamanan Sesi dan Peringatan Aktivitas Mencurigakan

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay
- **Kebutuhan:** sesi akun dikelola secara aman dan diberi informasi tentang aktivitas yang terindikasi mencurigakan
- **Tujuan:** saya dapat melindungi akun dan mengambil tindakan jika diperlukan
- **Prioritas:** Should
- **Ukuran:** L
- **Sprint:** 9

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-40**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Pengaturan Keamanan Sesi

2. Peringatan Aktivitas

3. Tindakan Keamanan

## 4. Rancangan Wireframe

### 1. Pengaturan Keamanan Sesi

```text
┌──────────────────────────────────────────┐
│ Pengaturan Keamanan Sesi                 │
├──────────────────────────────────────────┤
│ [Label field sesuai kebutuhan fitur]     │
│ [Input / pilihan pengguna]               │
│ [Petunjuk format dan validasi]           │
│ [Pesan kesalahan inline bila tidak valid │
│ [Tombol: Lanjutkan / Simpan]             │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Pengaturan Keamanan Sesi.
- Konten utama: informasi yang diperlukan untuk kebutuhan **sesi akun dikelola secara aman dan diberi informasi tentang aktivitas yang terindikasi mencurigakan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Peringatan Aktivitas

```text
┌──────────────────────────────────────────┐
│ Peringatan Aktivitas                     │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Peringatan Aktivitas.
- Konten utama: informasi yang diperlukan untuk kebutuhan **sesi akun dikelola secara aman dan diberi informasi tentang aktivitas yang terindikasi mencurigakan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 3. Tindakan Keamanan

```text
┌──────────────────────────────────────────┐
│ Tindakan Keamanan                        │
├──────────────────────────────────────────┤
│ [Informasi atau instruksi fitur]         │
│ [Konten / pilihan yang tersedia]         │
│ [Status proses dan umpan balik]          │
│ [Tombol aksi utama]                      │
│ [Aksi sekunder: Kembali / Batalkan]      │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Tindakan Keamanan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **sesi akun dikelola secara aman dan diberi informasi tentang aktivitas yang terindikasi mencurigakan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** sesi akun dikelola secara aman dan diberi informasi tentang aktivitas yang terindikasi mencurigakan.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna berhasil login,  
   **Aksi:** sesi dibuat,  
   **Respons UI:** sistem menggunakan mekanisme sesi yang sesuai dengan rancangan keamanan aplikasi.

2. **Kondisi:** sesi telah melewati batas tidak aktif yang dikonfigurasi,  
   **Aksi:** pengguna mencoba mengakses fitur yang dilindungi,  
   **Respons UI:** sistem meminta autentikasi ulang atau mengakhiri sesi sesuai kebijakan.

3. **Kondisi:** pengguna memilih logout,  
   **Aksi:** proses logout berhasil,  
   **Respons UI:** sesi yang berlaku diakhiri dan halaman terlindungi tidak dapat diakses kembali menggunakan sesi tersebut.

4. **Kondisi:** sistem mendeteksi pola aktivitas yang memenuhi aturan risiko yang telah ditetapkan,  
   **Aksi:** peristiwa diproses,  
   **Respons UI:** sistem mencatat peristiwa dan menampilkan peringatan melalui kanal yang tersedia.

5. **Kondisi:** aktivitas tidak memenuhi kriteria deteksi,  
   **Aksi:** sistem memproses aktivitas,  
   **Respons UI:** sistem tidak menandainya sebagai mencurigakan tanpa dasar aturan.

6. **Kondisi:** peringatan aktivitas mencurigakan ditampilkan,  
   **Aksi:** pengguna membukanya,  
   **Respons UI:** sistem menyajikan informasi yang aman dan langkah yang dapat dilakukan, tanpa membocorkan detail deteksi yang sensitif.

7. **Kondisi:** sistem belum memiliki deteksi risiko atau notifikasi terintegrasi,  
   **Aksi:** fitur dijalankan dalam prototipe,  
   **Respons UI:** sistem memberi label simulasi dan tidak mengklaim pemantauan keamanan produksi aktif.

8. **Kondisi:** terjadi kesalahan pada pengelolaan sesi,  
   **Aksi:** sistem menangani permintaan,  
   **Respons UI:** akses ke data terlindungi tetap ditolak secara aman.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-40 — Keamanan Sesi dan Peringatan Aktivitas Mencurigakan.
- **Dokumen:** `user stories/US-40_*.md` dalam ZIP User Story FlexiPay.
