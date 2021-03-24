import { mergeAttrs } from "../../logic/hiccup.js";

function initValueGetterSetter({ id, self }, { document }, valueChangedHandler) {

    self.value = function (newValue, dataField, dataset) {
        if (_.isUndefined(newValue)) {
            return _.get(self, "attrs.value");
        }
        return setValue(document.getElementById(id), newValue, dataField);
    };

    function setValue(el, newValue, dataField) {
        _.set(self, "attrs.value", newValue);
        el.value = displayValue(newValue, dataField) || "";
        if (_.isFunction(valueChangedHandler)) {
            valueChangedHandler(newValue, el);
        }
        return newValue;
    }

    return self;
}

function displayValue(newValue, dataField) {
    const displayField = dataField?.xLookup?.displayField,
          dataSet = dataField?.dataSet;
    return displayField && dataSet ? dataSet?.selectedRow()[displayField] : newValue;
}

const basicInputAttrs = (field, type) => {

    return Object.assign(
        {
            class: ["uk-input"],
            type: type,
            name: field.name,
            private: { field, initValueGetterSetter },
        },
        field.attrs ? field.attrs : {},
    );
};

const inputAttrs = (field, attrs = {}, type = "text") => mergeAttrs(basicInputAttrs(field, type), attrs);

export { initValueGetterSetter, inputAttrs };
