import { inputAttrs } from "./base.js";

function childInput(document, id) {
    return document.getElementById(id).querySelector("input");
}

function initValueGetterSetter({ id, self }, { document }) {
    self.value = function (newValue) {
        if (_.isUndefined(newValue)) {
            return _.get(self, "attrs.value");
        }

        _.set(self, "attrs.value", newValue);
        childInput(document, id).value = newValue || "";
        return newValue;
    };
    return self;
}

function xLookupInput(field) {
    const attrs = inputAttrs(field, { style: { cursor: "pointer" } }),
          iconAttrs = { class: ["uk-form-icon", "uk-form-icon-flip"], ukIcon: "icon: search" },
          inputHiccup = ["input", attrs],
          hiccup = ["div", { style: { width: "100%" }, private: { field, initValueGetterSetter } },
                    ["div", { class: ["uk-inline"], style: { width: "100%" } },
                     ["span", iconAttrs],
                     inputHiccup]];

    return { hiccup, inputHiccup };
}

function XLookupInput(field) {
    const view = xLookupInput(field);
    return {
        hiccup: view.hiccup,
        inputAttrs: () => view.inputHiccup[1]
    };
}

export default XLookupInput;
