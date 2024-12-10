class FlowField {
  constructor(division) {
    let seed = 0;
    this.openSimplex = openSimplexNoise(seed);
    
    this.division = division;
    this.step = width / division;

    this.simplexArray = [];
    this.curlArray = [];
    this.frameCount = 0;
    this.noise_z_mult = 0.01;
  }

  setNoiseSpeed(speed) {
    this.noise_z_mult = speed * 0.01;
  }

  setDivision(division) {
    this.division = division;
    this.step = width / division;
    this.renderCurl();
  }

  lookup(x, y, array, division) {
    let i = x + y * division;
    return array[i]
  }
  
  renderCurl() {
    this.simplexArray = [];
    this.curlArray = [];
    for (let i=0; i<this.division; i++){
      for(let j=0; j<this.division; j++){
        let pixel_x = i * this.step;
        let pixel_y = j * this.step;
        let noise_x = pixel_x / zoom;
        let noise_y = pixel_y / zoom;
        let noise_z = frameCount * this.noise_z_mult;
  
        // compute noise, range is -1 to 1
        let noise_value = this.openSimplex.noise3D(noise_x, noise_y, noise_z);
        this.simplexArray.push(noise_value);
  
        // compute curl
        let curlVector = curl(noise_x, noise_y, noise_z, this.openSimplex.noise3D);
        this.curlArray.push(curlVector);
      }
    }
  }
  
  drawRect(frameCount) {
    if (frameCount == this.frameCount){
      return
    }
    this.renderCurl();
    for (let i=0; i<this.division; i++){
      for(let j=0; j<this.division; j++){
        let pixel_x = i * this.step;
        let pixel_y = j * this.step;

        // lookup simplex noise and convert range from (-1, 1) to (0, 256)
        let noise_value = this.lookup(i, j, this.simplexArray, this.division);;
        let greyscale_value = (noise_value + 1) * 128;
        
        // draw rectangle with simplex value
        fill(greyscale_value);
        stroke(greyscale_value);
        rect(pixel_x, pixel_y, this.step, this.step);
      }
    }
  }

  drawLine(frameCount){
    if (frameCount == this.frameCount){
      return
    }
    this.renderCurl();
    for (let i=0; i<this.division; i++){
      for(let j=0; j<this.division; j++){
        // lookup curl
        let curlVector = this.lookup(i, j, this.curlArray, this.division);
        
        // compute pixel value
        let pixel_x = i * this.step;
        let pixel_y = j * this.step;

        // draw line of curl
        let h = curlVector.heading();
        stroke(255);
        drawLine(pixel_x, pixel_y, this.step/2, h); // curl vector line
      }
    }
  }
}
