const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset");
const scoreXdisplay = document.querySelector(".score-x");
const scoreOdisplay = document.querySelector(".score-o");
const turnTxt = document.querySelector(".turn-text");
const debugtxt = document.querySelector(".debug-text");
const winningCombinations = [
  // Rows
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
  // Columns
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [4, 8, 12, 16],
  // Diagonals
  [1, 6, 11, 16],
  [4, 7, 10, 13],
];
let turnCounter = 0;
let scoreX = 0;
let scoreO = 0;

let X_PROPERTIES = [];
let O_PROPERTIES = [];

let tic = "X";
function reset() {
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("red", "blue");
  });
  O_PROPERTIES = [];
  X_PROPERTIES = [];
  tic = "X";
}

function displayWhosTurn(str) {
  turnTxt.textContent = str;
  if (str === "O") {
    turnTxt.classList.remove("red");
    turnTxt.classList.add("blue");
  } else if (str === "X") {
    turnTxt.classList.remove("blue");
    turnTxt.classList.add("red");
  } else {
    turnTxt.classList.remove("blue", "red");
    turnTxt.classList.add("white");
  }
}

function debugVisualize() {
  boxes.forEach((box) => {
    box.textContent = box.id;
  });
}
function checkWin() {
  for (let combination of winningCombinations) {
    let xWin = combination.every((id) =>
      X_PROPERTIES.some((arr) => arr.id === id),
    );
    let oWin = combination.every((id) =>
      O_PROPERTIES.some((arr) => arr.id === id),
    );

    if (xWin === true) return { winner: true, who: "X" };
    if (oWin === true) return { winner: true, who: "O" };
  }
  return { winner: false, who: null };
}
function handleWin(who) {
  if (who === "O") {
    scoreO += 1;
    scoreOdisplay.textContent = scoreO;
    reset();
  } else if (who === "X") {
    scoreX += 1;
    scoreXdisplay.textContent = scoreX;
    reset();
  } else console.error(`${ticWinner} is NEITHER "O" NOR "X`);
}

displayWhosTurn(tic);
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent !== "") return;
    box.textContent = tic;

    if (tic === "X") {
      box.classList.add("red");

      X_PROPERTIES.push({ id: Number(box.id), turn: turnCounter });
      tic = "O";
    } else {
      box.classList.add("blue");

      tic = "X";
      O_PROPERTIES.push({ id: Number(box.id), turn: turnCounter });
    }
    displayWhosTurn(tic);
    debugtxt.textContent = `
    O: ${O_PROPERTIES}
    X: ${X_PROPERTIES}
    turn: ${turnCounter}
    `;
    turnCounter += 1;
    let { winner, who } = checkWin();

    if (winner) handleWin(who);
  });
});

resetBtn.addEventListener("click", reset);
