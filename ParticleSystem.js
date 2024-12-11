class ParticleSystem {
  constructor(particleCount) {
    this.particleCount = particleCount;
    this.particles = [];
    this.initParticle();
  }

  initParticle() {
    for(let i=0; i<this.particleCount; i++) {
      let x = random(0, width);
      let y = random(0, height);
      this.particles.push(new Particle(x, y));
    }
  }

  applyField(flowField) {
    for (let p of this.particles) {
      let force = flowField.lookupCurl(p.pos.x, p.pos.y);
      if (force != undefined){
        force = force.copy().mult(0.07);
        p.applyForce(force);
      }
    }
  }

  update() {
    for (let p of this.particles) {
      p.update();
      p.draw();
    }
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.accel = createVector(0, 0);

    this.monoSynth = new p5.MonoSynth();
    this.lastPlayed = 0; // in milliseconds
  }

  applyForce(force) {
    this.accel.add(force);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.accel);
    this.vel.mult(0.99);
    this.vel.limit(5);
    this.accel.mult(0);
    this.computeBorder();
  }

  computeBorder() {
    if (this.pos.x > width){
      this.pos.x = 0;
    }
    if (this.pos.x < 0){
      this.pos.x = width;
    }
    if (this.pos.y > height){
      this.pos.y = 0;
    }
    if (this.pos.y < 0){
      this.pos.y = height;
    }
  }

  playNote() {
    let t = millis();
    let interval = 500;
    if (t - this.lastPlayed > interval) {
      this.lastPlayed = t;

      this.monoSynth.setADSR(0.01, 0.1);
      // pentatonic scale
      // let notes = ['A2', 'C3', 'D3', 'E3', 'G3',
      //              'A3', 'C4', 'D4', 'E4', 'G4',
      //              'A4', 'C5', 'D5', 'E5', 'G5',
      //              'A6', 'C5', 'D6', 'E6', 'G6',
      //              'A7']; 

      // major scale
      let notes = ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2',
                   'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'];
      let posIndex = floor(map(this.pos.x, 0, width, 0, notes.length)); 
      let note = notes[posIndex];

      let logMin = log(100); // log of minimum freq
      let logMax = log(10000); // log of maximum freq
      let logValue = map(this.pos.x, 0, width, logMin, logMax);
      let freq = pow(2.71828, logValue);
      // print(freq);
      
      let velocity = 1;
      let time = 0;
      let dur = 0.1;
      this.monoSynth.amp(0.1);
      // this.monoSynth.play(note, velocity, time, dur);
      this.monoSynth.play(freq, velocity, time, dur);
    }
  }

  draw() {
    let pole = createVector(1, 0);
    let angle = this.vel.angleBetween(pole);
    let rot = map(angle, 0, TWO_PI, 0, 360);
    let color = 0;

    let angle_center = 90;
    let angle_range = 30;
    let left_angle = angle_center + angle_range / 2;
    let right_angle = angle_center - angle_range / 2;
    if (rot < left_angle && rot > right_angle) {
      color = 255;
      this.playNote();
    }

    // noStroke();
    stroke(255);
    fill(color);
    circle(this.pos.x, this.pos.y, 20);
  }
}