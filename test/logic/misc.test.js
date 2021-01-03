import { isPromise, first } from "../../src/logic/misc.js";

describe("isPromise", () => {
    it("returns true if object is a promise", () => {
        expect(isPromise(new Promise(x => x))).toBeTruthy();
        expect(isPromise({ then: 1 })).toBeFalsy();
    });
});

describe("first", () => {
    it("returns the first element of an array", () => {
        expect(first([1, 2, 3])).toBe(1);
    });

    it("returns null if array is empty", () => {
        expect(first([])).toBeNull();
    });
});
