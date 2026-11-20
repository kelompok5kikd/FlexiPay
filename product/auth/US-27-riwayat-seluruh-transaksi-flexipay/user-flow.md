# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-27 --- Riwayat seluruh transaksi

``` mermaid
flowchart TD
    A([Mulai]) --> B[Buka Riwayat Transaksi] --> C[Muat transaksi pengguna] --> D{Riwayat tersedia?}
    D -- Tidak --> E[Tampilkan belum ada transaksi] --> Z([Selesai])
    D -- Ya --> F[Tampilkan transaksi terbaru] --> G[Pilih transaksi] --> H[Tampilkan detail] --> I{Kembali ke daftar?}
    I -- Ya --> F
    I -- Tidak --> Z
```
