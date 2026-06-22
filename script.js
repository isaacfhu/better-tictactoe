const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset");
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
let tic = "X";

function debugVisualize() {
  boxes.forEach((box) => {
    box.textContent = box.id;
  });
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent !== "") return;
    box.textContent = tic;
    if (tic === "X") tic = "O";
    else tic = "X";
  });
});

resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => (box.textContent = ""));
});

debugVisualize();
