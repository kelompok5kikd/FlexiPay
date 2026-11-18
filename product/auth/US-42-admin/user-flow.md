# UF-42 — User Flow Halaman Admin FlexiPay

**User Story:** US-42 — Halaman Admin untuk monitoring registrasi, login, dan penilaian kelayakan limit kredit.

## Tujuan
Menggambarkan proses admin FlexiPay login secara khusus, memantau pengguna yang registrasi/login, memeriksa pengajuan limit, dan mencatat keputusan kelayakan serta nominal limit sesuai kewenangan.

## 1. Flowchart Mermaid

```mermaid
flowchart TD
    A([Mulai]) --> B[Admin membuka halaman Admin FlexiPay]
    B --> C[Tampilkan form login admin]
    C --> D[Input email/username dan password]
    D --> E{Kredensial valid, akun aktif, role admin?}
    E -->|Tidak| F[Tolak akses dan catat login gagal]
    F --> C
    E -->|Ya| G[Validasi MFA jika diaktifkan]
    G --> H{MFA valid?}
    H -->|Tidak| F
    H -->|Ya| I[Buat sesi admin dan tampilkan Dashboard]
    I --> J[Pilih menu Monitoring Pengguna]
    J --> K[Tampilkan daftar registrasi, status akun, login terakhir]
    K --> L[Pilih pengguna / pengajuan limit]
    L --> M[Tampilkan profil, verifikasi identitas, data dan dokumen]
    M --> N[Admin melakukan pemeriksaan]
    N --> O{Data lengkap?}
    O -->|Tidak| P[Catat kekurangan dan status Perlu Perbaikan]
    P --> Q[Kirim notifikasi perbaikan kepada pengguna]
    O -->|Ya| R[Catat hasil penilaian kelayakan]
    R --> S{Hasil penilaian}
    S -->|Tidak layak| T[Catat alasan penolakan]
    T --> U[Simpan status Ditolak dan audit trail]
    U --> V[Notifikasi keputusan kepada pengguna]
    S -->|Layak| W{Admin memiliki hak approve limit?}
    W -->|Tidak| X[Ajukan ke admin approver]
    X --> Y[Admin approver meninjau keputusan]
    Y --> Z{Disetujui?}
    Z -->|Tidak| T
    Z -->|Ya| AA[Input nominal limit sesuai kebijakan]
    W -->|Ya| AA
    AA --> AB{Nominal sesuai parameter kebijakan?}
    AB -->|Tidak| AC[Tampilkan validasi nominal]
    AC --> AA
    AB -->|Ya| AD[Simpan keputusan dan limit secara konsisten]
    AD --> AE[Catat audit trail dan aktifkan limit sesuai aturan]
    AE --> AF[Notifikasi persetujuan kepada pengguna]
    Q --> AG([Selesai / kembali ke dashboard])
    V --> AG
    AF --> AG
```

## 2. Ringkasan Alur

1. Admin membuka halaman Admin FlexiPay.
2. Admin login menggunakan akun internal.
3. Backend memvalidasi password, status akun, role, dan MFA bila diterapkan.
4. Sistem menolak pengguna biasa atau akun admin nonaktif.
5. Admin masuk dashboard dan membuka Monitoring Pengguna.
6. Admin melihat daftar registrasi, status akun, serta login terakhir/riwayat login.
7. Admin memilih pengguna yang mengajukan limit.
8. Sistem menampilkan profil, status verifikasi, data pengajuan, dan dokumen pendukung.
9. Admin memeriksa kelengkapan serta kelayakan.
10. Jika data kurang, admin meminta perbaikan.
11. Jika tidak layak, admin menolak dengan alasan.
12. Jika layak, admin yang berwenang menetapkan nominal limit sesuai kebijakan.
13. Sistem menyimpan keputusan, limit, dan audit trail.
14. Sistem mengirim notifikasi status kepada pengguna.

## 3. Titik Validasi

- Role admin diperiksa di backend untuk setiap endpoint admin.
- Pengguna biasa tidak dapat mengakses halaman maupun API admin.
- Hanya role yang memiliki permission yang dapat menilai atau menyetujui limit.
- Nominal limit mengikuti parameter kebijakan yang berlaku.
- Registrasi/login tidak otomatis membuat limit aktif.
- Keputusan, perubahan limit, dan akses dokumen dicatat sesuai kebutuhan audit.
