import { containerHeader, containerBody, containerFooter, formContainer } from "./container.js";
import { singleButton, buttonGroup, toolBar } from "../button/button.js";

function newToolButton(icon, attrs = {}) {
    return singleButton({
        attrs: Object.assign({
            class: ["uk-button-large"],
            ukIcon: icon,
            style: { padding: "0", width: "55px", backgroundColor: "#fdfdfd" }
        }, attrs)
    });
}

function navButtons() {
    return [
        newToolButton("chevron-double-left"),
        newToolButton("triangle-left"),
        newToolButton("triangle-right"),
        newToolButton("chevron-double-right"),
    ];
}

function crudButtons() {
    return [
        newToolButton("plus-circle"),
        newToolButton("trash"),
        newToolButton("file-edit"),
        newToolButton("check"),
        newToolButton("ban"),
    ];
}

function formAdditionalButtons() {
    return [
        newToolButton("search"),
        newToolButton("refresh"),
        newToolButton("close"),
    ];
}

function formToolBar() {
    return toolBar(
        buttonGroup("left", ...navButtons()),
        buttonGroup("left", ...crudButtons()),
        buttonGroup("right", ...formAdditionalButtons()),
    );
}

function complexForm(formTitle, masterContents, detailContents) {
    return formContainer(
        containerHeader(formTitle, formToolBar()),
        containerBody(...masterContents)
    );
}

export { complexForm };
