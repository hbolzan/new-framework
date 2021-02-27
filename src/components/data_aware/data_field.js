import { validationAssignments, validationAssigner } from "../../logic/data_field.js";

const events = {
    onChange: "onChange",
};

const isDataSet = dataSet =>
      _.isObject(dataSet) &&
      _.isFunction(dataSet.onDataChange);

function DataField(context, fieldDef, dataSet, eventHandlers) {
    const { BaseComponent, DataProvider, ValidationProvider } = context;
    let self = BaseComponent(events),
        value = fieldDef.default || null,
        oldValue = value;

    // TODO: value data type validation
    function setValue(newValue, source) {
        if (newValue == value) {
            return;
        }
        if ( newValue && source != dataSet && _.isFunction(self.validate)) {
            self.validate(newValue);
        }
        value = newValue;
        self.events.run(events.onChange, [self, value, source]);
    }

    function initValidation(fields) {
        if ( ! fieldDef.validation ) {
            self.validate = x => null;
            return;
        }
        const assigner = validationAssigner(validationAssignments(fieldDef.validation, fields)),
              provider = fieldDef?.validation?.source ?
                ValidationProvider(context, { resource: fieldDef?.validation?.source }) :
                null;
        self.validate = newValue => {
            console.log(newValue);
            provider.validate(fieldDef.validation, newValue)
                .then(resp => assigner(resp));
        };

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
            initValidation,
            value: (newValue, source) => _.isUndefined(newValue) ? value : setValue(newValue, source),
            valueChanged: () => value != oldValue,
            onChange: handler => self.events.on(events.onChange, handler),
        }
    );
}

export default DataField;
