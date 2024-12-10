let zoomSlider = document.getElementById("zoomSlider");
let zoomValueHTML = document.getElementById("zoomValue");
let divisionNum = document.getElementById("divisionNum");

let zoom = 100;
let division = 40;

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
  
}

function draw() {
  frameCount++;
  background(0);

  flowField.setZoom(zoom);
  flowField.setDivision(division);
  
  system.update();
  system.applyField(flowField);
  
   // if (frameCount % 60 < 2){
  //   flowField.setDivision(floor(random(20, 25)));
  // }
  flowField.setNoiseSpeed(0.5);
  // flowField.drawRect(frameCount);
  flowField.drawLine(frameCount);
}

zoomSlider.oninput = function() {
  zoom = zoomSlider.value;
  zoomValueHTML.innerHTML = zoom;
  // console.log(zoom);
}

divisionNum.oninput = function() {
  division = int(divisionNum.value);
}
