import { isPromise, first, assocIf } from "../../src/logic/misc.js";

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

describe("assocIf", () => {
    it("returns null", () => {
        expect(assocIf(null, "x", null)).toBeNull();
    });

    it("returns null", () => {
        expect(assocIf(null, "x", undefined)).toBeNull();
    });

    it("returns new object with key = value", () => {
        expect(assocIf(null, "x", 1)).toEqual({ x: 1 });
    });

    it("returns the object with no changes", () => {
        expect(assocIf({ a: 1 }, "x", null)).toEqual({ a: 1 });
    });

    it("returns the object with no changes", () => {
        expect(assocIf({ a: 1 }, "x", undefined)).toEqual({ a: 1 });
    });

    it("returns object with value assoced to key", () => {
        expect(assocIf({ a: 1 }, "x", 10)).toEqual({ a: 1, x: 10 });
    });

    it("returns object with new value assoced to key", () => {
        expect(assocIf({ a: 1, x: 2 }, "x", 10)).toEqual({ a: 1, x: 10 });
    });
});
