const bcrypt = require("bcryptjs");
const db     = require("../config/db");

/* ================================
   REGISTER
================================ */
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    console.log("REGISTER HIT");
  console.log(req.body);
    // Validasi input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Semua field wajib diisi." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Format email tidak valid." });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password minimal 6 karakter." });
    }

    // Cek apakah email sudah terdaftar
    const [existing] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: "Email sudah terdaftar. Silakan login." });
    }

    // Hash password dengan bcrypt (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru ke database
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name.trim(), email.trim().toLowerCase(), hashedPassword]
    );

    return res.status(201).json({
      success: true,
      message: "Akun berhasil dibuat! Silakan login.",
      userId: result.insertId,
    });

  } catch (err) {
    console.error("[REGISTER ERROR]", err);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
  }
}

/* ================================
   LOGIN
================================ */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email dan password wajib diisi." });
    }

    // Cari user berdasarkan email
    const [rows] = await db.query(
      "SELECT id, name, email, password FROM users WHERE email = ?",
      [email.trim().toLowerCase()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Email atau password salah." });
    }

    const user = rows[0];

    // Bandingkan password dengan hash di database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Email atau password salah." });
    }

    // Simpan data user ke session (tanpa password)
    req.session.user = {
      id:    user.id,
      name:  user.name,
      email: user.email,
    };

    return res.status(200).json({
      success: true,
      message: `Berhasil masuk! Halo, ${user.name}`,
      user: req.session.user,
    });

  } catch (err) {
    console.error("[LOGIN ERROR]", err);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
  }
}

/* ================================
   LOGOUT
================================ */
function logout(req, res) {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: "Gagal logout." });
    }
    res.clearCookie("ees_session");
    return res.status(200).json({ success: true, message: "Berhasil logout." });
  });
}

/* ================================
   ME — cek status login
================================ */
function me(req, res) {
  if (req.session && req.session.user) {
    return res.status(200).json({ success: true, user: req.session.user });
  }
  return res.status(401).json({ success: false, user: null });
}

module.exports = { register, login, logout, me };