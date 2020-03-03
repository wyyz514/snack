import Drawable from "../../BaseClasses/Drawable";
import Square from "../../BaseActors/Square";
import { GAMEVIEW_DIMENSIONS, SQUARE } from "../../Constants";

// should move to constants file
const BLOCK_DIMENSION = 5;
const [w, h] = GAMEVIEW_DIMENSIONS;

class Obstacle extends Drawable {
    constructor(offsetX, offsetY, color, height, width, direction) {
        super(offsetX, offsetY, color);
        this.height = height;
        this.width = width;
        this.occupiedCells = this.getCellsToOcupy(direction, height, width);
        this.occupiedCellsCoordinates = this.occupiedCells.map(cell => {
            return [cell.x, cell.y];
        });
    }

    getCellsToOcupy(direction = "V", height = 3, width = 3) {
        let x_max = 0;
        let y_max = 0;
        let cells = [];

        switch (direction) {
            case "V":
                x_max =
                    this.x + BLOCK_DIMENSION * height > h
                        ? h - 50
                        : this.x + BLOCK_DIMENSION * height;
                y_max =
                    this.y + BLOCK_DIMENSION * width > w
                        ? w - 50
                        : this.y + BLOCK_DIMENSION * width;
                break;
            case "H":
                x_max =
                    this.x + BLOCK_DIMENSION * width > w
                        ? w - 50
                        : this.x + BLOCK_DIMENSION * width;
                y_max =
                    this.y + BLOCK_DIMENSION * height > h
                        ? h - 50
                        : this.y + BLOCK_DIMENSION * height;
                break;
            default:
                break;
        }
        for (let x = this.x; x <= x_max; x += BLOCK_DIMENSION) {
            for (let y = this.y; y <= y_max; y += BLOCK_DIMENSION) {
                cells.push(
                    new Square(x, y, BLOCK_DIMENSION, BLOCK_DIMENSION, this.color)
                );
            }
        }

        return cells;
    }

    draw(r) {
        for (let cell of this.occupiedCells) {
            cell.draw(r);
        }
    }
}

export default class ObstacleFactory {
    static generateObstacles() {
        const obstacles = [];
        const numberOfObstacles = 15;
        for (let i = 0; i < numberOfObstacles; i++) {
            const correctMultipleX = Math.floor((Math.random() * w) / BLOCK_DIMENSION);
            const correctMultipleY = Math.floor((Math.random() * h) / BLOCK_DIMENSION);
            const height = Math.ceil(Math.random() * 20);
            const width = Math.ceil(Math.random() * 20);
            const offsetX = correctMultipleX * BLOCK_DIMENSION;
            const offsetY = correctMultipleY * BLOCK_DIMENSION;
            const direction = Math.ceil(Math.random() * 10) < 5 ? "V" : "H";
            obstacles.push(
                new Obstacle(offsetX, offsetY, "wheat", height, width, direction)
            );
        }
        return obstacles;
    }
}
