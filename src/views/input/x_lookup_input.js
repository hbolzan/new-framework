import { inputAttrs } from "./base.js";
import { mergeAttrs } from "../../logic/hiccup.js";

function xLookupInput(field) {
    const attrs = inputAttrs(field, { style: { cursor: "pointer" } }),
          iconAttrs = { class: ["uk-form-icon", "uk-form-icon-flip"], ukIcon: "icon: search" },
          inputHiccup = ["input", attrs],
          hiccup = ["div", { style: { width: "100%" } },
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
