let frameCount = 0;
const seed = Date.now();
const division = 40;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(0);

  // generate simplex noise
  const openSimplex = openSimplexNoise(seed);
  const zoom = 100;

  let noise_array = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      value = (openSimplex.noise3D(x / zoom, y / zoom, frameCount / 50) + 1) * 128;
      const step = width / division;
      if ((x % step == 0) && (y % step == 0)) {
        fill(value);
        stroke(value);
        rect(x, y, step, step);
      }
      
      noise_array.push(value);
    }
  }
  
  for (let i=0; i<  division; i++){
    for(let j=0; j<division; j++){
      let step = width / division;
      let x = i * step;
      let y = j * step;
      let index = index2D(x, y, width);
      let value = noise_array[index];
      
      
      let curlVector = curl(x + 1, y + 1, noise_array, width);
      let h = curlVector.heading();
      stroke(255);
      drawLine(x, y, step/2, h);
    }
  }

  frameCount++;
}
