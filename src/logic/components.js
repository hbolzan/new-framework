if (window._ == undefined) {
    window._ = require("lodash");
}

function registerEvent(event, handler, registeredEvents) {
    return Object.assign(
        {},
        registeredEvents,
        { [event]: _.get(registeredEvents, event, []).concat(handler) }
    );
}

function unregisterEvent([event, handler], registeredEvents) {
    return registeredEvents[event] ?
        Object.assign(
            {},
            registeredEvents,
            { [event]: _.filter(_.get(registeredEvents, event, []), h => h != handler) }
        ) :
        registeredEvents;
}

export { registerEvent, unregisterEvent };
