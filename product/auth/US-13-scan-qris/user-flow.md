# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-13 --- Scan QRIS

``` mermaid
flowchart TD
    A([Mulai]) --> B[Buka Bayar dan Scan QRIS] --> C{Izin kamera tersedia?}
    C -- Tidak --> D[Tampilkan instruksi izin kamera] --> B
    C -- Ya --> E[Scan kode QRIS] --> F{QR terbaca?}
    F -- Tidak --> G[Tampilkan gagal scan dan ulangi] --> E
    F -- Ya --> H[Kirim data QR untuk validasi] --> I([Lanjut US-14])
```
