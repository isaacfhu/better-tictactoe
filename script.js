const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset");
let tic = "X";

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent !== "") return;
    box.textContent = tic;
    tic = "O";
  });
});

resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => (box.textContent = ""));
});
