import { mergeAttrs } from "../../logic/hiccup.js";

function initValueGetterSetter({ id, self }, { document }) {
    self.value = function (newValue) {
        if (_.isUndefined(newValue)) {
            return _.get(self, "attrs.value");
        }
        _.set(self, "attrs.value", newValue);
        document.getElementById(id).value = newValue;
        return newValue;
    };
}

const basicInputAttrs = (field, type) => {
    return {
        class: ["uk-input"],
        type: type,
        name: field.name,
        private: { field, initValueGetterSetter },
    };
};

const inputAttrs = (field, attrs = {}, type = "text") => mergeAttrs(basicInputAttrs(field, type), attrs);

export { inputAttrs };
