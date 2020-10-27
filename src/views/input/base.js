import { mergeAttrs } from "../../logic/hiccup.js";

function initValueGetterSetter({ id, self }, { document }) {
    self.value = function (newValue) {
        if (_.isUndefined(newValue)) {
            return _.get(self, "attrs.value");
        }

        _.set(self, "attrs.value", newValue);
        document.getElementById(id).value = newValue || "";
        return newValue;
    };
    return self;
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
