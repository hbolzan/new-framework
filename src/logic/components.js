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

export { registerEvent };
