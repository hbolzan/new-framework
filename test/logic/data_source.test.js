import { deleteRow } from "../../src/logic/data_set.js";

describe("deleteRow", () => {
    it("deletes current data row", () => {
        expect(deleteRow({ rows: [1, 2, 3, 4], recordIndex: 1 }))
            .toMatchObject({ rows: [1, 3, 4], recordIndex: 1 });
    });

    it("sets pending to true", () => {
        expect(deleteRow({ rows: [1, 2, 3, 4], recordIndex: 1, pending: false }))
            .toMatchObject({ rows: [1, 3, 4], recordIndex: 1, pending: true });
    });

    it("moves recordIndex to remaining last row if deleted last row", () => {
        expect(deleteRow({ rows: [1, 2, 3, 4], recordIndex: 3 }))
            .toMatchObject({ rows: [1, 2, 3], recordIndex: 2, pending: true });
    });

    it("sets recordIndex to -1 if rows get empty after delete", () => {
        expect(deleteRow({ rows: [4], recordIndex: 0 }))
            .toMatchObject({ rows: [], recordIndex: -1, pending: true });
    });

    it("does not change if rows are empty", () => {
        expect(deleteRow({ rows: [], recordIndex: -1, pending: false }))
            .toMatchObject({ rows: [], recordIndex: -1, pending: false });

        expect(deleteRow({ rows: [], recordIndex: -1, pending: true }))
            .toMatchObject({ rows: [], recordIndex: -1, pending: true });
    });
});
