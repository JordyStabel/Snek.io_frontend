export default class Trail {
  constructor(x, y, r, p) {
    this.pos = p.createVector(x, y);
    this.r = r;
    this.p = p;
    this.history = [];
  }

  update(x, y) {
    let velocity = this.p.createVector(
      x - this.p.width / 2,
      y - this.p.height / 2
    );
    velocity.setMag(3);
    //this.vel.lerp(velocity, 0.01);
    this.pos.add(velocity.x);
    //this.position.add(this.vel);

    this.history.push(this.pos);
    if (this.history.length > 125) {
      this.history.shift();
    }
  }

  draw() {
    this.p.fill(0, 255, 255);
    for (let i = 0; i < this.history.length; i++) {
      this.p.circle(this.history[i].x, this.history[i].y, this.r);
    }
    this.p.circle(this.pos.x, this.pos.y, this.r);
  }
}
