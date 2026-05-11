-- ==============================================
-- Easy English Start (EES) — Database Setup
-- Jalankan file ini SEKALI di MySQL / phpMyAdmin
-- Database: ees_db (sudah dibuat sebelumnya)
-- ==============================================

USE ees_db;

-- Tabel users
CREATE TABLE IF NOT EXISTS users (
  id         INT          NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,        -- bcrypt hash
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- (Opsional) Contoh data awal untuk testing
-- Password di bawah adalah hash bcrypt dari "test1234"
-- INSERT INTO users (name, email, password) VALUES
-- ('Admin EES', 'admin@ees.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');