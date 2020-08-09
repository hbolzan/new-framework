import BaseComponent from "../common/base.js";

const events = {
    onChange: "change",
};

const isDataSet = dataSet =>
      _.isObject(dataSet) &&
      _.isFunction(dataSet.edit) &&
      _.isFunction(dataSet.afterPost);

function DataField(fieldDef, dataSet, eventHandlers) {
    let self = BaseComponent(),
        value = fieldDef.default || null,
        oldValue = value;

    // TODO: value data type validation
    function setValue(newValue) {
        if (newValue == value) {
            return;
        }
        value = newValue;
        self.events.run(events.onChange, [self, value]);
    }

    function init() {
        _.each(eventHandlers, ({ event, handler }) => self.events.on(event, handler));
        if (isDataSet(dataSet)) {
            // TODO: listen to dataset onDataChange event
            dataSet.afterPost(() => oldValue = value);
        }
    }
    init();

    return Object.assign(
        self,
        {
            ...fieldDef,
            value: (newValue) => _.isUndefined(newValue) ? value : setValue(newValue),
            valueChanged: () => value != oldValue,
            onChange: handler => self.events.on(events.onChange, handler),
        });
}

export default DataField;
