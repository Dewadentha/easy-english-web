/* ================================
   script.js — Quiz logic + login guard
   Easy English Start (EES)
================================ */

/* ---------- CEK LOGIN ---------- */
const currentUser = JSON.parse(localStorage.getItem("ees_logged_in") || "null");

if (!currentUser) {
  // Simpan halaman tujuan, lalu redirect ke login
  localStorage.setItem("ees_redirect", "quiz.html");
  alert("Kamu harus login dulu untuk mengakses Quiz!");
  window.location.href = "login.html";
}

/* ---------- DATA SOAL ---------- */
let questions = [
  { q: "She ___ a teacher.",        a: ["am", "is", "are"],             correct: "is"      },
  { q: "I ___ a student.",          a: ["am", "is", "are"],             correct: "am"      },
  { q: "They ___ friends.",         a: ["am", "is", "are"],             correct: "are"     },
  { q: "We ___ happy.",             a: ["am", "is", "are"],             correct: "are"     },
  { q: "He ___ my brother.",        a: ["am", "is", "are"],             correct: "is"      },
  { q: "I ___ football every day.", a: ["play", "plays", "playing"],    correct: "play"    },
  { q: "She ___ piano.",            a: ["play", "plays", "playing"],    correct: "plays"   },
  { q: "They ___ English.",         a: ["study", "studies", "studying"], correct: "study"  },
  { q: "He ___ to school.",         a: ["go", "goes", "going"],         correct: "goes"    },
  { q: "We ___ books.",             a: ["read", "reads", "reading"],    correct: "read"    },
];

let current  = 0;
let score    = 0;
let wrong    = 0;
let answered = false;

/* ---------- LOAD SOAL ---------- */
function loadQuestion() {
  answered = false;

  const q = questions[current];

  document.getElementById("question").innerHTML =
    `Question ${current + 1}/${questions.length}<br>${q.q}`;

  let html = "";
  q.a.forEach(ans => {
    html += `<button class="answerBtn" onclick="selectAnswer('${ans}', this)">${ans}</button>`;
  });

  document.getElementById("answers").innerHTML = html;
  document.getElementById("score").innerHTML   = "";
}

/* ---------- PILIH JAWABAN ---------- */
function selectAnswer(answer, btn) {
  if (answered) return;
  answered = true;

  const correct = questions[current].correct;
  const buttons = document.querySelectorAll(".answerBtn");

  buttons.forEach(b => {
    if (b.innerText === correct) {
      b.style.background = "#22c55e";
      b.style.color      = "white";
      b.classList.add("correct");
    }
    if (b.innerText === answer && answer !== correct) {
      b.style.background = "#ef4444";
      b.style.color      = "white";
      b.classList.add("wrong");
    }
  });

  if (answer === correct) { score++; } else { wrong++; }
}

/* ---------- NEXT SOAL ---------- */
function nextQuestion() {
  if (!answered) {
    alert("Pilih jawaban dulu!");
    return;
  }

  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("question").innerHTML  = "🎉 Quiz Finished!";
    document.getElementById("answers").innerHTML   = "";
    document.getElementById("score").innerHTML     =
      `Score: ${score}/${questions.length}<br>Benar: ${score}<br>Salah: ${wrong}`;
    document.getElementById("nextBtn").style.display = "none";
  }
}

window.onload = loadQuestion;