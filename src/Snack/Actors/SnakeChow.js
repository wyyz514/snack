import Square from "../../BaseActors/Square";
import { GAMEVIEW_DIMENSIONS, SQUARE, SNAKE_COLOR } from "../../Constants";

const [w, h] = GAMEVIEW_DIMENSIONS;
const [CHOW_H, CHOW_W] = SQUARE;
const COLOR = SNAKE_COLOR;

export default class SnakeChow extends Square {
    constructor() {
        super(-500, -500, CHOW_H, CHOW_W, COLOR, true);
        this.setRandomPosition();
    }

    setRandomPosition() {
        let x = Math.ceil(Math.random() * w);
        let xFactor = Math.floor(x / CHOW_W);
        this.x = CHOW_W * xFactor;
        let y = Math.ceil(Math.random() * h);
        let yFactor = Math.floor(y / CHOW_H);
        this.y = CHOW_H * yFactor;
    }
}
