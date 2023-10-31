const startBtn = document.getElementById("startgame-btn");
const table = document.getElementById("table");
const timer = document.getElementById("timer-container");
const scoreContainer = document.getElementById("score-container");
const numberContainer = document.getElementById("number");
const cells = document.querySelectorAll("td");
//πιάνω όλα τα html elements με την getElementById & τα κελιά του πίνακα με την μέθοδο querySelectorAll

let number;
let interval;
let score = 0;

startBtn.addEventListener("click", playGame);
//όταν ο χρήστης πατήσει το κουμπί καλώ την μέθοδο playGame

function displayRandomNumber() {
  let x = Math.floor(Math.random() * 7) + 3;
  numberContainer.innerText = x;
  number = x;
} //Για να βγάλω ένα τυχαίο αριθμό χρησιμοποιώ την μέθοδο math floor για να πάρω ως αποτέλεσμα μόνο ακέραιους αριθμούς
//η math random δίνει float αριθμούς  μεταξύ 0-1 (εκτός του 1 ). Για το range 3-9 : Math.floor(Math.random() * (max - min + 1)) + min

function displayNumbers() {
  cells.forEach((cell) => {
    let x = Math.floor(Math.random() * 100);
    cell.innerText = x;
  });
} // κάνω loop για γεμίσω τα κελιά του πίνακα με τυχαίους αριθμούς .

function startTimer() {
  let sec = 20;
  timer.innerText = sec;
  interval = setInterval(() => {
    sec = sec - 1;
    if (sec <= 0) {
      stopTimer();
    }
    if (sec <= 5) {
      changeBackgroundColor();
    }
    timer.innerText = sec;
  }, 1000);
} // Χρονομετρώ αντίστροφα με την setInterval (function , millisecond)

function changeBackgroundColor() {
  timer.classList = ["red-color"];
}

function stopTimer() {
  startBtn.innerText = "Start Game";
  startBtn.style.backgroundColor = "#087408";
  clearInterval(interval);
  scoreContainer.innerText = score;
  cells.forEach((cell) => {
    cell.removeEventListener("click", checkAnswer);
  });
} // όταν  ο timer φτάσει 0 καλώ την clearInterval και σταματάω  την μέτρηση  και αφαιρώ τους listeners γιατι ο χρήστης αν συνεχίσει να πατάει κουμπιά θα αλλάζουν χρώμα

function playGame() {
  stopTimer();
  startBtn.innerText = "Gaming Progress"; //αλλάζω το κουμπί εφόσον είμαι στην εξέλιξη του παιχνιδιού
  startBtn.style.backgroundColor = "orange";
  cells.forEach((cell) => {
    cell.addEventListener("click", checkAnswer);
    cell.classList = [];
  }); // τοποθετώ listeners και καλώ την checkAnswer . βάζω άδεια κλάση για να μην μείνουν οι κλασεις με τα χρωματιστά background απο προηγούμενο παιχνίδι
  score = 0; //αρχικοποιώ  το score σε  0.
  scoreContainer.innerText = score;
  displayRandomNumber();
  displayNumbers();
  startTimer();
}

function checkAnswer(event) {
  const cellNumber = parseInt(event.target.innerText);
  let modulus = cellNumber % number;
  if (modulus === 0) {
    event.target.classList = ["correct-answer"];
    score = score + 1;
  } else event.target.classList = ["incorrect-answer"];
} //με την μέθοδο parseInt μετατρέπω σε integer το περιεχόμενου του κελιού που συνέβει το event .
//Αν διαιρείται τέλεια  με τον αριθμό του οποίου ψάχνουμε τα πολλαπλάσια του δίνω την κλάση "corret-answer"(δλδ πρασινίζει το κελι) και αυξάνω τον scorer
