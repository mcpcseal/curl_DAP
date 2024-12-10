class FlowField {
  constructor(division) {
    let seed = 0;
    this.openSimplex = openSimplexNoise(seed);
    this.zoom = 200;
    
    this.division = division;
    this.step = width / division;

    this.simplexArray = [];
    this.curlArray = [];
    this.frameCount = 0;
    this.noise_z_mult = 0.01;
  }

  setNoiseSpeed(speed) {
    this.noise_z_mult = speed * 0.0001;
  }

  setDivision(division) {
    this.division = division;
    this.step = width / division;
    this.renderCurl();
  }
  
  setZoom(zoom) {
    this.zoom = zoom;
  }

  lookupCurl(x, y) {
    let width_zone_size = width / this.division;
    let height_zone_size = height / this.division;
    
    let i = floor(x / width_zone_size);
    let j = floor(y / height_zone_size);
    let curl = this.lookupArray(i, j, this.curlArray, this.division);
    return curl;
  }

  lookupArray(i, j, array, division) {
    let index = i + j * division;
    return array[index];
  }
  
  renderCurl() {
    this.simplexArray = [];
    this.curlArray = [];
    for (let i=0; i<this.division; i++){
      for(let j=0; j<this.division; j++){
        let pixel_x = i * this.step;
        let pixel_y = j * this.step;
        let noise_x = pixel_x / this.zoom;
        let noise_y = pixel_y / this.zoom;
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
      return;
    }
    this.renderCurl();
    for (let i=0; i<this.division; i++){
      for(let j=0; j<this.division; j++){
        let pixel_x = i * this.step;
        let pixel_y = j * this.step;

        // lookup simplex noise and convert range from (-1, 1) to (0, 256)
        let noise_value = this.lookupArray(i, j, this.simplexArray, this.division);;
        let greyscale_value = (noise_value + 1) * 128;
        
        // draw rectangle with simplex value
        fill(greyscale_value);
        stroke(greyscale_value);
        rect(pixel_x, pixel_y, this.step, this.step);
      }
    }
  }

  drawLine(frameCount) {
    if (frameCount == this.frameCount){
      return;
    }
    this.renderCurl();
    for (let i=0; i<this.division; i++){
      for(let j=0; j<this.division; j++){
        // lookup curl
        let curlVector = this.lookupArray(i, j, this.curlArray, this.division);
        
        // compute pixel value
        let pixel_x = i * this.step;
        let pixel_y = j * this.step;

        // draw line of curl
        let h = curlVector.heading();
        stroke(255);
        drawArrow(pixel_x, pixel_y, this.step/2, h); // curl vector line
      }
    }
  }
}
