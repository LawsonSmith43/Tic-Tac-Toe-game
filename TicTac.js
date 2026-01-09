let gameMode = "player"; 

const cells = document.querySelectorAll(".Cell");
const statusText = document.getElementById("gameStatus");

let currentPlayer = "X";
let board = ["","","","","","","","","",];
let gameActive = true;

function handleCellClick(e)
{
    const cell = e.target;
    const index = cell.dataset.index;

    if(board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    checkResult();

    if (!gameActive) return;

     
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameMode === "bot" && currentPlayer === "O")
    {
        setTimeout(botMove, 400);
    }
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

const winConditions =
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

function checkResult()
{

    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        statusText.classList.add("win");
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "Draw";
        statusText.classList.add("draw")
        gameActive = false;
    }

   

    
}

document.getElementById("reset").addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });

  statusText.textContent = "";
  statusText.classList.remove("win", "draw");
});

const playerBtn = document.getElementById("playerBtn");
const botBtn = document.getElementById("botBtn");

playerBtn.addEventListener("click", () => {
  playerBtn.classList.add("active");
  botBtn.classList.remove("active");

  // later: gameMode = "player";
});

botBtn.addEventListener("click", () => {
  botBtn.classList.add("active");
  playerBtn.classList.remove("active");

  // later: gameMode = "bot";
});

playerBtn.addEventListener("click", () =>
{
    gameMode = "player";
    playerBtn.classList.add("active");
    botBtn.classList.remove("active");
});

botBtn.addEventListener("click", () => {
    gameMode = "bot";
    botBtn.classList.add("active");
    playerBtn.classList.remove("active");
});

function botMove() {
  if (!gameActive) return;

  const emptyCells = board
    .map((value, index) => value === "" ? index : null)
    .filter(index => index !== null);

  if (emptyCells.length === 0) return;

  const randomIndex =
    emptyCells[Math.floor(Math.random() * emptyCells.length)];

  board[randomIndex] = "O";
  cells[randomIndex].textContent = "O";
  cells[randomIndex].classList.add("o");

  checkResult();

  if (gameActive) {
    currentPlayer = "X";
  }
}
