const events = {
    onChange: "onChange",
};

const isDataSet = dataSet =>
      _.isObject(dataSet) &&
      _.isFunction(dataSet.onDataChange);

function DataField({ BaseComponent }, fieldDef, dataSet, eventHandlers) {
    let self = BaseComponent(events),
        value = fieldDef.default || null,
        oldValue = value;

    // TODO: value data type validation
    function setValue(newValue, source) {
        if (newValue == value) {
            return;
        }
        value = newValue;
        self.events.run(events.onChange, [self, value, source]);
    }

    function init() {
        _.each(eventHandlers, (eventHandler) => self.events.on(
            _.keys(eventHandler)[0], _.values(eventHandler)[0]
        ));
        if (isDataSet(dataSet)) {
            dataSet.onDataChange(function (ds, row) {
                if (! _.isUndefined(row)) {
                    setValue(row[self.name], ds);
                }
            });
            dataSet.afterPost(() => oldValue = value);
        }
    }
    init();

    return Object.assign(
        self,
        {
            ...fieldDef,
            fieldDef,
            dataSet,
            value: (newValue, source) => _.isUndefined(newValue) ? value : setValue(newValue, source),
            valueChanged: () => value != oldValue,
            onChange: handler => self.events.on(events.onChange, handler),
        }
    );
}

export default DataField;
