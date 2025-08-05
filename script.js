const choices = document.querySelectorAll(".choice");
const resultSection = document.getElementById("result");
const choiceSection = document.getElementById("choices");
const userPicked = document.getElementById("user-picked");
const pcPicked = document.getElementById("pc-picked");
const resultMessage = document.getElementById("result-message");
const userScoreEl = document.getElementById("user-score");
const compScoreEl = document.getElementById("computer-score");
const playAgainBtn = document.getElementById("play-again");
const rulesBtn = document.getElementById("rules-btn");
const rulesModal = document.getElementById("rules");
const closeRules = document.getElementById("close-rules");
const nextBtn = document.getElementById("next-btn");
const hurraySection = document.getElementById("hurray");
const playAgainHurrayBtn = document.getElementById("play-again-hurray");
const header = document.querySelector(".header");

let userScore = 0;
let compScore = 0;

if (localStorage.getItem("userScore")) {
  userScore = parseInt(localStorage.getItem("userScore"));
  userScoreEl.textContent = userScore;
}
if (localStorage.getItem("compScore")) {
  compScore = parseInt(localStorage.getItem("compScore"));
  compScoreEl.textContent = compScore;
}

const options = ["rock", "paper", "scissors"];
const icons = {
  rock: "assets/rock.svg",
  paper: "assets/paper.svg",
  scissors: "assets/scissor.svg",
};
const colors = {
  rock: "#0074B6",
  paper: "#ffa943",
  scissors: "#bd00ff",
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.dataset.choice;
    const pcChoice = options[Math.floor(Math.random() * 3)];
    showResult(userChoice, pcChoice);
  });
});

function showResult(user, pc) {
  choiceSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  userPicked.className = "picked-circle";
  pcPicked.className = "picked-circle";

  userPicked.innerHTML = `<img src="${icons[user]}" alt="${user}">`;
  pcPicked.innerHTML = `<img src="${icons[pc]}" alt="${pc}">`;

  userPicked.style.borderColor = colors[user];
  pcPicked.style.borderColor = colors[pc];

  let result;
  if (user === pc) {
    result = "TIE UP";
    nextBtn.classList.add("hidden");
  } else if (
    (user === "rock" && pc === "scissors") ||
    (user === "paper" && pc === "rock") ||
    (user === "scissors" && pc === "paper")
  ) {
    result = "YOU WIN";
    userScore++;
    userPicked.classList.add("winner");
    nextBtn.classList.remove("hidden");
  } else {
    result = "YOU LOST";
    compScore++;
    pcPicked.classList.add("winner");
    nextBtn.classList.add("hidden");
  }

  // Update UI
  resultMessage.textContent = result;
  userScoreEl.textContent = userScore;
  compScoreEl.textContent = compScore;

  // Save to localStorage
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("compScore", compScore);
}

playAgainBtn.addEventListener("click", () => {
  resultSection.classList.add("hidden");
  choiceSection.classList.remove("hidden");
});

nextBtn.addEventListener("click", () => {
  header.classList.add("hidden");
  resultSection.classList.add("hidden");
  hurraySection.classList.remove("hidden");
  nextBtn.classList.add("hidden");
});

playAgainHurrayBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScoreEl.textContent = 0;
  compScoreEl.textContent = 0;

  localStorage.removeItem("userScore");
  localStorage.removeItem("compScore");

  header.classList.remove("hidden");
  hurraySection.classList.add("hidden");
  choiceSection.classList.remove("hidden");
});

rulesBtn.addEventListener("click", () => rulesModal.classList.remove("hidden"));
closeRules.addEventListener("click", () => rulesModal.classList.add("hidden"));
