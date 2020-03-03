export default class CollisionDetector {
    static checkCollision(position, otherPositions) {
        return otherPositions.reduce((prev, next) => {
            return prev || (position[0] === next[0] && position[1] === next[1]);
        }, false);
    }
}
