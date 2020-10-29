import { datasetStates } from "./data_set.js";

function navStates(dataset) {
    const isEmpty = dataset?.isEmpty(),
          bof = dataset?.bof(),
          eof = dataset?.eof(),
          browse = dataset?.state() == datasetStates.browse;

    return {
        first: browse && ! isEmpty && ! bof,
        prior: browse && ! isEmpty && ! bof,
        next: browse && ! isEmpty && ! eof,
        last: browse && ! isEmpty && ! eof,
    };
}

function crudStates(dataset) {
    const isEmpty = dataset?.isEmpty(),
          state = dataset?.state(),
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
    const state = dataset?.state(),
          edit = state == datasetStates.edit,
          insert = state == datasetStates.insert,
          browse = state == datasetStates.browse;

    return {
        search: ! edit && ! insert,
        refresh: browse,
        close: true,
    };
}

export { navStates, crudStates, additionalStates };
