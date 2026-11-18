# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-23 --- Pembayaran tagihan cicilan

``` mermaid
flowchart TD
    A([Mulai]) --> B[Pilih Bayar pada detail tagihan] --> C[Periksa status dan nominal] --> D{Masih perlu dibayar?}
    D -- Tidak --> E[Tampilkan lunas/tidak dapat dibayar] --> Z([Selesai])
    D -- Ya --> F[Pilih metode dan konfirmasi] --> G[Proses pembayaran] --> H{Berhasil?}
    H -- Tidak --> I[Tampilkan status gagal atau menunggu] --> Z
    H -- Ya --> J[Perbarui status tagihan] --> K[Tampilkan konfirmasi pembayaran] --> L([Lanjut US-24])
```
