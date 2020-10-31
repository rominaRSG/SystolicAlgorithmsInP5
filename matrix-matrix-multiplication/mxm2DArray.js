const WIDTH = 1900;
const HEIGHT = 600;

const matrixInput1 = [[1, 2, 5], [4, 3, 1], [2, 2, 2]];
const matrixInput2 = [[1, 2, 6], [4, 3, 2], [1, 1, 1]];
const matrixInputA = addNullDelayValues(matrixInput1);
const matrixInputB = addNullDelayValues2(matrixInput2);

let inputIndex = 0;
let processors = new Array(matrixInput1.length).fill(null).map(m => (new Array(matrixInput2[0].length).fill(null).map(m => ({
  value: 0,
  ain: "null",
  bin: "null",
  aout: "null",
  bout: "null"
}))));

function addNullDelayValues(inMatrix) {
  let delayNum = inMatrix.length;
  inMatrix.forEach(function(row) {
    for (let j = 1; j < delayNum; j++) row.unshift("null");
    delayNum--;
  });

  return inMatrix;
}

function addNullDelayValues2(inMatrix) {
  let delayNum = inMatrix.length;
  //transpose matrix
  inMatrix = inMatrix[0].map((col, i) => inMatrix.map(row => row[i]));

  inMatrix.forEach(function(row) {
    for (let j = 1; j < delayNum; j++) row.unshift("null");
    delayNum--;
  });

  return inMatrix;
}

function step() {
  for (let i = processors.length - 1; i >= 0; i--) {
    for (let j = processors[0].length - 1; j >= 0; j--) {
      if (j !== processors[0].length - 1) processors[i][j].ain = processors[i][j+1].aout;
      if (i !== processors.length - 1) processors[i][j].bin = processors[i+1][j].bout;
    }
  }

  for (let i = 0; i < processors.length; i++) processors[i][processors[0].length - 1].ain = matrixInputA[i][inputIndex] || "null";
  for (let j = 0; j < processors[0].length; j++) processors[processors.length - 1][j].bin = matrixInputB[j][inputIndex] || "null";

  for (let i = processors.length - 1; i >= 0; i--) {
    for (let j = processors[0].length - 1; j >= 0; j--) {
      if (processors[i][j].ain !== "null" || processors[i][j].bin !== "null") processors[i][j].value += processors[i][j].ain * processors[i][j].bin;
      processors[i][j].aout = processors[i][j].ain;
      processors[i][j].bout = processors[i][j].bin;
    }
  }

  inputIndex++;
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  clear();
  textAlign(LEFT, BOTTOM)
  textSize(32)
  text('Matrix-Matrix Multiplication - 2D Array', 10, HEIGHT / 12)
  textAlign(LEFT, TOP)
  textSize(16)
  processors.forEach((rowProcessors, iIndex) => {
    rowProcessors.forEach((processor, jIndex) => {
      const left = 250 + 100 * (jIndex + 1), top = (HEIGHT / 2 - 150) * (iIndex + 1);
      fill(255);
      rect(left, top, 50, 50)
      fill(0);
      textAlign(CENTER, CENTER)
      textSize(16)
      text('P' + iIndex + "," + jIndex, left + 20, top + 20);
      textSize(13)
      text(processor.value, left + 20, top + 40);

      // noFill()
      textSize(13)
      line(left - 50, top + 25, left, top + 25)
      textAlign(RIGHT, BOTTOM);
      text(processor.aout || "null", left - 3, top + 25)

      line(left + 50, top + 25, left + 100, top + 25)
      textAlign(LEFT, BOTTOM);
      text(processor.ain || "null", left + 53, top + 25)

      line(left + 25, top, left + 25, top - 50)
      textAlign(RIGHT, BOTTOM);
      text(processor.bout || "null", left + 23, top - 3)

      line(left + 25, top + 50, left + 25, top + 100)
      textAlign(RIGHT, TOP);
      text(processor.bin || "null", left + 23, top + 53)

      if (iIndex == processors.length - 1) {
        textAlign(LEFT, TOP);
        text(matrixInputB[jIndex].slice(inputIndex).join(), left + 20, top + 120)
      }

      if (jIndex == processors[0].length - 1) {
        textAlign(LEFT, TOP);
        text(matrixInputA[iIndex].slice(inputIndex).join(), left + 150, top + 20)
      }
    });
  });

  textAlign(LEFT, BOTTOM)
  textSize(18)
  text('Click to advance', WIDTH / 10, HEIGHT)
}

function mouseClicked() {
  step();
}
