import { toolbarActions, actionGroups, formToolBar } from "../../views/button/toolbar.js";

function groupedActions({ dataProvider, search }) {
    return {
        [actionGroups.nav]: {
            [toolbarActions.first.action]: () => dataProvider.dataset.first(),
            [toolbarActions.prior.action]: () => dataProvider.dataset.prior(),
            [toolbarActions.next.action]: () => dataProvider.dataset.next(),
            [toolbarActions.last.action]: () => dataProvider.dataset.last(),
        },
        [actionGroups.crud]: {
            [toolbarActions.append.action]: () => dataProvider.dataset.append(),
            [toolbarActions.delete.action]: () => dataProvider.dataset.delete(),
            [toolbarActions.edit.action]: () => dataProvider.dataset.edit(),
            [toolbarActions.confirm.action]: () => dataProvider.dataset.confirm(),
            [toolbarActions.dismiss.action]: () => dataProvider.dataset.cancel(),
        },
        [actionGroups.additional]: {
            [toolbarActions.search.action]: () => search.show(),
            [toolbarActions.refresh.action]: () => dataProvider.refresh(),
        },
    };
}

function selectedActions(selectedGroups, allActions) {
    return _.reduce(
        selectedGroups,
        (actions, group) => Object.assign({}, actions, allActions[group]),
        {}
    );
}

function DataToolbar(context, groups) {
    const self = context.BaseComponent(),
          actions = selectedActions(groups, groupedActions(context)),
          toolbarEventHandler = (e, action) => actions[action] ? actions[action]() : null,
          hiccup = formToolBar(toolbarEventHandler, groups);

    return Object.assign(
        self,
        {
            hiccup: () => hiccup,
        }
    );

}

export default DataToolbar;
