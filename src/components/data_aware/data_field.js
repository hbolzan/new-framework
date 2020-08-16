import BaseComponent from "../common/base.js";

const events = {
    onChange: "onChange",
};

const isDataSet = dataSet =>
      _.isObject(dataSet) &&
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
        _.each(eventHandlers, (eventHandler) => self.events.on(
            _.keys(eventHandler)[0], _.values(eventHandler)[0]
        ));
        if (isDataSet(dataSet)) {
            // TODO: change own value on dataset change
            dataSet.onDataChange(dataset => self.events.run(events.onChange, [self, value]));
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
