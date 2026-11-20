# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-26 --- Bukti pembayaran dan transaksi gagal

``` mermaid
flowchart TD
    A([Mulai]) --> B[Buka detail transaksi] --> C[Tampilkan status] --> D{Transaksi berhasil?}
    D -- Ya --> E[Tampilkan bukti] --> F[Lihat atau simpan bukti] --> Z([Selesai])
    D -- Tidak --> G[Tampilkan alasan/status gagal] --> H{Ada tindak lanjut?}
    H -- Bantuan --> I[Buka bantuan] --> Z
    H -- Coba lagi --> J[Periksa status akhir transaksi] --> K{Sudah berhasil?}
    K -- Ya --> E
    K -- Tidak --> L[Tampilkan opsi coba lagi yang aman] --> Z
```
