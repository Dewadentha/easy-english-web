require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");

const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 3000;

/* ================================
   MIDDLEWARE
================================ */

// CORS
app.use(cors({
  origin: [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:5500",
    "http://127.0.0.1:5500"
  ],
  credentials: true
}));

// Parse body JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  name: "ees_session",
  secret: process.env.SESSION_SECRET || "ees_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

/* ================================
   ROUTES
================================ */

app.use("/api/auth", authRoutes);

// Health check
app.get("/api/ping", (req, res) => {
  res.json({
    success: true,
    message: "EES Backend berjalan ✅"
  });
});

/* ================================
   START SERVER
================================ */

app.listen(PORT, () => {
  console.log(`🚀 EES Backend berjalan di http://localhost:${PORT}`);
  console.log(`📡 API Ping: http://localhost:${PORT}/api/ping`);
});