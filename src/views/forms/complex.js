import { containerHeader, containerBody, containerFooter, formContainer } from "./container.js";
import { singleButton, buttonGroup, toolBar } from "../button/button.js";

const toolbarActions = {
    first: { action: "first", icon: "chevron-double-left" },
    prior: { action: "prior", icon: "triangle-left" },
    next: { action: "next", icon: "triangle-right" },
    last: { action: "last", icon: "chevron-double-right" },
    append: { action: "append", icon: "plus-circle" },
    delete: { action: "delete", icon: "trash" },
    edit: { action: "edit", icon: "file-edit" },
    confirm: { action: "confirm", icon: "check" },
    dismiss: { action: "dismiss", icon: "ban" },
    search: { action: "search", icon: "search" },
    refresh: { action: "refresh", icon: "refresh" },
    close: { action: "close", icon: "close" },
};

function newToolButton(action, onToolbarEvent, attrs = {}) {
    return singleButton({
        attrs: Object.assign(
            {
                class: ["uk-button-large"],
                ukIcon: action.icon,
                style: { padding: "0", width: "55px", backgroundColor: "#fdfdfd" }
            },
            attrs,
            onToolbarEvent ? { onclick: e => onToolbarEvent(e, action)} : {}
        )
    });
}

function navButtons(onToolbarEvent) {
    return [
        newToolButton(toolbarActions.first, onToolbarEvent),
        newToolButton(toolbarActions.prior, onToolbarEvent),
        newToolButton(toolbarActions.next, onToolbarEvent),
        newToolButton(toolbarActions.last, onToolbarEvent),
    ];
}

function crudButtons(onToolbarEvent) {
    return [
        newToolButton(toolbarActions.append, onToolbarEvent),
        newToolButton(toolbarActions.delete, onToolbarEvent),
        newToolButton(toolbarActions.edit, onToolbarEvent),
        newToolButton(toolbarActions.confirm, onToolbarEvent),
        newToolButton(toolbarActions.dismiss, onToolbarEvent),
    ];
}

function formAdditionalButtons(onToolbarEvent) {
    return [
        newToolButton(toolbarActions.search, onToolbarEvent),
        newToolButton(toolbarActions.refresh, onToolbarEvent),
        newToolButton(toolbarActions.close, onToolbarEvent),
    ];
}

function formToolBar(onToolbarEvent) {
    return toolBar(
        buttonGroup("left", ...navButtons(onToolbarEvent)),
        buttonGroup("left", ...crudButtons(onToolbarEvent)),
        buttonGroup("right", ...formAdditionalButtons(onToolbarEvent)),
    );
}

function complexForm(formTitle, masterContents, detailContents, toolbarEventHandler) {
    return formContainer(
        containerHeader(formTitle, formToolBar(toolbarEventHandler)),
        containerBody(...masterContents),
    );
}

export { complexForm };
