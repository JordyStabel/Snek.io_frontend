export default class Ball {
  constructor(x, y, r, p) {
    this.p = p;
    this.position = p.createVector(x, y);
    this.r = r;
    this.maxMag = 3;
  }

  update(x, y) {
    let velocity = this.p.createVector(
      x - this.p.width / 2,
      y - this.p.height / 2
    );
    velocity.setMag(this.maxMag);
    this.position.add(velocity);
  }

  draw() {
    this.p.fill(255);
    this.p.circle(this.position.x, this.position.y, this.r);
  }
}
