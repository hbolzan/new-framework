import { singleButtonHtml } from "./button_templates.js";
import { htmlToElement, addChildren } from "../../common/dom.js";

function singleButton(document, attrs) {
    // ["button", {class: ["a", "b", "c"], "uk-icon": "trash", disabled}]
    return htmlToElement(document, singleButtonTemplate(attrs));
}

function buttonGroup(document, buttons, attrs) {
    return addChildren(htmlToElement(document, buttonGroupTemplate(attrs)), buttons);
}

function toolBar(document, groups) {
    return addChildren(htmlToElement(document, toolBarTemplate()), groups);
}

export { singleButton, buttonGroup, toolBar };
