const WIDTH = 1900;
const HEIGHT = 600;

const vectorInput = [1, 2, 3, 4];
const matrixInput = addNullDelayValues([[1, 2, 3, 4], [4, 3, 2, 1], [2, 1, 3, 1], [7, 5, 6, 9]]);

let inputIndex = 0;
let processors = matrixInput.map(m => ({
  value: 0,
  ain: "null",
  uin: "null",
  uout: "null"
}));

function addNullDelayValues(inMatrix) {
  let delayNum = inMatrix.length;
  inMatrix.forEach(function(row) {
    for (let j = 1; j < delayNum; j++) row.unshift("null");
    delayNum--;
  });

  return inMatrix.reverse();
}

function step() {
  for (let i = 1; i < processors.length; i++) processors[i].uin = processors[i-1].uout;

  processors[0].uin = inputIndex < vectorInput.length ? vectorInput[inputIndex] : "null";

  for (let i = 0; i < processors.length; i++) {
    processors[i].ain = matrixInput[i][inputIndex] || "null";
    if (processors[i].ain !== "null") processors[i].value += processors[i].ain * processors[i].uin;
    processors[i].uout = processors[i].uin;
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
  text('Matrix-Vector Multiplication - Linear Array', 10, HEIGHT / 12)
  textAlign(LEFT, TOP)
  textSize(16)
  text(vectorInput.slice(inputIndex).reverse().join(), 120, HEIGHT / 2 - 10)

  processors.forEach((processor, index) => {
    const left = 50 + 200 * (index + 1), top = HEIGHT / 2 - 100;
    fill(255);
    rect(left, top, 100, 200)
    fill(0);
    textAlign(CENTER, CENTER)
    textSize(32)
    text('P' + (processors.length - 1 - index), left, top + 30, 100, 70);
    textSize(20)
    text(processor.value, left, top + 100, 100, 70);

    //noFill()
    textSize(16)
    line(left - 50, top + 100, left, top + 100)
    textAlign(RIGHT, BOTTOM);
    text(processor.uin || "null", left - 5, top + 100)

    line(left + 100, top + 100, left + 150, top + 100)
    textAlign(LEFT, BOTTOM);
    text(processor.uout || "null", left + 105, top + 100)

    line(left + 50, top - 50, left + 50, top)
    textAlign(LEFT, TOP);
    text(matrixInput[index][inputIndex - 1] || "null", left + 50, top - 50)
    textAlign(LEFT, TOP);
    text(matrixInput[index].slice(inputIndex).join(), left + 50, top - 120)
  });

  textAlign(LEFT, BOTTOM)
  textSize(18)
  text('Click to advance', WIDTH / 5, HEIGHT - 10)
}

function mouseClicked() {
  step();
}
