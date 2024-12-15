# EduTell

EduTell ini dirancang untuk menjadi solusi modern dalam mendukung pembelajaran yang inklusif, fleksibel dan terjangkau. Tujuan utama dari aplikasi ini adalah menyediakan platform pembelajaran digital yang mudah diakses oleh semua kalangan, kapan saja dan di mana saja, sehingga dapat membantu mengatasi keterbatasan akses terhadap sumber belajar berkualitas.

---

## Prerequisites

1. **Node.js**: Install [Node.js](https://nodejs.org/) (Versi LTS direkomendasikan).
2. **Composer**: Install [Composer](https://getcomposer.org/).
3. **PHP**: Pastikan PHP versi 8.0 atau di atasnya terinstall.
4. **PostgreSQL**: Pastikan Postgres versi 16.\* terinstall _(abaikan jika ingin menggunakan SQLite)_.
5. **Git**: Install Git.
6. **Composer** Pastikan Composer versi 2.8.\* terinstall.

---

## Setup

Clone repository ini

```bash
git clone https://github.com/severusDude/EduTell.git
```

### Server

1. cd ke direktori repository server

   ```bash
   cd EduTell/server
   ```

2. Install dependancies

   ```bash
   composer i

   php artisan key:generate

   php artisan jwt:secret

   php artisan storage:link
   ```

3. Set up database, pastikan database PostgreSQL sudah aktif

   ```bash
   copy .env.example .env
   ```

4. Konfigurasi environment

   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=edutell
   DB_USERNAME=postgres
   DB_PASSWORD=PASSWORD PostgreSQL
   ```

   > Sesuaikan konfigurasi `.env` Jika menggunakan database yang lain (SQLite/MySQL)

5. Jalankan migrasi dan server

   ```bash
   php artisan migrate --seed

   php artisan serve
   ```

### Client

1. cd ke direktori repository client

   ```bash
   cd EduTell/client
   ```

2. Install dependancies

   ```bash
   npm i
   ```

3. Jalankan server

   ```bash
   npm run dev
   ```

Aplikasi bisa diakses pada url `https://localhost:3000/`
