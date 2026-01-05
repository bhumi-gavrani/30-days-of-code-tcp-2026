const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turn");
const resultText = document.getElementById("result");
const boardEl = document.getElementById("board");
const resetBtn = document.getElementById("reset");

let board = Array(9).fill("");
let player = "X";
let active = true;

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", () => play(cell));
});

resetBtn.onclick = reset;

function play(cell) {
  const i = cell.dataset.i;
  if (!active || board[i]) return;

  board[i] = player;
  cell.classList.add(player);

  if (checkWin()) return;
  if (board.every(v => v)) return draw();

  player = player === "X" ? "O" : "X";
  turnText.textContent = `Player ${player}'s Turn`;
}

function checkWin() {
  for (let combo of wins) {
    if (combo.every(i => board[i] === player)) {
      combo.forEach(i => cells[i].classList.add("win"));
      resultText.textContent = `🏆 Player ${player} Wins the Arena!`;
      active = false;
      return true;
    }
  }
  return false;
}

function draw() {
  boardEl.classList.add("draw");
  resultText.textContent = "🤝 Arena Draw!";
  active = false;
}

function reset() {
  board = Array(9).fill("");
  player = "X";
  active = true;

  resultText.textContent = "";
  turnText.textContent = "Player X's Turn";

  boardEl.classList.remove("draw");

  cells.forEach(cell => {
    cell.classList.remove("X", "O", "win");
  });
}

resetBtn.addEventListener("click", reset);

