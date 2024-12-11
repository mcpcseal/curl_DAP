// // gui setup
// let zoomSlider = document.getElementById("zoomSlider");
// let zoomValueHTML = document.getElementById("zoomValue");
// let divisionNum = document.getElementById("divisionNum");

let zoom = 100;
let division = 30;

let canvas;

let frameCount = 0;
const seed = Date.now();
let flowField;
let system;

function setup() {
  canvas = createCanvas(800, 450);
  canvas.parent("canvasContainer");

  flowField = new FlowField(division);

  let count = 20;
  system = new ParticleSystem(count);
  
  userStartAudio();
}

function draw() {
  frameCount++;
  background(0);

  flowField.setZoom(zoom);
  flowField.setDivision(division);
  flowField.setNoiseSpeed(0.2);
  
  system.update();
  system.applyField(flowField);
  // flowField.drawRect(frameCount);
  flowField.drawLine(frameCount);
}

// zoomSlider.oninput = function() {
//   zoom = zoomSlider.value;
//   zoomValueHTML.innerHTML = zoom;
//   // console.log(zoom);
// }

// divisionNum.oninput = function() {
//   division = int(divisionNum.value);
// }
