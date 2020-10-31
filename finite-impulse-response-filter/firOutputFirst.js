const WIDTH = 1200;
const HEIGHT = 600;

const coeffs = [1, 2, 3, 1];
const xInput = [1, 2, 3, 4, 5, 6];
const outputSignal = [];

let inputIndex = 0;
let cells = coeffs.map(c => ({
  coef: c,
  xIn: 0,
  yIn: 0,
  yOut: 0,
  xDelay: 0,
  yDelay: 0
}));

function step() {
  for (let i = cells.length - 1; i > 0; i--) {
    cells[i].xDelay = cells[i].xIn;
    cells[i].xIn = cells[i-1].xDelay;
    cells[i].yIn = cells[i-1].yOut;
  }

  cells[0].yIn = 0;
  cells[0].xDelay = cells[0].xIn !== null ? cells[0].xIn : null;
  cells[0].xIn = inputIndex < xInput.length ? xInput[inputIndex] : null;

  for (let i = 0; i < cells.length; i++) {
    cells[i].yOut = cells[i].yIn + cells[i].xIn * cells[i].coef;
  }

  inputIndex++;
  outputSignal.push(cells[cells.length-1].yOut);
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  clear();
  textAlign(LEFT, BOTTOM)
  textSize(32)
  text('XInput', 10, HEIGHT / 2 + 80)
  textAlign(LEFT, TOP)
  textSize(16)
  text(xInput.slice(inputIndex).reverse().join(), 10, HEIGHT / 2 + 80)

  textSize(32)
  text('YOutput', 10, HEIGHT / 2 - 100)
  textAlign(LEFT, TOP)
  textSize(16)
  text(0, 10, HEIGHT / 2 - 70)

  textAlign(RIGHT, BOTTOM)
  textSize(32)
  text('Output', WIDTH - 200, HEIGHT / 2 + 200)
  textAlign(RIGHT, TOP)
  textSize(16)
  text(outputSignal.join(), WIDTH - 200, HEIGHT / 2 + 220)

  cells.forEach((cell, index) => {
    const left = 50 + 200 * (index + 1), top = HEIGHT / 2 - 100;
    fill(255);
    rect(left, top, 100, 200)
    fill(0);
    textAlign(CENTER, CENTER)
    textSize(32)
    text('P' + index, left, top + 30, 100, 70);
    textSize(20)
    text(cell.coef, left, top + 100, 100, 70);

    //noFill()
    textSize(16)
    line(left - 50, top + 30, left, top + 30)
    if (cell.yIn !== null) {
      textAlign(RIGHT, BOTTOM);
      text(cell.yIn, left + 50, top - 10)
    }
    line(left - 50, top + 170, left, top + 170)
    if (cell.xIn !== null) {
      textAlign(RIGHT, BOTTOM);
      text(cell.xIn, left + 50, top + 230)
    }
    line(left + 100, top + 30, left + 150, top + 30)
    if (cell.yOut !== null) {
      textAlign(LEFT, BOTTOM);
      text(cell.yOut, left + 105, top + 30)
    }
    line(left + 100, top + 170, left + 150, top + 170)
    if (cell.xDelay !== null) {
      textAlign(LEFT, BOTTOM);
      text(cell.xDelay, left + 145, top + 230)
    }
    if (index > 0) {
      rect(left - 55, top + 20, 10, 20);
      rect(left - 35, top + 160, 10, 20);
      rect(left - 75, top + 160, 10, 20);
    }
  });

  textAlign(CENTER, BOTTOM)
  textSize(18)
  text('Click to advance', WIDTH / 2, HEIGHT - 10)
}

function mouseClicked() {
  step();
}
