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
const turnsToFadeout = 3;

let currentTurn = 0;
let scoreX = 0;
let scoreO = 0;

let X_PROPERTIES = [];
let O_PROPERTIES = [];

let tic = "X";
function reset() {
  boxes.forEach((box) => {
    box.querySelector("span").textContent = "";
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
function fadeOutPerTurn(arr) {
  arr.forEach((obj) => {
    let turnAge = (currentTurn - obj.turn) / (turnsToFadeout * 2 - 1);
    let objText = document.getElementById(obj.id).querySelector("span");
    objText.style.opacity = 1 - turnAge;
    if (turnAge >= 1) {
      objText.textContent = "reached 0";
      // tic in that box becomes ""
      // opacity goes to 1
      // tic goes out of TIC_PROPERTIES
    }
    console.log(turnAge);
  });
}
function debugVisualize() {
  boxes.forEach((box) => {
    box.querySelector("span").textContent = box.id;
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
  const boxText = box.querySelector("span");
  box.addEventListener("click", () => {
    if (boxText.textContent !== "") return;
    boxText.textContent = tic;

    fadeOutPerTurn(O_PROPERTIES);
    fadeOutPerTurn(X_PROPERTIES);
    if (tic === "X") {
      boxText.classList.add("red");

      X_PROPERTIES.push({ id: Number(box.id), turn: currentTurn });
      tic = "O";
    } else {
      boxText.classList.add("blue");

      tic = "X";
      O_PROPERTIES.push({ id: Number(box.id), turn: currentTurn });
    }
    displayWhosTurn(tic);
    debugtxt.textContent = `
    O: ${O_PROPERTIES.map((obj) => obj.id)}
    X: ${X_PROPERTIES.map((obj) => obj.id)}
    turn: ${currentTurn}
    `;
    currentTurn += 1;
    let { winner, who } = checkWin();

    if (winner) handleWin(who);
  });
});

resetBtn.addEventListener("click", reset);
