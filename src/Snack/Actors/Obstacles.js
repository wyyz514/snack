import ObstacleFactory from "./ObstacleFactory";
import Drawable from "../../BaseClasses/Drawable";

export default class Obstacles extends Drawable {
    constructor() {
        super(null, null, null);
        this.obstacles = ObstacleFactory.generateObstacles();
    }

    getCoordinates() {
        return this.obstacles.reduce((prev, next) => {
            return prev.concat(next.occupiedCellsCoordinates);
        }, []);
    }

    draw(r) {
        for (let obstacle of this.obstacles) {
            obstacle.draw(r);
        }
    }
}
