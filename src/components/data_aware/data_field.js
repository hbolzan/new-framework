import BaseComponent from "../common/base.js";

const events = {
    onChange: "change",
};

const isDataSet = dataSet =>
      _.isObject(dataSet) &&
      _.isFunction(dataSet.edit) &&
      _.isFunction(dataSet.afterDelete) &&
      _.isFunction(dataSet.afterPost);

function initialRegisteredEvents(self, dataSet) {
    return isDataSet(dataSet) ? registerEvent(events.onChange, () => dataSet.edit(), {}) : {};
}

function DataField(fieldDef, dataSet) {
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
        if (isDataSet(dataSet)) {
            let dataSetAfterPostKey = dataSet.afterPost(() => oldValue = value);
            dataSet.afterDelete(() => dataSet.events.off(dataSetAfterPostKey));
            self.events.on(events.onChange, () => dataSet.edit());
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
