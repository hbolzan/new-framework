import { basicInputAttrs } from "../input/base.js";
import input from "../input/input.js";

function formField(context) {
    const { fieldDef, DataInput } = context;
    return ["div", { class: fieldDef.class || "uk-width-1-1" },
            ["label", { class: ["uk-form-label"], for: "" }, fieldDef.label],
            DataInput(context).hiccup()];
}

function form(...children) {
    return ["form", ...children];
    return ["form", { class: "uk-grid-small", ukGrid: "uk-grid" }, ...children];
}

export { formField, form };
