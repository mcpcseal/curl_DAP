let frameCount = 0;
const seed = Date.now();
const division = 40;
const zoom = 150;


function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(0);

  // generate simplex noise
  const openSimplex = openSimplexNoise(seed);
  const step = width / division;

  for (let i=0; i<division; i++){
    for(let j=0; j<division; j++){
      const pixel_x = i * step;
      const pixel_y = j * step;
      const noise_x = pixel_x / zoom;
      const noise_y = pixel_y / zoom;
      const noise_z = frameCount / 100;

      // range is -1 to 1
      const noise_value = openSimplex.noise3D(noise_x, noise_y, noise_z);
      greyscale_value = (noise_value + 1) * 128;
      
      // draw rectangle with noise value
      fill(greyscale_value);
      stroke(greyscale_value);
      rect(pixel_x, pixel_y, step, step);

      // compute curl
      const curlVector = curl(noise_x, noise_y, noise_z, openSimplex.noise3D);
      const h = curlVector.heading();

      // draw line of curl
      stroke(255);
      drawLine(pixel_x, pixel_y, step/2, h); // curl
    }
  }

  frameCount++;
}
