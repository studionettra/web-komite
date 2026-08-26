# Panduan Deployment ke Hostinger Shared Hosting

Dokumen ini berisi panduan langkah demi langkah untuk melakukan *deploy* aplikasi Komite KBIT-TKIT Al-Ikhlash ke *shared hosting* (terutama Hostinger).

---

## 1. Persiapan di Komputer Lokal

Sebelum mengunggah kode ke server, pastikan hal-hal berikut sudah selesai di lokal:

1. **Jalankan Build Frontend:**
   Pastikan Anda sudah menjalankan perintah build terakhir kalinya:
   ```bash
   npm run build
   ```
2. **Commit & Push ke Repositori:**
   Pastikan folder `public/build/` ikut ter-commit (karena kita sudah menghapusnya dari `.gitignore`).
   ```bash
   git add .
   git commit -m "Siap deploy ke Hostinger"
   git push origin main
   ```

---

## 2. Persiapan Layanan Pihak Ketiga (Produksi)

Jangan gunakan *key* testing/lokal untuk *production*. Siapkan data berikut:

### A. Cloudflare Turnstile
1. Buka [Cloudflare Turnstile Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile).
2. Tambahkan *site* baru.
3. Masukkan **Domain Asli** website Anda (misal: `komite-alikhlash.com`).
4. Salin **Site Key** dan **Secret Key** yang baru.

### B. Google Analytics
1. Buka [Google Analytics](https://analytics.google.com/).
2. Pastikan Anda memiliki *Property* untuk domain asli Anda.
3. Salin **Property ID** (biasanya berupa angka).

---

## 3. Persiapan Server Hostinger (hPanel)

1. **Atur Versi PHP:**
   - Masuk ke hPanel > **Website** > **Advanced** > **PHP Configuration**.
   - Pilih **PHP 8.3** dan simpan.
2. **Buat Database:**
   - Masuk ke **Databases** > **Management**.
   - Buat database MySQL baru, catat: **Database Name**, **Username**, dan **Password**.
3. **Atur Document Root (Via .htaccess):**
   - Hostinger versi terbaru tidak mengizinkan ubah *Document Root* utama. Kita akan menggunakan file `.htaccess` sebagai jembatan.
   - Buka **File Manager** Hostinger, masuk ke folder `public_html`.
   - Buat file baru bernama `.htaccess` (jangan lupa titik di depan).
   - Masukkan kode berikut lalu simpan:
     ```apache
     <IfModule mod_rewrite.c>
         RewriteEngine On
         RewriteRule ^(.*)$ public/$1 [L]
     </IfModule>
     ```

---

## 4. Mengunggah Kode & Konfigurasi (Deploy)

1. **Unggah Source Code:**
   - Cara terbaik adalah menggunakan fitur **GIT** di hPanel Hostinger untuk nge-*clone* repositori Anda langsung ke server.
   - Atau, ekstrak file zip/unggah via FileZilla ke folder `public_html`.
2. **Unggah Kredensial Google (PENTING):**
   - File ini rahasia dan tidak ada di Git. Anda harus mengunggahnya secara **manual** via File Manager hPanel.
   - Upload file 1: Ke dalam folder `storage/app/google-credentials.json`
   - Upload file 2: Ke dalam folder `storage/app/analytics/service-account-credentials.json`
3. **Buat file `.env` Produksi:**
   - Di root aplikasi (sebelah `.env.example`), buat file bernama `.env`.
   - *Copy-paste* isi dari `.env.example`, lalu ubah pengaturan krusial berikut:

```env
APP_NAME="Komite KBIT-TKIT Al-Ikhlash"
APP_ENV=production
APP_KEY=base64:... (Gunakan key yang sama dengan lokal, atau generate baru)
APP_DEBUG=false
APP_URL=https://domain-anda.com

# Database Hostinger
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=u123456_komite       # Ganti dengan nama DB Hostinger
DB_USERNAME=u123456_user         # Ganti dengan username DB Hostinger
DB_PASSWORD=password_kuat_anda   # Ganti dengan password DB Hostinger

# Konfigurasi Cache & Queue untuk Shared Hosting
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=sync            # Wajib sync, bukan database

# Cloudflare Turnstile (Produksi)
TURNSTILE_SITE_KEY=isi_dengan_site_key_produksi
TURNSTILE_SECRET_KEY=isi_dengan_secret_key_produksi
VITE_TURNSTILE_SITE_KEY=${TURNSTILE_SITE_KEY}

# Google Analytics (Produksi)
ANALYTICS_PROPERTY_ID=isi_dengan_property_id
```

---

## 5. Eksekusi Perintah Artisan (Post-Deploy)

Untuk menjalankan perintah ini, sangat disarankan menggunakan fitur **Terminal (SSH)** yang ada di hPanel Hostinger. Jika tidak ada SSH, Anda bisa membuat *Cron Job* jalankan sekali, atau menggunakan *route* bantuan.

Jalankan perintah ini secara berurutan di dalam folder aplikasi Anda:

1. **Install Dependencies (Wajib untuk Git Deploy):**
   *(Mengunduh library PHP yang tidak ikut ter-upload oleh Git)*
   ```bash
   composer install --optimize-autoloader --no-dev
   ```
2. **Generate Key (Jika belum ada):**
   ```bash
   php artisan key:generate
   ```
3. **Migrasi Database:**
   *(Membangun tabel di database baru)*
   ```bash
   php artisan migrate --force
   ```
2. **Symlink Storage:**
   *(Agar gambar/foto yang di-upload bisa diakses publik)*
   ```bash
   php artisan storage:link
   ```
3. **Optimalisasi Cache:**
   *(Membuat loading website lebih cepat)*
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

---

## 6. Pemeriksaan Terakhir (Troubleshooting)

1. **Hak Akses (Permissions):**
   Jika terjadi layar putih atau Error 500 (`Permission denied`), pastikan folder `storage/` dan `bootstrap/cache/` memiliki izin **775**. Bisa diubah via File Manager > klik kanan > Permissions.
2. **Coba Upload Gambar:** Masuk ke menu Kabar/Postingan, cobalah unggah gambar. Jika gagal, berarti `storage:link` gagal atau konfigurasi Document Root salah.
3. **Cek Login (Turnstile):** Pastikan Anda bisa login dan tidak ada error "Invalid Captcha". Jika error, berarti kunci Turnstile di `.env` belum sesuai dengan domain produksi.
4. **Cek Statistik Dashboard:** Pastikan *widget* pengunjung (Google Analytics) tidak menampilkan error. Jika error, pastikan file `service-account-credentials.json` sudah berada di jalur yang tepat.
