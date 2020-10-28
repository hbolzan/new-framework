import { toolbarActions, actionGroups, FormToolbar } from "../../views/button/toolbar.js";
import { datasetStates } from "../../logic/data_set.js";

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

function navStates(dataset) {
    const isEmpty = dataset.isEmpty(),
          bof = dataset.bof(),
          eof = dataset.eof(),
          browse = dataset.state() == datasetStates.browse;

    return {
        first: browse && ! isEmpty && ! bof,
        prior: browse && ! isEmpty && ! bof,
        next: browse && ! isEmpty && ! eof,
        last: browse && ! isEmpty && ! eof,
    };
}

function crudStates(dataset) {
    const isEmpty = dataset.isEmpty(),
          state = dataset.state(),
          edit = state == datasetStates.edit,
          insert = state == datasetStates.insert,
          browse = state == datasetStates.browse;

    return {
        append: browse,
        delete: browse && ! isEmpty,
        edit: browse && ! isEmpty,
        confirm: edit || insert,
        dismiss: edit || insert,
    };
}

function additionalStates(dataset) {
    const state = dataset.state(),
          edit = state == datasetStates.edit,
          insert = state == datasetStates.insert,
          browse = dataset.state() == datasetStates.browse;

    return {
        search: ! edit && ! insert,
        refresh: browse,
        close: true,
    };
}

function setGroupStates(buttonGroup, states) {
    _.each(buttonGroup, (button, action) => button.setEnabled ? button.setEnabled(states[action]) : null);
}

function DataToolbar(context, groups) {
    const self = context.BaseComponent(),
          actions = selectedActions(groups, groupedActions(context)),
          toolbarEventHandler = (e, action) => actions[action] ? actions[action]() : null,
          toolbars = FormToolbar(context, toolbarEventHandler, groups),
          hiccup = toolbars.hiccupGroups;

    function handleDatasetEvents(ds) {
        setGroupStates(toolbars.buttonGroups.nav, navStates(ds));
        setGroupStates(toolbars.buttonGroups.crud, crudStates(ds));
        setGroupStates(toolbars.buttonGroups.additional, additionalStates(ds));
    }

    context.dataProvider.dataset.onStateChange(handleDatasetEvents);
    context.dataProvider.dataset.onDataChange(handleDatasetEvents);

    return Object.assign(
        self,
        {
            hiccup: () => hiccup,
        }
    );
}

export default DataToolbar;
