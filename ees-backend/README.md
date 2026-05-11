# EES Backend — Easy English Start

Backend API untuk website EES menggunakan **Node.js + Express + MySQL**.

---

## Struktur Folder

```
ees-backend/
├── config/
│   ├── db.js          # Koneksi MySQL (pool)
│   └── init.sql       # Script SQL buat tabel (jalankan sekali)
├── controllers/
│   └── auth.controller.js   # Logika register, login, logout
├── middleware/
│   └── auth.middleware.js   # Proteksi route (cek session)
├── routes/
│   └── auth.routes.js       # Definisi endpoint /api/auth
├── .env                     # Konfigurasi (JANGAN di-commit ke git)
├── .env.example             # Template .env
├── package.json
└── server.js                # Entry point
```

---

## Cara Setup

### 1. Siapkan Database MySQL

Buka MySQL / phpMyAdmin, lalu jalankan file `config/init.sql`:

```sql
USE ees_db;

CREATE TABLE IF NOT EXISTS users (
  id         INT          NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 2. Isi file `.env`

Salin `.env.example` menjadi `.env` lalu sesuaikan:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password_mysql_kamu
DB_NAME=ees_db

PORT=3000

SESSION_SECRET=ganti_dengan_string_acak_panjang
```

### 3. Install dependencies

```bash
cd ees-backend
npm install
```

### 4. Jalankan server

```bash
# Mode production
npm start

# Mode development (auto-restart saat file berubah)
npm run dev
```

Server berjalan di: `http://localhost:3000`

### 5. Test koneksi

Buka browser atau Postman:
```
GET http://localhost:3000/api/ping
```
Harusnya muncul: `{ "success": true, "message": "EES Backend berjalan ✅" }`

---

## Endpoint API

| Method | Endpoint              | Deskripsi                        | Auth? |
|--------|-----------------------|----------------------------------|-------|
| POST   | `/api/auth/register`  | Daftar akun baru                 | ❌    |
| POST   | `/api/auth/login`     | Login                            | ❌    |
| POST   | `/api/auth/logout`    | Logout                           | ✅    |
| GET    | `/api/auth/me`        | Cek siapa yang sedang login      | ❌    |
| GET    | `/api/ping`           | Health check server              | ❌    |

### Contoh Request

**Register:**
```json
POST /api/auth/register
{
  "name": "Budi Santoso",
  "email": "budi@email.com",
  "password": "rahasia123"
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "budi@email.com",
  "password": "rahasia123"
}
```

---

## Struktur Proyek Lengkap

Setelah backend digabung, struktur folder proyek keseluruhan:

```
easy-english-start/         ← folder frontend (file HTML)
├── index.html
├── grammar.html
├── quiz.html
├── login.html
├── register.html
├── style.css
├── script.js
├── auth.js
└── logo.png

ees-backend/                ← folder backend (Node.js)
├── config/
├── controllers/
├── middleware/
├── routes/
├── .env
├── package.json
└── server.js
```

---

## Catatan

- Password disimpan sebagai **bcrypt hash** (aman, tidak plain text)
- Session disimpan di memori server (untuk production, gunakan `express-session` + MySQL store)
- CORS sudah dikonfigurasi untuk `localhost` dan Live Server VS Code (port 5500)
- Jika frontend diakses dari port lain, tambahkan di `server.js` bagian `cors({ origin: [...] })`