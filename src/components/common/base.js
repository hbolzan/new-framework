import { registerEvent, unregisterEvent } from "../../logic/components.js";

function handleEvent(event, args, handler) {
    if (_.isFunction(handler)) {
        handler(...args);
    }
}

function runEvent(event, registeredEvents, args) {
    _.each(registeredEvents[event], handler => handleEvent(event, args, handler));
}

function BaseComponent(events) {
    let registeredEvents = {};

    const eventHandlers = _.reduce(events, (handlers, event) => Object.assign(
        {},
        handlers,
        { [event]: handler => self.events.on(event, handler) }
    ), {});

    function onEvent(event, handler) {
        registeredEvents = registerEvent(event, handler, registeredEvents);
        return [event, handler];
    }

    let self = {
        events: {
            on: (event, handler) => onEvent(event, handler),
            off: (eventKey) => registeredEvents = unregisterEvent(eventKey, registeredEvents),
            run: (event, args) => runEvent(event, registeredEvents, args),
        },
    };

    return Object.assign(
        self,
        eventHandlers,
    );
};

export default BaseComponent;
