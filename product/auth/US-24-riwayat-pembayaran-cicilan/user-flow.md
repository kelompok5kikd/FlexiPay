# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-24 --- Riwayat pembayaran cicilan

``` mermaid
flowchart TD
    A([Mulai]) --> B[Buka riwayat pembayaran] --> C[Muat riwayat] --> D{Data tersedia?}
    D -- Tidak --> E[Tampilkan belum ada riwayat] --> Z([Selesai])
    D -- Ya --> F[Tampilkan tanggal, nominal, status] --> G[Pilih pembayaran] --> H[Tampilkan detail] --> Z
```
