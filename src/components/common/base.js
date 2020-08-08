import { registerEvent, unregisterEvent } from "../../logic/components.js";

function BaseComponent() {
    let registeredEvents = {};

    function onEvent(event, handler) {
        registeredEvents = registerEvent;
        return [event, handler];
    }

    return {
        on: (event, handler) => onEvent(event, handler),
        off: (eventKey) => registeredEvents = unregisterEvent(eventKey, registeredEvents),
    };
};

export default BaseComponent;
