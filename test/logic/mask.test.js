import { parseMask } from "../../src/logic/mask.js";

describe("parseMask", () => {
    test("convert numeric mask into inputmask parameters", () => {
        expect(parseMask("")).toEqual({ alias: "numeric" });
        expect(parseMask(undefined)).toEqual({ alias: "numeric" });
        expect(parseMask("#")).toEqual({ alias: "numeric", digits: 0 });
        expect(parseMask("###")).toEqual({ alias: "numeric", digits: 0 });
        expect(parseMask("###.##")).toEqual({ alias: "numeric", digits: 2 });
        expect(parseMask("#,###.####")).toEqual({ alias: "numeric", digits: 4 });
    });

    test("mask with 9's must render as currency", () => {
        expect(parseMask("##9.99")).toEqual({ alias: "currency", digits: 2 });
        expect(parseMask("##9.999")).toEqual({ alias: "currency", digits: 3 });
    });
});
