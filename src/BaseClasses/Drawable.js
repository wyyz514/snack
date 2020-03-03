export default class Drawable {
  constructor(x, y, color = "") {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  update(delta) {
    const [dx, dy] = delta;
    this.x += dx;
    this.y += dy;
  }

  getPosition() {
    return [this.x, this.y];
  }

  draw() {
    console.log("[Drawable|Class] Please implement me :(");
  }
}

