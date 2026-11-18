# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-04 --- Pengajuan dan pengecekan limit

``` mermaid
flowchart TD
    A([Mulai]) --> B[Login dan buka pengajuan limit] --> C[Isi data pengajuan] --> D{Data lengkap?}
    D -- Tidak --> E[Minta data dilengkapi] --> C
    D -- Ya --> F[Proses pemeriksaan kelayakan] --> G{Disetujui?}
    G -- Tidak --> H[Tampilkan status pengajuan] --> I([Selesai])
    G -- Ya --> J[Simpan dan tampilkan limit disetujui] --> I
```
