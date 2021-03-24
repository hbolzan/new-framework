import { initValueGetterSetter } from "./base.js";

const attrs = (fieldDef, valueChangeHandler) => {
    return {
        name: fieldDef.name,
        type: "checkbox",
        class: ["uk-checkbox"],
        onclick: clickHandler,
        private: {
            fieldDef,
            initValueGetterSetter: _.partialRight(initValueGetterSetter, valueChangeHandler)
        },
    };
};

function clickHandler(el) {
    el.target.focus();
    el.target.value = el.target.checked ? "S" : "N";
    el.target.blur();
}

function checkboxInput(fieldDef) {
    const valueChangeHandler = (newValue, el) => {
        el.checked = newValue == "S";
    };

    const inputHiccup = ["input", attrs(fieldDef, valueChangeHandler)],
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
