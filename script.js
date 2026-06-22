const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset");
const scoreX = document.querySelector(".score-x");
const scoreO = document.querySelector(".score-o");
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
let X_PROPERTIES = [];
let O_PROPERTIES = [];

let tic = "X";
function reset() {
  boxes.forEach((box) => {
    box.textContent = "";
  });
  O_PROPERTIES = [];
  X_PROPERTIES = [];
  tic = "X";
}
function debugVisualize() {
  boxes.forEach((box) => {
    box.textContent = box.id;
  });
}
function checkWin() {
  for (let combination of winningCombinations) {
    let xWin = combination.every((id) => X_PROPERTIES.includes(id));
    let oWin = combination.every((id) => O_PROPERTIES.includes(id));

    if (xWin === true) return { winner: true, who: "X" };
    if (oWin === true) return { winner: true, who: "O" };
  }
  return { winner: false, who: null };
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent !== "") return;
    box.textContent = tic;

    if (tic === "X") {
      X_PROPERTIES.push(box.id);
      tic = "O";
    } else {
      tic = "X";
      O_PROPERTIES.push(box.id);
    }

    debugtxt.textContent = `
    O: ${O_PROPERTIES}
    X: ${X_PROPERTIES}
    `;

    let winner,
      ticWinner = checkWin();

    if (winner) {
    }
  });
});

resetBtn.addEventListener("click", reset);
