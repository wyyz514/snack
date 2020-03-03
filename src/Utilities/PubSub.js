const EVENTS = {};

export default class PubSub {
    static subscribe(event, fn) {
        const eventExists = Object.keys(event).includes(event);
        if (eventExists) {
            EVENTS[event] = EVENTS[event].concat(fn);
        } else {
            EVENTS[event] = [].concat(fn);
        }
        return EVENTS;
    }

    static emit(event) {
        for (const fn of EVENTS[event]) {
            fn();
        }
    }

    static unsubscribe(ev) {

    }
}
