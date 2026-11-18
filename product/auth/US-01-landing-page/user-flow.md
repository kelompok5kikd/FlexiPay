# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-01 --- Landing page FlexiPay

``` mermaid
flowchart TD
    A([Mulai]) --> B[Pengunjung membuka website] --> C[Tampilkan landing page, manfaat, cara kerja, dan merchant] --> D{Pilih tindakan?}
    D -- Login --> E[Halaman login]
    D -- Daftar --> F[Halaman registrasi]
    D -- Informasi --> G[Lihat informasi fitur] --> C
    E --> H([Selesai])
    F --> H
```
