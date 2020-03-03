const DIRECTIONS_MAP = {};

export default class DirectionsManager {
    static addDirection(movableId, direction) {
        DIRECTIONS_MAP[movableId] = DIRECTIONS_MAP[movableId] || [];
        DIRECTIONS_MAP[movableId] = DIRECTIONS_MAP[movableId].concat(direction);
    }

    static getLastEntered(movableId) {
        if (DIRECTIONS_MAP[movableId]) {
            const lastEntered = DIRECTIONS_MAP[movableId].pop();
            DIRECTIONS_MAP[movableId] = null;
            return lastEntered;
        } else {
            return "";
        }
    }
}
