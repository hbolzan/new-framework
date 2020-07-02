import { renderClassAttr } from "../../src/logic/html.js";

test("render an empty string if no classes are provided", () => {
    expect(renderClassAttr()).toBe("");
});

test("render mandatory classes when provided", () => {
    expect(renderClassAttr(["a", "b", "c"])).toBe("a b c");
});

test("render mandatory and additional classes when provided", () => {
    expect(renderClassAttr(["a", "b", "c"], ["d", "e", "f"])).toBe("a b c d e f");
});

test("render mandatory and additional classes when provided", () => {
    expect(renderClassAttr(["a", "b", "c"], ["d", "e", "f"])).toBe("a b c d e f");
});
