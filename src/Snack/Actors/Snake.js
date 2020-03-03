import Square from "../../BaseActors/Square";
import Movable from "../../BaseClasses/Movable";
import PubSub from "../../Utilities/PubSub";

import { GAMEVIEW_DIMENSIONS, SQUARE, SNAKE_COLOR } from "../../Constants";

const [w, h] = GAMEVIEW_DIMENSIONS;
const [SQUARE_HEIGHT, SQUARE_WIDTH] = SQUARE;
const SQUARE_COLOR = SNAKE_COLOR;

export default class Snake extends Movable {
    constructor(x, y) {
        super(x, y);
        this.direction = "";
        this.name = "snake";
        this.head = this.addPart(x, y, SQUARE_HEIGHT, SQUARE_WIDTH, SQUARE_COLOR);
        this.subscribeControlEvents();
    }

    addPart(x, y) {
        if (!this.head) {
            this.head = {
                _o: new Square(x, y, SQUARE_HEIGHT, SQUARE_WIDTH, SQUARE_COLOR),
                next: null,
                prev: null
            };
            this.tail = this.head;
        } else {
            let part = this.tail;
            part.next = {
                _o: new Square(x, y, SQUARE_HEIGHT, SQUARE_WIDTH, SQUARE_COLOR),
                next: null,
                prev: part
            };
            this.tail = part.next;
        }
        return this.head;
    }

    draw(r) {
        let currentPart = this.head;
        while (currentPart != null) {
            currentPart._o.draw(r);
            currentPart = currentPart.next;
        }
    }

    update(delta) {
        let currentPart = this.head;
        let [x, y] = currentPart._o.getPosition();
        if (x > w) {
            currentPart._o.x = 0;
        }

        if (x < 0) {
            currentPart._o.x = w;
        }

        if (y > h) {
            currentPart._o.y = 0;
        }

        if (y < 0) {
            currentPart._o.y = h;
        }

        currentPart._o.update(delta);
        while (currentPart.next != null) {
            const nextPart = currentPart.next;
            const [nextPartX, nextPartY] = nextPart._o.getPosition();
            nextPart._o.update([x - nextPartX, y - nextPartY]);
            x = nextPartX;
            y = nextPartY;
            currentPart = nextPart;
        }
    }

    subscribeControlEvents() {
        const upEventId = `${this.name}_up`;
        const downEventId = `${this.name}_down`;
        const leftEventId = `${this.name}_left`;
        const rightEventId = `${this.name}_right`;

        PubSub.subscribe(upEventId, this.moveUp);
        PubSub.subscribe(downEventId, this.moveDown);
        PubSub.subscribe(leftEventId, this.moveLeft);
        PubSub.subscribe(rightEventId, this.moveRight);
    }

    setDirection(direction) {
        switch (direction) {
            // left
            case "LEFT":
                this.direction = this.direction !== "RIGHT" ? "LEFT" : this.direction;
                break;
            // up
            case "UP":
                this.direction = this.direction !== "DOWN" ? "UP" : this.direction;
                break;
            // right
            case "RIGHT":
                this.direction = this.direction !== "LEFT" ? "RIGHT" : this.direction;
                break;
            // down
            case "DOWN":
                this.direction = this.direction !== "UP" ? "DOWN" : this.direction;
                break;
            case "ADD":
                this.addPart(-500, -500);
                break;
            default:
                break;
        }
    }

    getNonHeadPositions() {
        let positions = [];
        let notHead = this.head.next;
        while (notHead !== null) {
            let position = notHead._o.getPosition();
            positions = positions.concat([position]);
            notHead = notHead.next;
        }
        return positions;
    }

    getPosition() {
        return this.head._o.getPosition();
    }
}
