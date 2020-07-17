import { basicInputAttrs } from "../input/base.js";
import input from "../input/input.js";

function formField(field) {
    return ["div", { class: field.class || "uk-width-1-1" },
            ["label", { class: ["uk-form-label"], for: "" }, field.label],
            input(field)];
}

function form(...children) {
    return ["form", ...children];
    return ["form", { class: "uk-grid-small", ukGrid: "uk-grid" }, ...children];
}

export { formField, form };
