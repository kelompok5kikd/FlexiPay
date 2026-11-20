# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-40 --- Keamanan sesi dan aktivitas mencurigakan

``` mermaid
flowchart TD
    A([Sesi aktif]) --> B[Pantau masa sesi dan sinyal keamanan] --> C{Sesi kedaluwarsa atau aktivitas mencurigakan?}
    C -- Tidak --> D[Lanjutkan aktivitas normal] --> B
    C -- Kedaluwarsa --> E[Akhiri sesi dan minta login ulang] --> Z([Selesai])
    C -- Mencurigakan --> F[Batasi tindakan berisiko dan kirim peringatan] --> G{Perlu verifikasi tambahan?}
    G -- Ya --> H[Pengguna melakukan verifikasi] --> I{Berhasil?}
    I -- Tidak --> J[Amankan akun dan arahkan ke pemulihan] --> Z
    I -- Ya --> K[Pulihkan akses sesuai hasil pemeriksaan] --> Z
    G -- Tidak --> L[Catat kejadian dan tampilkan peringatan] --> B
```
