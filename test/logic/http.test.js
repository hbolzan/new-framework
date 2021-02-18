import { objectToQueryParams } from "../../src/logic/http.js";

describe("objectToQueryParams", () => {
    it("turns an objetc into a query params string", () => {
        expect(objectToQueryParams({})).toBe("");
        expect(objectToQueryParams({ a: 1 })).toBe("?a=1");
        expect(objectToQueryParams({ a: 1, b: 2 })).toBe("?a=1&b=2");
    });
});
