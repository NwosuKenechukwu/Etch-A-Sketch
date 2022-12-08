"use strict";

const container = document.querySelector(".grid-container");
const clearBtn = document.querySelector(".clear-grids");
const eraseBtn = document.querySelector(".eraser");
const colorInput = document.querySelector(".color-code");
const setColorBtn = document.querySelector(".set-color");
const rainbowBtn = document.querySelector(".rainbow");
const gridSlider = document.querySelector(".grid-slider");
const size = document.querySelector(".size");
let gridSize = 0;

size.innerHTML = `${gridSlider.value} x ${gridSlider.value}`;
gridSize = +gridSlider.value;

let color = "black";
let eraserToggle = false;
let rainbowToggle = false;
let dragging = false;
let rainbowColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
];

const createGrids = function () {
  container.innerHTML = "";
  for (let i = 0; i < gridSize; i++) {
    container.insertAdjacentHTML(
      "afterbegin",
      `<div class="grid-row${i} "></div>`
    );
    for (let j = 0; j < gridSize; j++) {
      document
        .querySelector(`.grid-row${i}`)
        .insertAdjacentHTML(
          "afterbegin",
          `<div class="grid grid${i * gridSize + j + 1}"></div>`
        );
    }
  }

  const grids = document.querySelectorAll(".grid");

  grids.forEach((grid) => {
    grid.style.width = `${720 / gridSize}px`;
    grid.style.height = `${720 / gridSize}px`;
  });

  grids.forEach((grid) => {
    grid.addEventListener("mousedown", function () {
      dragging = true;
      if (!eraserToggle) {
        document.documentElement.style.setProperty(`--selected`, `${color}`);
        grid.style.backgroundColor = color;
      } else {
        document.documentElement.style.setProperty(`--selected`, `white`);
        grid.style.backgroundColor = "white";
      }
    });
  });

  grids.forEach((grid) => {
    grid.addEventListener("mouseup", function () {
      dragging = false;
    });
  });

  document.addEventListener("mouseup", function () {
    dragging = false;
  });

  grids.forEach((grid, i) => {
    grid.addEventListener("mouseover", function () {
      if (rainbowToggle && dragging && !eraserToggle) {
        color = rainbowColors[i % rainbowColors.length];
        grid.style.backgroundColor = color;
        document.documentElement.style.setProperty(`--selected`, `${color}`);
      } else if (dragging && !eraserToggle) {
        document.documentElement.style.setProperty(`--selected`, `${color}`);
        grid.style.backgroundColor = color;
      } else if (dragging && eraserToggle) {
        document.documentElement.style.setProperty(`--selected`, `white`);
        grid.style.backgroundColor = "white";
      }
    });
  });
};

createGrids();

const grids = document.querySelectorAll(".grid");

gridSlider.oninput = function () {
  size.innerHTML = `${this.value} x ${this.value}`;
  gridSize = +this.value;
  createGrids();
};

const rainbowTime = function () {
  if (!rainbowToggle) {
    rainbowToggle = true;
    eraserToggle = false;
    eraseBtn.style.borderStyle = "hidden";
    rainbowBtn.style.backgroundColor = "rgba(255, 255, 255, 0.893)";
    rainbowBtn.style.borderStyle = "inset";
  } else {
    rainbowToggle = false;
    rainbowBtn.style.backgroundColor = "white";
    rainbowBtn.style.borderStyle = "hidden";
  }
};

const clearGrids = function () {
  createGrids();
  eraserToggle = false;
  eraseBtn.style.borderStyle = "hidden";
};

const eraseGrid = function () {
  if (!eraserToggle) {
    eraserToggle = true;
    eraseBtn.style.backgroundColor = "rgba(255, 255, 255, 0.893)";
    eraseBtn.style.borderStyle = "inset";
  } else {
    eraserToggle = false;
    eraseBtn.style.backgroundColor = "white";
    eraseBtn.style.borderStyle = "hidden";
  }
};

const setColor = function () {
  color = colorInput.value;
  document.documentElement.style.setProperty(`--selected`, `${color}`);
  eraserToggle = false;
  rainbowToggle = false;
  eraseBtn.style.borderStyle = "hidden";
  rainbowBtn.style.borderStyle = "hidden";
};

clearBtn.addEventListener("click", clearGrids);
eraseBtn.addEventListener("click", eraseGrid);
setColorBtn.addEventListener("click", setColor);
rainbowBtn.addEventListener("click", rainbowTime);
