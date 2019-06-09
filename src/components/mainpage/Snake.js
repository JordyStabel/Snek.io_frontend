export default class Snake {
  constructor(x, y, r, p) {
    this.body = [];
    this.body[0] = p.createVector(x, y);
    this.p = p;
    this.r = r;
    this.maxMag = 3;
  }

  update(x, y) {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();

    let velocity = this.p.createVector(
      x - this.p.width / 2,
      y - this.p.height / 2
    );
    velocity.setMag(3);
    head.add(velocity);
    this.body.push(head);
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.len++;
    this.body.push(head);
  }

  draw() {
    this.p.fill(0, 255, 0);
    for (let i = 0; i < this.body.length; i++) {
      this.p.circle(this.body[i].x, this.body[i].y, this.r);
    }
  }
}
