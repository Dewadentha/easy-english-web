# Easy English Start (EES)

Easy English Start (EES) adalah website pembelajaran bahasa Inggris sederhana berbasis HTML, CSS, JavaScript, Node.js, Express, dan MySQL.

Project ini memiliki:

* Frontend website pembelajaran
* Sistem login & register
* Backend API menggunakan Express
* Database MySQL untuk menyimpan akun user

---

# Fitur

## Frontend

* Halaman Home
* Login
* Register
* Quiz Bahasa Inggris
* Grammar Page
* Navbar dinamis
* Logout
* Password strength indicator

## Backend

* API Register
* API Login
* API Logout
* Session Login
* Koneksi MySQL
* Password hashing menggunakan bcrypt

---

# Struktur Folder

```bash
EES/
│
├── ees-backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── sql/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── ees_frontend/
    ├── index.html
    ├── login.html
    ├── register.html
    ├── grammar.html
    ├── quiz.html
    ├── style.css
    ├── auth.js
    └── script.js
```

---

# Teknologi yang Digunakan

## Frontend

* HTML5
* CSS3
* JavaScript

## Backend

* Node.js
* Express.js
* MySQL
* express-session
* bcryptjs
* cors
* dotenv

---

# Instalasi Project

## 1. Clone / Download Project

Ekstrak file project ke folder yang diinginkan.

---

# Setup Backend

Masuk ke folder backend:

```bash
cd ees-backend
```

Install dependency:

```bash
npm install
```

---

# Setup Database MySQL

Masuk ke MySQL:

```bash
mysql -u root
```

Buat database:

```sql
CREATE DATABASE ees_db;
USE ees_db;
```

Buat tabel users:

```sql
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
```

---

# Konfigurasi .env

Buat file `.env` di folder backend:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=ees_db

PORT=3000

SESSION_SECRET=ees_super_secret_key
```

---

# Menjalankan Backend

Mode development:

```bash
npm run dev
```

Mode production:

```bash
npm start
```

Jika berhasil:

```bash
🚀 EES Backend berjalan di http://localhost:3000
```

---

# Menjalankan Frontend

Gunakan Live Server di VS Code.

Jangan membuka file HTML langsung menggunakan:

```bash
file:///...
```

Karena API backend bisa gagal terhubung.

Gunakan:

```bash
http://127.0.0.1:5500
```

---

# API Endpoint

## Register

```http
POST /api/auth/register
```

Body:

```json
{
  "name": "Dentha",
  "email": "dentha@gmail.com",
  "password": "123456"
}
```

---

## Login

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "dentha@gmail.com",
  "password": "123456"
}
```

---

## Logout

```http
POST /api/auth/logout
```

---

## Check Session

```http
GET /api/auth/me
```

---

# Cara Mengecek User di Database

Masuk ke MySQL:

```bash
mysql -u root
```

Pilih database:

```sql
USE ees_db;
```

Lihat semua user:

```sql
SELECT * FROM users;
```

Atau:

```sql
SELECT id, name, email, created_at FROM users;
```

---

# Troubleshooting

## 1. npm run dev error

Install dependency:

```bash
npm install
```

---

## 2. Cannot find module

Pastikan struktur folder backend benar.

---

## 3. Gagal konek MySQL

Pastikan:

* MySQL/XAMPP aktif
* Port MySQL benar
* Database `ees_db` sudah dibuat
* File `.env` benar

---

## 4. Register berhasil tapi data tidak masuk database

Pastikan frontend sudah menggunakan fetch API ke backend, bukan localStorage.

---

# Author

Project dibuat untuk pembelajaran website dan backend authentication menggunakan Node.js + MySQL.

---

# License

Free to use for educational purposes.
