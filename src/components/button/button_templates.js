import { renderClassAttr } from "../../logic/html.js";

function singleButtonTemplate({label, icon, buttonKindClass, classes, disabled}) {
    return `<button class="${
        renderClassAttr(["uk-button", buttonKindClass || "uk-button-default"], classes)}"${
        icon ? " uk-icon="+icon : ""}
        disabled ? " disabled" : ""}>${
        label}</button>`;
}

function buttonGroupTemplate({align}) {
    return `<div class="uk-align-${align || "left"
        }" style="background-color: #f9f9f9; padding: 4px; margin: 2px">`;
};

function toolBarTemplate() {
    return `<div style="height: 67px"></div>`;
}

export { singleButtonTemplate, buttonGroupTemplate, toolBarTemplate };
