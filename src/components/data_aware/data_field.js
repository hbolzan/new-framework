const newValue = fieldDef => fieldDef.default || null;
const events = {
    onChange: "change",
};

// TODO: value data type validation

function DataField(fieldDef, dataSource) {
    let value = newValue(fieldDef),
        oldValue = value,
        registeredEvents = {};

    function setValue(newValue) {
        if (newValue == value) {
            return;
        }
        value = newValue();
        // dataSource.edit();
    }

    function registerEvents(event, handler) {

    }

    return {
        ...fieldDef,
        value: (newValue) => _.isUndefined(newValue) ? value : setValue(newValue),
        onChange: handler => registerEvent(events.onChange, handler)
    };
}
