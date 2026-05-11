/* ================================
   auth.js — Login & Register (Backend API)
   Easy English Start (EES)
================================ */

const API_URL = "http://localhost:3000/api/auth";

/* ---------- LOGIN ---------- */
async function handleLogin() {
  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    showMsg("Mohon isi email dan password terlebih dahulu.", "error");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      showMsg(data.message, "error");
      return;
    }

    // Simpan data login
    localStorage.setItem(
      "ees_logged_in",
      JSON.stringify(data.user)
    );

    showMsg(data.message, "success");

    setTimeout(() => {
      const redirect =
        localStorage.getItem("ees_redirect") || "index.html";

      localStorage.removeItem("ees_redirect");
      window.location.href = redirect;
    }, 1500);

  } catch (err) {
    console.error(err);
    showMsg("Gagal terhubung ke server.", "error");
  }
}

/* ---------- REGISTER ---------- */
async function handleRegister() {
  const name     = document.getElementById("name").value.trim();
  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm  = document.getElementById("confirm").value;

  if (!name || !email || !password || !confirm) {
    showMsg("Semua field wajib diisi.", "error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showMsg("Format email tidak valid.", "error");
    return;
  }

  if (password.length < 6) {
    showMsg("Password minimal 6 karakter.", "error");
    return;
  }

  if (password !== confirm) {
    showMsg("Password dan konfirmasi tidak cocok.", "error");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      showMsg(data.message, "error");
      return;
    }

    showMsg(data.message, "success");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1800);

  } catch (err) {
    console.error(err);
    showMsg("Gagal terhubung ke server.", "error");
  }
}

/* ---------- LOGOUT ---------- */
function handleLogout() {
  localStorage.removeItem("ees_logged_in");
  window.location.href = "index.html";
}

/* ---------- PASSWORD STRENGTH ---------- */
function checkStrength(val) {
  const fill = document.getElementById("strengthFill");
  const text = document.getElementById("strengthText");

  if (!fill || !text) return;

  if (val.length === 0) {
    fill.style.width = "0%";
    text.textContent = "";
    return;
  }

  let score = 0;

  if (val.length >= 6) score++;
  if (val.length >= 10) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const levels = [
    { w: "20%",  bg: "#ef4444", label: "Sangat lemah" },
    { w: "40%",  bg: "#f97316", label: "Lemah" },
    { w: "60%",  bg: "#eab308", label: "Cukup" },
    { w: "80%",  bg: "#22c55e", label: "Kuat" },
    { w: "100%", bg: "#16a34a", label: "Sangat kuat" },
  ];

  const lvl = levels[Math.min(score - 1, 4)];

  fill.style.width = lvl.w;
  fill.style.background = lvl.bg;
  text.textContent = lvl.label;
}

/* ---------- NAVBAR DINAMIS ---------- */
function updateNavbar() {
  const user =
    JSON.parse(localStorage.getItem("ees_logged_in") || "null");

  const authNav = document.getElementById("auth-nav");

  if (!authNav) return;

  if (user) {
    authNav.innerHTML = `
      <span class="nav-user">Halo, ${user.name} 👋</span>
      <a href="#" class="nav-btn outline" onclick="handleLogout(); return false;">Logout</a>
    `;
  } else {
    authNav.innerHTML = `
      <a href="login.html" class="nav-btn">Login</a>
      <a href="register.html" class="nav-btn outline">Daftar</a>
    `;
  }
}

document.addEventListener("DOMContentLoaded", updateNavbar);

/* ---------- HELPER ---------- */
function showMsg(text, type) {
  const msg = document.getElementById("msg");

  if (!msg) return;

  msg.style.display = "none";
  msg.className = "msg";
  msg.textContent = text;
  msg.classList.add(type);
  msg.style.display = "block";
}

/* ---------- ENTER KEY SUPPORT ---------- */
document.addEventListener("keydown", function (e) {
  if (e.key !== "Enter") return;

  if (document.getElementById("confirm") !== null) {
    handleRegister();
  } else if (document.getElementById("password") !== null) {
    handleLogin();
  }
});