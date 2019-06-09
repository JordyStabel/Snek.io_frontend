export default class Ball {
  constructor(x, y, r, p) {
    this.p = p;
    this.position = p.createVector(x, y);
    this.r = r;
    this.maxMag = 3;
    this.vel = p.createVector(0, 0);
  }

  update(x, y) {
    let velocity = this.p.createVector(x, y);
    velocity.setMag(this.maxMag);
    this.vel.lerp(velocity, 0.05);
    this.position.add(this.vel);
  }

  draw() {
    this.p.fill(255, 255, 0);
    this.p.circle(this.position.x, this.position.y, this.r);
  }
}
