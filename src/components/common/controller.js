function runEvent(event, registeredEvents, args) {
    _.each(registeredEvents[event], handler => handler(...args));
}

export { runEvent };
