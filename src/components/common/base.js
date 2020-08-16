import { registerEvent, unregisterEvent } from "../../logic/components.js";

function runEvent(event, registeredEvents, args) {
    _.each(registeredEvents[event], handler => handler(...args));
}

function BaseComponent() {
    let registeredEvents = {};

    function onEvent(event, handler) {
        registeredEvents = registerEvent(event, handler, registeredEvents);
        return [event, handler];
    }

    return {
        events: {
            on: (event, handler) => onEvent(event, handler),
            off: (eventKey) => registeredEvents = unregisterEvent(eventKey, registeredEvents),
            run: (event, args) => runEvent(event, registeredEvents, args),
        },
    };
};

export default BaseComponent;
