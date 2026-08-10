# Panduan Deployment ke Server Production (Lingkungan Nyata)

Dokumen ini berisi daftar hal-hal krusial yang **wajib** dilakukan ketika memindahkan website Komite ini dari lingkungan pengembangan lokal (localhost/laragon) ke server production (hosting/VPS). Poin-poin di bawah ini memastikan bahwa SEO, keamanan, dan performa aplikasi berjalan secara optimal.

## 1. Konfigurasi Lingkungan (`.env`)
Buka file `.env` di server production dan ubah nilainya menjadi seperti berikut:
- `APP_ENV=production` 
  *(Sangat penting agar Laravel berjalan dalam mode optimal dan aman).*
- `APP_DEBUG=false` 
  *(Wajib dimatikan agar saat ada error, kode sistem Anda tidak bocor ke publik).*
- `APP_URL=https://domain-anda.com` 
  *(Sangat penting! Jika ini tidak diubah, maka tautan di `sitemap.xml` dan gambar link preview WA/sosmed akan tetap mengarah ke localhost dan akan gagal dimuat).*

## 2. Kompilasi Aset Frontend (React/Vite)
Di lingkungan lokal, proses dilakukan dengan `npm run dev`. Di server production, Anda tidak boleh menjalankan perintah tersebut. Sebagai gantinya, jalankan perintah berikut di terminal:
```bash
npm run build
```
Perintah ini akan mengecilkan (minifikasi), merampingkan, dan mengemas seluruh kode React, Tailwind, dan JS Anda menjadi file statis agar siap dimuat dengan kecepatan maksimal oleh pengunjung asli.

## 3. Tautan Penyimpanan Gambar (Storage Link)
Karena kita menyimpan file statis (seperti gambar thumbnail "Kabar") di folder penyimpanan internal Laravel (`storage/app/public`), Anda wajib menjalankan perintah ini di terminal server production:
```bash
php artisan storage:link
```
Jika tautan (*symlink*) ini tidak dibuat, gambar-gambar artikel tidak akan muncul di website maupun di preview media sosial.

## 4. Optimalisasi Kecepatan (Caching)
Untuk membuat website menjadi super cepat dan memiliki respons Time to First Byte (TTFB) yang disukai Google, jalankan 3 perintah *caching* Laravel ini di terminal:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```
**Catatan:** Setiap kali Anda melakukan perubahan konfigurasi pada file `.env` di production nantinya, Anda harus menjalankan ulang perintah `php artisan config:cache` agar perubahan terbaca oleh sistem.

## 5. Pendaftaran ke Mesin Pencari (Search Console)
Setelah website *live* dan nama domain aktif, sangat direkomendasikan untuk melakukan langkah optimasi SEO ini:
1. Buka **Google Search Console**.
2. Daftarkan domain website komite Anda.
3. Masukkan URL peta situs yang telah disediakan oleh sistem: `https://domain-anda.com/sitemap.xml`.
Langkah ini akan "memaksa" bot Google untuk segera merayapi artikel Kabar, Program, dan struktur organisasi Anda saat itu juga, sehingga website lebih cepat muncul di pencarian Google.
