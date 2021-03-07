import { navStates, crudStates, additionalStates } from "../../src/logic/data_toolbar.js";
import { datasetStates } from "../../src/logic/data_set.js";

function dataset(empty, bof, eof, state) {
    return {
        isEmpty: () => empty,
        bof: () => bof,
        eof: () => eof,
        state: () => state,
    };
}

describe("navStates", () => {
    it("disables all buttons if dataset is empty", () => {
        expect(navStates(dataset(true, true, true, datasetStates.browse)))
            .toEqual({ first: false, prior: false, next: false, last: false });
    });

    it("disables first and prior when dataset is not empty and points to the first row", () => {
        expect(navStates(dataset(false, true, false, datasetStates.browse)))
            .toEqual({ first: false, prior: false, next: true, last: true });
    });

    it("disables next and last when dataset is not empty and points to the last row", () => {
        expect(navStates(dataset(false, false, true, datasetStates.browse)))
            .toEqual({ first: true, prior: true, next: false, last: false });
    });

    it("enables all buttons when dataset is not empty, and points to some middle row", () => {
        expect(navStates(dataset(false, false, false, datasetStates.browse)))
            .toEqual({ first: true, prior: true, next: true, last: true });
    });

    it("disables all buttons when dataset state is edit or insert", () => {
        expect(navStates(dataset(false, false, false, datasetStates.edit)))
            .toEqual({ first: false, prior: false, next: false, last: false });

        expect(navStates(dataset(false, false, false, datasetStates.insert)))
            .toEqual({ first: false, prior: false, next: false, last: false });
    });

    it("disables all buttons when datset is undefined or null", () => {
        expect(navStates()).toEqual({ first: false, prior: false, next: false, last: false });
        expect(navStates(null)).toEqual({ first: false, prior: false, next: false, last: false });
    });
});

describe("crudStates", () => {
    it("enables only append button when dataset is empty and state is browse", () => {
        expect(crudStates(dataset(true, true, true, datasetStates.browse)))
            .toEqual({ append: true, delete: false, edit: false, confirm: false, dismiss: false });
    });

    it("enables append, delete and edit buttons when dataset is not empty and state is browse", () => {
        expect(crudStates(dataset(false, true, false, datasetStates.browse)))
            .toEqual({ append: true, delete: true, edit: true, confirm: false, dismiss: false });
    });

    it("enables confirm and dismiss buttons when dataset state is edit or insert", () => {
        expect(crudStates(dataset(false, true, false, datasetStates.edit)))
            .toEqual({ append: false, delete: false, edit: false, confirm: true, dismiss: true });

        expect(crudStates(dataset(false, true, false, datasetStates.insert)))
            .toEqual({ append: false, delete: false, edit: false, confirm: true, dismiss: true });
    });

    it("disables all buttons but append when dataset is undefined or null", () => {
        expect(crudStates())
            .toEqual({ append: true, delete: false, edit: false, confirm: false, dismiss: false });

        expect(crudStates(null))
            .toEqual({ append: true, delete: false, edit: false, confirm: false, dismiss: false });
    });
});

describe("additionalStates", () => {
    it("enables all buttons when dataset state is browse", () => {
        expect(additionalStates(dataset(true, true, true, datasetStates.browse)))
            .toEqual({ search: true, refresh: true, close: true });

        expect(additionalStates(dataset(false, false, false, datasetStates.browse)))
            .toEqual({ search: true, refresh: true, close: true });
    });

    it("disables insert if dataset state is not browse", () => {
        expect(additionalStates(dataset(true, true, true, datasetStates.inactive)))
            .toEqual({ search: true, refresh: false, close: true });
    });

    it("disables insert and refresh if dataset state is edit or insert", () => {
        expect(additionalStates(dataset(true, true, true, datasetStates.edit)))
            .toEqual({ search: false, refresh: false, close: true });

        expect(additionalStates(dataset(true, true, true, datasetStates.insert)))
            .toEqual({ search: false, refresh: false, close: true });
    });

    it("disables refresh if dataset is undefined or null", () => {
        expect(additionalStates()).toEqual({ search: true, refresh: false, close: true });
        expect(additionalStates(null)).toEqual({ search: true, refresh: false, close: true });
    });
});
