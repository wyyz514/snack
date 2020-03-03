import PubSub from "./PubSub";

export default class Controls {
    moveUp(id) {
        const EVENT_ID = `${id}_up`;
        PubSub.emit(EVENT_ID);
    }

    moveDown(id) {
        const EVENT_ID = `${id}_down`;
        PubSub.emit(EVENT_ID);
    }

    moveLeft(id) {
        const EVENT_ID = `${id}_left`;
        PubSub.emit(EVENT_ID);
    }

    moveRight(id) {
        const EVENT_ID = `${id}_right`;
        PubSub.emit(EVENT_ID);
    }
}
