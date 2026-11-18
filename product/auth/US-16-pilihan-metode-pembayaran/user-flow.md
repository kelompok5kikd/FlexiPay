# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-16 --- Pilihan metode pembayaran

``` mermaid
flowchart TD
    A([Mulai]) --> B[Tampilkan metode tersedia] --> C[Pilih metode] --> D{Metode tersedia untuk transaksi?}
    D -- Tidak --> E[Tampilkan metode tidak tersedia] --> B
    D -- Ya --> F[Tampilkan ketentuan] --> G[Konfirmasi pilihan] --> H([Lanjut US-17])
```
