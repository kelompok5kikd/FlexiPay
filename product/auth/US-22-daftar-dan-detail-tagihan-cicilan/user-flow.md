# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-22 --- Daftar dan detail tagihan

``` mermaid
flowchart TD
    A([Mulai]) --> B[Buka menu Tagihan] --> C[Muat daftar tagihan] --> D{Ada tagihan?}
    D -- Tidak --> E[Tampilkan belum ada tagihan] --> Z([Selesai])
    D -- Ya --> F[Tampilkan daftar dan status] --> G[Pilih tagihan] --> H[Tampilkan nominal, jatuh tempo, tenor, status] --> I{Bayar sekarang?}
    I -- Ya --> J([Lanjut US-23])
    I -- Tidak --> F
```
