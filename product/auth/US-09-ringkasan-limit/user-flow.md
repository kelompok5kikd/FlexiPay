# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-09 --- Ringkasan limit, transaksi, dan tagihan

``` mermaid
flowchart TD
    A([Mulai]) --> B[Buka dashboard] --> C[Ambil data limit, transaksi, tagihan] --> D{Data tersedia?}
    D -- Tidak --> E[Tampilkan kondisi kosong atau gagal muat] --> F{Coba lagi?}
    F -- Ya --> C
    F -- Tidak --> G([Selesai])
    D -- Ya --> H[Tampilkan ringkasan dan tautan rincian] --> G
```
