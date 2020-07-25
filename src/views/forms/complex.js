import { containerHeader, containerBody, containerFooter, formContainer } from "./container.js";
import { singleButton, buttonGroup, toolBar } from "../button/button.js";

function newToolButton(icon) {
    return singleButton({
        attrs: {
            class: ["uk-button-large"],
            ukIcon: icon,
            style: { padding: "0", width: "55px", backgroundColor: "#fdfdfd" }
        }
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
