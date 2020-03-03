import { GAMEVIEW_DIMENSIONS } from "../Constants";

const [w, h] = GAMEVIEW_DIMENSIONS;

export default class GameView {
    static addDrawable(d) {
        GameView.drawables = GameView.drawables || [];
        GameView.drawables = GameView.drawables.concat(d);
    }

    static render(r) {
        GameView.drawables = GameView.drawables || [];
        for (const drawable of GameView.drawables) {
            drawable.draw(r);
        }
    }

    static clear(r) {
        r.clearRect(0, 0, w, h);
    }
}
