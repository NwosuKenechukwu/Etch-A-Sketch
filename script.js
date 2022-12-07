"use strict";

const container = document.querySelector(".grid-container");
const clearBtn = document.querySelector(".clear-grids");
const eraseBtn = document.querySelector(".eraser");
const colorInput = document.querySelector(".color-code");
const setColorBtn = document.querySelector(".set-color");

const gridSize = 4;
let color = "black";
let eraserToggle = false;

for (let i = 0; i < gridSize; i++) {
  container.insertAdjacentHTML(
    "afterbegin",
    `<div class="grid-row${i}"></div>`
  );
  for (let j = 0; j < gridSize; j++) {
    document
      .querySelector(`.grid-row${i}`)
      .insertAdjacentHTML("afterbegin", `<div class="grid"></div>`);
  }
}

const grids = document.querySelectorAll(".grid");

grids.forEach((grid) => {
  grid.style.width = `${720 / gridSize}px`;
  grid.style.height = `${720 / gridSize}px`;
});

const clearGrids = function () {
  grids.forEach((grid) => {
    grid.style.backgroundColor = "white";
    eraserToggle = false;
  });
};

const eraseGrid = function () {
  !eraserToggle ? (eraserToggle = true) : (eraserToggle = false);
};

const setColor = function () {
  color = colorInput.value;
  document.documentElement.style.setProperty(`--selected`, `${color}`);
  console.log(color);
};

grids.forEach((grid) => {
  grid.addEventListener("click", function () {
    if (!eraserToggle) {
      document.documentElement.style.setProperty(`--selected`, `${color}`);
      grid.style.backgroundColor = color;
    } else {
      document.documentElement.style.setProperty(`--selected`, `white`);
      grid.style.backgroundColor = "white";
    }
  });
});

clearBtn.addEventListener("click", clearGrids);
eraseBtn.addEventListener("click", eraseGrid);
setColorBtn.addEventListener("click", setColor);
