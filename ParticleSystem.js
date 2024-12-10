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

  draw() {
    let pole = createVector(1, 0);
    let angle = this.vel.angleBetween(pole);
    let b = angle / TWO_PI * 128 + 128;

    noStroke();
    fill(b);
    circle(this.pos.x, this.pos.y, 10);
  }
}