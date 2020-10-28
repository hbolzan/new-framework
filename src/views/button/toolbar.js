import { singleButton, buttonGroup } from "./button.js";
import { ALIGN_LEFT, ALIGN_RIGHT } from "../common/consts.js";

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

const actionGroups = { nav: "nav", crud: "crud", additional: "additional" };

function toolBar(...children) {
    return ["div", { style: { height: "67px" } }, ...children];
}

function toolButton(action, onToolbarEvent, attrs = {}) {
    return singleButton({
        attrs: Object.assign(
            {
                class: ["uk-button-large"],
                ukIcon: action.icon,
                style: { padding: "0", width: "55px", backgroundColor: "#fdfdfd" }
            },
            attrs,
            onToolbarEvent ? { onclick: e => onToolbarEvent(e, action.action)} : {}
        )
    });
}

function navGroup(onToolbarEvent) {
    return buttonGroup(
        ALIGN_LEFT,
        toolButton(toolbarActions.first, onToolbarEvent),
        toolButton(toolbarActions.prior, onToolbarEvent),
        toolButton(toolbarActions.next, onToolbarEvent),
        toolButton(toolbarActions.last, onToolbarEvent),
    );
}

function crudGroup(onToolbarEvent) {
    return buttonGroup(
        ALIGN_LEFT,
        toolButton(toolbarActions.append, onToolbarEvent),
        toolButton(toolbarActions.delete, onToolbarEvent),
        toolButton(toolbarActions.edit, onToolbarEvent),
        toolButton(toolbarActions.confirm, onToolbarEvent),
        toolButton(toolbarActions.dismiss, onToolbarEvent),
    );
}

function formAdditionalGroup(onToolbarEvent) {
    return buttonGroup(
        ALIGN_RIGHT,
        toolButton(toolbarActions.search, onToolbarEvent),
        toolButton(toolbarActions.refresh, onToolbarEvent),
        toolButton(toolbarActions.close, onToolbarEvent),
    );
}

const groupsBuilders = {
    [actionGroups.nav]: navGroup,
    [actionGroups.crud]: crudGroup,
    [actionGroups.additional]: formAdditionalGroup,
};

function formToolBar(onToolbarEvent, selectedGroups) {
    const groups = _.reduce(
        selectedGroups,
        (groups, group) => groups.concat([groupsBuilders[group](onToolbarEvent)]),
        []
    );
    return toolBar(...groups);
}

export { toolbarActions, actionGroups, formToolBar };
