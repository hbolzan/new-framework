import { toHtml, renderAttrValue, camelToKebab, hiccupToObj, objToHtml } from "../../src/logic/hiccup.js";

/** hiccup notation
 *
 * [tag, [attrs, ] [innerText, ] [child-1, ] [child-2, ] [... ]]
 *
 */

describe("camelToKebab", () => {
    test("convert camel case to kebab case", () => {
        expect(camelToKebab("someKey")).toBe("some-key");
        expect(camelToKebab("wannaBeKebab")).toBe("wanna-be-kebab");
    });
});

describe("renderAttrValue", () => {
    test("render string value as is", () =>{
        expect(renderAttrValue("value")).toBe("value");
    });

    test("render array elements as list separated by spaces", () =>{
        expect(renderAttrValue(["a", "b", "c"])).toBe("a b c");
    });

    test("render object as key:values separated by semicolons", () =>{
        expect(renderAttrValue({color: "blue", height: "10px"}))
            .toBe("color: blue; height: 10px;");
    });

    test("convert key names to kebab case", () => {
        expect(renderAttrValue({backgroundColor: "blue", minHeight: "10px"}))
            .toBe("background-color: blue; min-height: 10px;");
    });
});

describe("hiccupToObj", () => {
    test("convert hiccup to obj", () => {
        expect(hiccupToObj(["div"])).toEqual({tag: "div"});
        expect(hiccupToObj(["div", {class: "x"}])).toEqual({tag: "div", attrs: {class: "x"}});
    });

    test("convert children recursively", () => {
        expect(hiccupToObj(["div", {class: "x"}, ["span"]]))
            .toEqual({tag: "div", attrs: {class: "x"}, children: [{tag: "span"}]});
    });

    test("if second element is not an object, there are no attrs", () => {
        expect(hiccupToObj(["div", ["span"]]))
            .toEqual({tag: "div", children: [{tag: "span"}]});
    });

    test("add innerText to object when second or third element is a string", () => {
        expect(hiccupToObj(["div", "some text here", ["span"]]))
            .toEqual({tag: "div", innerText: "some text here", children: [{tag: "span"}]});

        expect(hiccupToObj(["div", {class: "x"}, "some text here", ["span"]]))
            .toEqual({
                tag: "div",
                attrs: {class: "x"},
                innerText: "some text here",
                children: [{tag: "span"}]
            });
    });

    test("add multiple children", () => {
        expect(hiccupToObj(["div", ["span"], ["p", "Some text here"]]))
            .toEqual({tag: "div", children: [{tag: "span"}, {tag: "p", innerText: "Some text here"}]});
    });
});

describe("objToHtml", () => {
    test("render html tag", () => {
        expect(objToHtml({tag: "div"})).toBe("<div></div>");
        expect(objToHtml({tag: "i"})).toBe("<i></i>");
    });

    test("render tag with attributes", () => {
        expect(objToHtml({tag: "i", attrs: {class: "a b c", "uk-icon": "trash"}}))
            .toBe('<i class="a b c" uk-icon="trash"></i>');

        expect(objToHtml({tag: "i", attrs: {class: ["a", "b", "c"], "uk-icon": "trash"}}))
            .toBe('<i class="a b c" uk-icon="trash"></i>');

        expect(objToHtml({tag: "i", attrs: {class: ["a", "b", "c"], ukIcon: "trash"}}))
            .toBe('<i class="a b c" uk-icon="trash"></i>');

        expect(objToHtml({tag: "div", attrs: {style: {color: "blue"}}}))
            .toBe('<div style="color: blue;"></div>');

        expect(objToHtml({tag: "div", attrs: {style: {color: "blue", height: "10px"}}}))
            .toBe('<div style="color: blue; height: 10px;"></div>');
    });

    test("render tag with innerText", () => {
        expect(objToHtml({tag: "div", innerText: "TESTE"})).toBe("<div>TESTE</div>");
    });

    test("render tag with children", () => {
        expect(objToHtml({tag: "div", children: [{tag: "p"}]}))
            .toBe("<div><p></p></div>");

        expect(objToHtml({tag: "div", children: [{tag: "p"}, {tag: "span"}]}))
            .toBe("<div><p></p><span></span></div>");
    });

    test("render tag with everythin", () => {
        expect(objToHtml({
            tag: "div",
            attrs: {style: {color: "blue", height: "10px"}},
            innerText: "This is inner text",
            children: [{tag: "p"}, {tag: "span"}]
        }))
            .toBe('<div style="color: blue; height: 10px;">This is inner text<p></p><span></span></div>');
    });
});

describe("toHtml", () => {
    test("render html tag", () => {
        expect(toHtml(["div"])).toBe("<div></div>");
        expect(toHtml(["section"])).toBe("<section></section>");
    });

    test("render tag with attributes", () => {
        expect(toHtml(["i", {class: "a b c", "uk-icon": "trash"}]))
            .toBe('<i class="a b c" uk-icon="trash"></i>');
    });

    test("render array attr value as values separated by spaces", () => {
        expect(toHtml(["i", {class: ["a", "b", "c"]}]))
            .toBe('<i class="a b c"></i>');
    });

    test("render map attr value as key-value list separated by semicolons", () => {
        expect(toHtml(["div", {style: {color: "blue"}}]))
            .toBe('<div style="color: blue;"></div>');

        expect(toHtml(["div", {style: {color: "blue", height: "10px"}}]))
            .toBe('<div style="color: blue; height: 10px;"></div>');
    });

    test("convert attributes names from to kebab case", () => {
        expect(toHtml(["i", {ukIcon: "trash"}]))
            .toBe('<i uk-icon="trash"></i>');
    });
});
