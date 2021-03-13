import { initValueGetterSetter } from "./base.js";

const attrs = fieldDef => {
    return {
        name: fieldDef.name,
        type: "checkbox",
        class: ["uk-checkbox"],
        private: { fieldDef, initValueGetterSetter },
    };
};

function checkboxInput(fieldDef) {
    const inputHiccup = ["input", attrs(fieldDef)],
          hiccup = ["div", { class: ["uk-margin-small-top"], style: { width: "100%" } },
                    ["div", { class: ["uk-inline"], style: { width: "100%" } },
                     ["span", { class: ["uk-margin-right"] }, fieldDef.label],
                     inputHiccup]];
    return { hiccup, inputHiccup };
}

function Checkbox({ fieldDef }) {
    const view = checkboxInput(fieldDef);
    return {
        hiccup: view.hiccup,
        inputAttrs: () => view.inputHiccup[1]
    };
}

export default Checkbox;
