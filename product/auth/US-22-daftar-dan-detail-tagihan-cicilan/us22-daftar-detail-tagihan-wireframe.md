# Wireframe — US-22: Daftar dan Detail Tagihan Cicilan FlexiPay

## 1. Informasi User Story

- **Aktor:** pengguna FlexiPay yang memiliki data cicilan
- **Kebutuhan:** melihat daftar dan detail tagihan
- **Tujuan:** saya dapat memahami nominal, tanggal jatuh tempo, dan status setiap tagihan
- **Prioritas:** Must
- **Ukuran:** M
- **Sprint:** 5

## 2. Tujuan Wireframe

Wireframe ini menggambarkan struktur antarmuka low-fidelity untuk mendukung User Story **US-22**. Rancangan dibatasi pada kebutuhan dan acceptance criteria yang tertulis di sumber; elemen tambahan hanya berupa pola navigasi/umpan balik dasar agar alur dapat dipahami.

## 3. Alur Layar

1. Ringkasan Limit dan Tagihan

2. Detail Tagihan

## 4. Rancangan Wireframe

### 1. Ringkasan Limit dan Tagihan

```text
┌──────────────────────────────────────────┐
│ Ringkasan Limit dan Tagihan              │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Ringkasan Limit dan Tagihan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat daftar dan detail tagihan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

### 2. Detail Tagihan

```text
┌──────────────────────────────────────────┐
│ Detail Tagihan                           │
├──────────────────────────────────────────┤
│ [Status / ringkasan informasi utama]     │
│ [Rincian data sesuai sumber]             │
│ [Keterangan biaya / waktu / status jika  │
│ [Tombol aksi utama]                      │
│ [Tautan: Batalkan / Kembali / Bantuan]   │
└──────────────────────────────────────────┘
```

**Komponen UI:**
- Header/judul halaman: Detail Tagihan.
- Konten utama: informasi yang diperlukan untuk kebutuhan **melihat daftar dan detail tagihan**.
- Aksi pengguna: lanjutkan, kembali, atau batalkan sesuai status proses.
- State yang perlu dirancang: default, loading (jika ada pemrosesan), sukses, gagal, dan data kosong bila relevan.

## 5. Interaksi dan State

- **Aksi utama:** melihat daftar dan detail tagihan.
- **Validasi:** tampilkan pesan inline yang jelas jika input atau data tidak memenuhi ketentuan.
- **Loading:** gunakan indikator proses hanya saat sistem benar-benar sedang memproses.
- **Sukses:** tampilkan hasil sesuai respons/data yang valid.
- **Gagal:** tampilkan alasan yang dapat dipahami; jangan mengubah status menjadi berhasil jika belum terkonfirmasi.
- **Batal/kembali:** hentikan atau tinggalkan alur dengan aman tanpa mengklaim transaksi berhasil.

## 6. Acceptance Criteria yang Harus Dipenuhi

1. **Kondisi:** pengguna sudah login dan memiliki data tagihan,  
   **Aksi:** pengguna membuka halaman tagihan,  
   **Respons UI:** sistem menampilkan daftar tagihan yang terkait dengan akun tersebut.

2. **Kondisi:** daftar tagihan ditampilkan,  
   **Aksi:** pengguna melihat sebuah tagihan,  
   **Respons UI:** sistem menampilkan informasi yang tersedia, seperti nominal, tanggal jatuh tempo, dan status tagihan.

3. **Kondisi:** pengguna memilih salah satu tagihan,  
   **Aksi:** halaman detail dibuka,  
   **Respons UI:** sistem menampilkan rincian tagihan yang sesuai dengan item yang dipilih.

4. **Kondisi:** pengguna tidak memiliki tagihan atau data belum tersedia,  
   **Aksi:** halaman dibuka,  
   **Respons UI:** sistem menampilkan keadaan kosong atau keterangan bahwa tagihan belum tersedia.

5. **Kondisi:** status tagihan tersedia,  
   **Aksi:** daftar atau detail ditampilkan,  
   **Respons UI:** status mengikuti data yang tersimpan dan tidak disimpulkan sebagai lunas atau terlambat tanpa dasar data.

6. **Kondisi:** nominal tagihan ditampilkan,  
   **Aksi:** pengguna membaca rinciannya,  
   **Respons UI:** nominal menggunakan format Rupiah yang konsisten.

7. **Kondisi:** tagihan menggunakan data dummy,  
   **Aksi:** daftar atau detail ditampilkan,  
   **Respons UI:** sistem memberi label simulasi agar tidak disalahartikan sebagai kewajiban nyata.

8. **Kondisi:** pengguna membuka tagihan,  
   **Aksi:** sistem mengambil data,  
   **Respons UI:** hanya tagihan milik akun pengguna yang dapat ditampilkan.

9. **Kondisi:** data tagihan gagal dimuat,  
   **Aksi:** terjadi kegagalan,  
   **Respons UI:** sistem menampilkan pesan yang jelas dan tidak menampilkan status pembayaran yang tidak terverifikasi.

## 7. Catatan Desain dan Batasan

- Konten, label, status, dan tindakan final harus mengikuti data serta aturan bisnis yang ditetapkan pada User Story.
- Jika fitur masih berupa simulasi/data dummy atau belum terintegrasi dengan layanan eksternal, tampilkan label simulasi secara eksplisit.
- Jangan menampilkan status berhasil sebelum ada hasil valid yang mendukungnya.
- Detail visual (warna, tipografi, ikon, spacing) belum ditentukan karena sumber User Story tidak menetapkan design system.

## 8. Referensi

- **Sumber:** User Story US-22 — Daftar dan Detail Tagihan Cicilan FlexiPay.
- **Dokumen:** `user stories/US-22_*.md` dalam ZIP User Story FlexiPay.
