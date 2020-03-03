import Drawable from "../BaseClasses/Drawable";

export default class Square extends Drawable {
    constructor(x, y, h, w, color, stroke=false) {
        super(x, y, color);
        this.h = h;
        this.w = w;
        this.stroke = stroke;
    }

    draw(r) {
        if (this.stroke) {
            r.strokeStyle = this.color;
            r.strokeRect(this.x, this.y, this.w, this.h);
        } else {
            r.fillStyle = this.color;
            r.fillRect(this.x, this.y, this.w, this.h);
        }
    }
}
