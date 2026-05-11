const express    = require("express");
const router     = express.Router();
const controller = require("../controllers/auth.controller");
const { requireLogin } = require("../middleware/auth.middleware");

// POST /api/auth/register  — daftar akun baru
router.post("/register", controller.register);

// POST /api/auth/login     — login
router.post("/login", controller.login);

// POST /api/auth/logout    — logout (butuh login)
router.post("/logout", requireLogin, controller.logout);

// GET  /api/auth/me        — cek siapa yang sedang login
router.get("/me", controller.me);

module.exports = router;