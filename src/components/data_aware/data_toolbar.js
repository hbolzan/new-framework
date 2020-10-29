import { withPrivate } from "../../logic/hiccup.js";
import { toolbarActions, actionGroups, FormToolbar } from "../../views/button/toolbar.js";
import { datasetStates } from "../../logic/data_set.js";
import { navStates, crudStates, additionalStates } from "../../logic/data_toolbar.js";

const groupStates = {
    [actionGroups.nav]: navStates,
    [actionGroups.crud]: crudStates,
    [actionGroups.additional]: additionalStates,
};

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

function setGroupStates(buttonGroup, states) {
    _.each(buttonGroup, (button, action) => button.setEnabled ? button.setEnabled(states[action]) : null);
}

function DataToolbar(context, groups) {
    const self = context.BaseComponent(),
          actions = selectedActions(groups, groupedActions(context)),
          toolbarEventHandler = (e, action) => actions[action] ? actions[action]() : null,
          toolbars = FormToolbar(context, toolbarEventHandler, groups),
          hiccup = withPrivate(toolbars.hiccupGroups, "notifyWhenReady", () => handleDatasetEvents());

    function handleDatasetEvents(ds) {
        _.each(groupStates, (states, group) => setGroupStates(toolbars.buttonGroups[group], states(ds)));
    }

    function setListeners() {
        context.dataProvider.dataset.onStateChange(handleDatasetEvents);
        context.dataProvider.dataset.onDataChange(handleDatasetEvents);
    }

    function init() {
        setListeners();
    }

    init();

    return Object.assign(
        self,
        {
            hiccup: () => hiccup,
        }
    );
}

export default DataToolbar;
