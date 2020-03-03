import Drawable from "./Drawable";
const UP = [0, -5];
const DOWN = [0, 5];
const LEFT = [-5, 0];
const RIGHT = [5, 0];

export default class Movable extends Drawable {
  constructor(x, y) {
    super(x, y);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }

  moveRight() {
    this.update(RIGHT);
  }

  moveLeft() {
    this.update(LEFT);
  }

  moveUp() {
    this.update(UP);
  }

  moveDown() {
    this.update(DOWN);
  }
}

