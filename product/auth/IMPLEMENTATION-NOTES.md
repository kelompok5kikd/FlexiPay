# Catatan implementasi untuk spesifikasi

File user story, flow, dan database di tiap folder disimpan sebagai sumber kebutuhan. Keputusan berikut berasal dari arahan terbaru pemilik produk dan menjadi acuan UI yang berjalan:

- Setelah login, pengguna tetap berada di landing page yang sama. Header menampilkan menu profil; login tidak mengunci atau mengganti konten landing page.
- Registrasi meminta nama, nomor HP, email, kata sandi, dan PIN 6 digit. Kata sandi hanya formalitas formulir dan tidak dikirim ke server maupun disimpan. PIN di-hash sebelum disimpan; PIN dipakai untuk login bersama email.
- Form registrasi tidak meminta konfirmasi PIN. Email dan nomor HP harus unik.
- US-07 profil nasabah tersedia dari kartu Profil di `/dashboard`. Nama disimpan pada akun pengguna dan foto profil disimpan lokal di `data/profile-photos/`; pengambilan foto memerlukan sesi pengguna yang sama. Foto dibatasi JPG/PNG/WebP maksimal 2 MB.
- Scan QR membuka kamera setelah pengguna memberi izin. Pembacaan QRIS hanya meneruskan data ke tahap validasi simulasi, tanpa mengklaim pembayaran nyata.
- Database pengembangan berada di `data/flexipay.db` (SQLite lokal). Tidak ada transaksi atau data pembayaran nyata yang diproses.

Catatan ini menjembatani perbedaan antara alur umum pada dokumen backlog (misalnya dashboard setelah login atau konfirmasi kata sandi) dan keputusan UI yang diberikan kemudian.

- Dokumen US-09 yang diterima berisi kebutuhan ringkasan limit/transaksi/tagihan dan flowchart-nya disimpan di `US-09-ringkasan-limit/`. Alur pengajuan kredit pada aplikasi mengikuti rincian lanjutan yang diberikan pemilik produk di percakapan.
- Pengajuan kredit tersedia untuk pengguna yang login di `/pengajuan-kredit`. Data pribadi dan metadata dokumen disimpan terenkripsi di SQLite lokal; file dokumen disimpan dalam bentuk terenkripsi di `data/credit-documents/`. Kunci lokal ada pada `.env.local` dan wajib disediakan sebagai environment variable rahasia saat hosting.
- Admin memeriksa pengajuan di `/admin`, mencatat keputusan serta catatan nasabah, dan menetapkan limit/tenor jika menyetujui. Angsuran prototipe dihitung sebagai pokok dibagi tenor ditambah bunga 0,5% dari pokok per bulan; total pembayaran adalah angsuran bulanan dikali tenor.

- US-41 katalog produk/Rent Now, Pay Later disimpan di `US-41-katalog-produk-rent-now-pay-later/`. Checkout memverifikasi harga, stok, PIN hash, serta limit di backend. Pesanan/booking dan debit ledger dicatat atomik; alamat checkout dienkripsi. Nilai katalog properti saat ini adalah data contoh prototipe.
- US-16 pilihan metode pembayaran disimpan di `US-16-pilihan-metode-pembayaran/`. Pembayaran Midtrans ditujukan untuk tagihan angsuran bulanan pinjaman (satu cicilan per bulan), bukan tagihan per item. Integrasi Snap menggunakan Server Key di backend; tagihan hanya ditandai lunas setelah notifikasi Midtrans dengan signature dan nominal yang cocok diverifikasi. Mode lokal menggunakan Sandbox; transaksi Sandbox bukan pembayaran uang sungguhan. Metode yang tersedia mengikuti pengaturan Snap pada akun Midtrans.
