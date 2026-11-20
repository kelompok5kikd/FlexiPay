# User Flow FlexiPay

Dokumen user flow individual berdasarkan backlog FlexiPay. Diagram menggunakan Mermaid `flowchart TD`.

- Oval: awal atau akhir proses.
- Persegi: langkah atau proses.
- Belah ketupat: keputusan atau validasi.

---

## US-25 --- Pengingat sebelum jatuh tempo

``` mermaid
flowchart TD
    A([Sistem menjalankan pemeriksaan terjadwal]) --> B[Periksa tagihan dan jatuh tempo] --> C{Ada tagihan mendekati jatuh tempo?}
    C -- Tidak --> Z([Selesai siklus ini])
    C -- Ya --> D[Periksa status lunas dan preferensi] --> E{Belum lunas dan pengingat aktif?}
    E -- Tidak --> Z
    E -- Ya --> F[Kirim pengingat melalui kanal tersedia] --> G[Catat hasil pengiriman] --> Z
```
