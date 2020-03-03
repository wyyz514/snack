import { GAMEVIEW_DIMENSIONS } from "../Constants";
import {Setup} from './Setup';
import PubSub from '../Utilities/PubSub';
import V from "../GameView/GameView";

export default class Game {
    static _initializeCanvas() {
        const [width, height] = GAMEVIEW_DIMENSIONS;
        const canvas = document.getElementById("gameview");
        canvas.height = height;
        canvas.width = width;
        Game.context = canvas.getContext("2d");
    }

    static loop() {
        const r = Game.context;
        PubSub.emit("setSnakeDirection");
        V.render(r);
        if (!Game.break) {
            setTimeout(() => {
                V.clear(r);
                PubSub.emit("nextTick");
                Game.loop();
            }, 75);
        }
    }

    static init() {
        Game._initializeCanvas();
        PubSub.subscribe('gameover', () => {
            Game.break = true;
            alert('Game Over');
        });
        Setup();
        Game.loop();
    }
}
