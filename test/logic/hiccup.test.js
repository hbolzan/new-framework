import { toHtml } from "../../src/logic/hiccup.js";

test("render html tag", () => {
    expect(toHtml(["div"])).toBe("<div></div>");
});

test("render other html tag", () => {
    expect(toHtml(["section"])).toBe("<section></section>");
});

test("render tag with attributes", () => {
    expect(toHtml(["i", {class: "a b c", "uk-icon": "trash"}]))
        .toBe('<i class="a b c" uk-icon="trash"></i>');
});
