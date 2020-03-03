import Snake from '../Snack/Actors/Snake';
import SnakeChow from '../Snack/Actors/SnakeChow';
import V from '../GameView/GameView';
import PubSub from '../Utilities/PubSub';
import DirectionManager from '../Utilities/DirectionManager';
import Obstacles from '../Snack/Actors/Obstacles';
import Controls from '../Utilities/Controls';
import CollisionDetector from '../Utilities/CollisionDetector';
import {DIRECTIONS} from "../Constants";

const snake = new Snake(50, 50);
const chow = new SnakeChow();
const obstacles = new Obstacles();
const snakeControls = new Controls();

const bindDirectionManager = () => {
    document.addEventListener("keydown", function(e) {
        const keycode = e.keyCode;
        DirectionManager.addDirection(snake.name, DIRECTIONS[keycode]);
    });
};

const bindEventSubscribers = () => {
    PubSub.subscribe("nextTick", () => {
        switch (snake.direction) {
            case "UP":
                snakeControls.moveUp(snake.name);
                break;
            case "DOWN":
                snakeControls.moveDown(snake.name);
                break;
            case "RIGHT":
                snakeControls.moveRight(snake.name);
                break;
            case "LEFT":
                snakeControls.moveLeft(snake.name);
                break;
            default:
                break;
        }
        PubSub.emit("checkSnakeCollisionWithSelf");
        PubSub.emit("checkCollisionWithChow");
        PubSub.emit("checkCollisionWithObstacle");
        PubSub.emit("checkChowCollisionWithObstacle");
    });

    PubSub.subscribe("setSnakeDirection", () => {
        const lastDirection = DirectionManager.getLastEntered(snake.name);
        snake.setDirection(lastDirection);
    });

    PubSub.subscribe("checkSnakeCollisionWithSelf", () => {
        const selfCollision = CollisionDetector.checkCollision(
            snake.getPosition(),
            snake.getNonHeadPositions()
        );
        if (selfCollision) {
            PubSub.emit('gameover');
        }
    });

    PubSub.subscribe("checkCollisionWithChow", () => {
        const ateChow = CollisionDetector.checkCollision(snake.getPosition(), [
            chow.getPosition()
        ]);
        if (ateChow) {
            chow.setRandomPosition();
            snake.addPart(-500, -500);
        }
    });

    PubSub.subscribe("checkCollisionWithObstacle", () => {
        const hitObstacle = CollisionDetector.checkCollision(
            snake.getPosition(),
            obstacles.getCoordinates()
        );
        if (hitObstacle) {
            PubSub.emit('gameover');
        }
    });

    PubSub.subscribe("checkChowCollisionWithObstacle", () => {
        const hitObstacle = CollisionDetector.checkCollision(
            chow.getPosition(),
            obstacles.getCoordinates()
        );

        if (hitObstacle) {
            chow.setRandomPosition();
        }
    });
};

export const Setup = () => {
    V.addDrawable(snake);
    V.addDrawable(chow);
    V.addDrawable(obstacles);
    bindDirectionManager();
    bindEventSubscribers();
};
