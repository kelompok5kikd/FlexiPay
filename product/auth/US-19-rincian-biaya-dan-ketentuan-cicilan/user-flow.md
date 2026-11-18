# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-19 --- Rincian biaya dan ketentuan cicilan

``` mermaid
flowchart TD
    A([Mulai]) --> B[Tampilkan pokok, biaya, jadwal, total] --> C[Pengguna membaca ketentuan] --> D{Setuju?}
    D -- Tidak --> E[Kembali atau batalkan] --> F([Selesai tanpa transaksi])
    D -- Ya --> G[Simpan persetujuan] --> H([Lanjut US-20])
```
