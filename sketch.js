let frameCount = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  // generate simplex noise
  const seed = 0;
  const openSimplex = openSimplexNoise(seed);
  const zoom = 100;

  let noise_array = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      value = (openSimplex.noise3D(x / zoom, y / zoom, frameCount / 50) + 1) * 128;
      if (x % 10 == 0) {
        stroke(value);
        rect(x, y, 10, 10);
      }
      
      noise_array.push(value);
    }
  }

  const division = 20;
  for (let i=0; i<  division; i++){
    for(let j=0; j<division; j++){
      let step = width / division;
      let x = i * step;
      let y = j * step;
      let index = index2D(x, y, width);
      let value = noise_array[index];
      
      fill(value);
      stroke(255);
      // circle(x, y, step);
      let curlVector = curl(x + 1, y + 1, noise_array, width);
      let h = curlVector.heading();
      drawLine(x, y, step/2, h);
    }
  }

  frameCount++;
}
