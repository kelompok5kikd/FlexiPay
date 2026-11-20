# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-20 --- Konfirmasi transaksi dengan PIN

``` mermaid
flowchart TD
    A([Mulai]) --> B[Tampilkan ringkasan akhir] --> C[Masukkan PIN] --> D{PIN benar?}
    D -- Tidak --> E[Catat percobaan dan tampilkan pesan] --> F{Batas percobaan tercapai?}
    F -- Ya --> G[Blokir sementara] --> Z([Selesai])
    F -- Tidak --> C
    D -- Ya --> H[Validasi ulang transaksi dan limit] --> I{Masih memenuhi ketentuan?}
    I -- Tidak --> J[Tampilkan transaksi tidak dapat dilanjutkan] --> Z
    I -- Ya --> K([Lanjut US-21])
```
