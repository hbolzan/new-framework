import BaseComponent from "../common/base.js";
import { runEvent } from "../common/controller.js";

const events = {
    onChange: "change",
};

const isDataSet = dataSet =>
      _.isObject(dataSet) &&
      _.isFunction(dataSet.edit) &&
      _.isFunction(dataSet.afterPost);

function initialRegisteredEvents(self, dataSet) {
    return isDataSet(dataSet) ? registerEvent(events.onChange, () => dataSet.edit(), {}) : {};
}

function DataField(fieldDef, dataSet) {
    let self = BaseComponent(),
        value = fieldDef.default || null,
        oldValue = value,
        dataSetAfterPostHandler = () => oldValue = value;

    // TODO: value data type validation
    function setValue(newValue) {
        if (newValue == value) {
            return;
        }
        value = newValue;
        runEvent(events.onChange, registeredEvents, [self, value]);
    }

    function init() {
        if (isDataSet(dataSet)) {
            dataSet.afterPost(dataSetAfterPostHandler);
            self.on(events.onChange, () => dataSet.edit(), {});
        }
    }
    init();

    return Object.assign(
        self,
        {
            ...fieldDef,
            value: (newValue) => _.isUndefined(newValue) ? value : setValue(newValue),
            valueChanged: () => value != oldValue,
            onChange: handler => self.on(events.onChange, handler),
        });
}

export { DataField };
