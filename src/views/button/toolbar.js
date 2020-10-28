import { singleButton, buttonGroup } from "./button.js";
import { ALIGN_LEFT, ALIGN_RIGHT } from "../common/consts.js";
import { trace } from "../../common/misc.js";

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

function NavGroup(context, onToolbarEvent) {
    const newButton = action => context.ToolButton(context, toolbarActions[action], onToolbarEvent);
    return {
        _group: "nav",
        _alignment: ALIGN_LEFT,
        first: newButton("first"),
        prior: newButton("prior"),
        next: newButton("next"),
        last: newButton("last"),
    };
}

function CrudGroup(context, onToolbarEvent) {
    const newButton = action => context.ToolButton(context, toolbarActions[action], onToolbarEvent);
    return {
        _group: "crud",
        _alignment: ALIGN_LEFT,
        append: newButton("append"),
        delete: newButton("delete"),
        edit: newButton("edit"),
        confirm: newButton("confirm"),
        dismiss: newButton("dismiss"),
    };
}

function FormAdditionalGroup(context, onToolbarEvent) {
    const newButton = action => context.ToolButton(context, toolbarActions[action], onToolbarEvent);
    return {
        _group: "additional",
        _alignment: ALIGN_RIGHT,
        search: newButton("search"),
        refresh: newButton("refresh"),
        close: newButton("close"),
    };
}

function navGroupHiccup(alignment, group) {
    return buttonGroup(
        alignment,
        group.first.hiccup(),
        group.prior.hiccup(),
        group.next.hiccup(),
        group.last.hiccup(),
    );
}

function crudGroupHiccup(alignment, group) {
    return buttonGroup(
        alignment,
        group.append.hiccup(),
        group.delete.hiccup(),
        group.edit.hiccup(),
        group.confirm.hiccup(),
        group.dismiss.hiccup(),
    );
}

function additionalGroupHiccup(alignment, group) {
    return buttonGroup(
        alignment,
        group.search.hiccup(),
        group.refresh.hiccup(),
        group.close.hiccup(),
    );
}

const groupsBuilders = {
    [actionGroups.nav]: navGroupHiccup,
    [actionGroups.crud]: crudGroupHiccup,
    [actionGroups.additional]: additionalGroupHiccup,
};

const buttonGroupsBuilders = {
    [actionGroups.nav]: NavGroup,
    [actionGroups.crud]: CrudGroup,
    [actionGroups.additional]: FormAdditionalGroup,
};

function FormToolbar(context, onToolbarEvent, selectedGroups) {
    const buttonGroups = _.reduce(
        selectedGroups,
        (groups, group) => groups.concat(buttonGroupsBuilders[group](context, onToolbarEvent)),
        []
    );
    const hiccupGroups = _.reduce(
        buttonGroups,
        (groups, group) => groups.concat([groupsBuilders[group._group](group._alignment, group)]),
        []
    );

    return {
        buttonGroups: _.reduce(
            buttonGroups, (groups, group) => {
                return { ...groups, [group._group]: group };
            },
            {}
        ),
        hiccupGroups: toolBar(...hiccupGroups),
    };
}

export { toolbarActions, actionGroups, FormToolbar };
