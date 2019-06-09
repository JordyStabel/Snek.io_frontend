export default class Ball {
  constructor(x, y, r, p) {
    this.p = p;
    this.position = p.createVector(x, y);
    this.r = r;
    this.maxMag = 3;
    this.vel = p.createVector(0, 0);
  }

  update(x, y, isServerObject) {
    let velocity;
    if (!isServerObject) {
      velocity = this.p.createVector(
        x - this.p.width / 2,
        y - this.p.height / 2
      );
      velocity.setMag(this.maxMag);
      this.position.add(velocity);
      return;
    }
    velocity = this.p.createVector(x - this.p.width / 2, y - this.p.height / 2);
    velocity.setMag(3);
    this.vel.lerp(velocity, 0.01);
    this.position.add(velocity);
    this.position.add(this.vel);
  }

  draw() {
    this.p.fill(255, 255, 0);
    this.p.circle(this.position.x, this.position.y, this.r);
  }
}
