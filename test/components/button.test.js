import { buttonClasses, buttonAttrs, singleButton, buttonGroup, toolBar } from "../../src/components/button/button.js";

describe("buttonClasses", () => {
    test("mandatory classes", () => {
        expect(buttonClasses()).toEqual(["uk-button", "uk-button-default"]);
    });

    test("override default button type", () => {
        expect(buttonClasses({ type: "danger" })).toEqual(["uk-button", "uk-button-danger"]);
    });

    test("additional classes", () => {
        expect(buttonClasses({ type: "primary", attrs: { class: ["a", "b"] } }))
            .toEqual(["uk-button", "uk-button-primary", "a", "b"]);
    });
});

describe("buttonAttrs", () => {
    test("no params", () => {
        expect(buttonAttrs({ class: ["a", "b"] })).toEqual({ class: ["a", "b"] });
    });

    test("params with additional attrs", () => {
        expect(buttonAttrs({ class: ["a", "b"] }, { attrs: { ukIcon: "trash" }}))
            .toEqual({ class: ["a", "b"], ukIcon: "trash" });
    });

    test("ignore class key from attrs", () => {
        expect(buttonAttrs({ class: ["a", "b"] }, { attrs: { class: "x", ukIcon: "trash" }}))
            .toEqual({ class: ["a", "b"], ukIcon: "trash" });
    });
});

describe("singleButton", () => {
    test("minimum", () => {
        expect(singleButton())
            .toEqual(["button", { class: ["uk-button", "uk-button-default"] }]);
    });

    test("with a label", () => {
        expect(singleButton({ label: "Click me!"}))
            .toEqual(["button", { class: ["uk-button", "uk-button-default"] }, "Click me!"]);
    });

    test("with additional classes", () => {
        expect(singleButton({ attrs: { class: "x" } }))
            .toEqual(["button", { class: ["uk-button", "uk-button-default", "x"] }]);
    });

    test("with type modifier", () => {
        expect(singleButton({ type: "danger" }))
            .toEqual(["button", { class: ["uk-button", "uk-button-danger"] }]);
    });

    test("with additional attributes", () => {
        expect(singleButton({ attrs: { ukIcon: "trash" } }))
            .toEqual(["button", { class: ["uk-button", "uk-button-default"], ukIcon: "trash" }]);
    });

    test("with all features", () => {
        expect(singleButton({ attrs: { class: "x", ukIcon: "trash" }, type: "danger", label: "Click me" }))
            .toEqual([
                "button",
                { class: ["uk-button", "uk-button-danger", "x"], ukIcon: "trash" },
                "Click me"
            ]);
    });

    test("with one child", () => {
        expect(singleButton(null, ["div", "test"]))
            .toEqual(["button", { class: ["uk-button", "uk-button-default"] }, ["div", "test"]]);
    });

    test("with two children", () => {
        expect(singleButton(null, ["div", "test"], ["p", "Text"]))
            .toEqual(
                ["button", { class: ["uk-button", "uk-button-default"] }, ["div", "test"], ["p", "Text"]]
            );
    });
});

describe("buttonGroup", () => {
    test("basic", () => {
        expect(buttonGroup())
            .toEqual([
                "div",
                {
                    class: ["uk-align-left"],
                    style: { backgroundColor: "#f9f9f9", padding: "4px", margin: "2px" }
                }
            ]);
    });

    test("right aligned", () => {
        expect(buttonGroup("right")[1].class).toEqual(["uk-align-right"]);
    });

    test("ignore wrong alignment", () => {
        expect(buttonGroup("wrong")[1].class).toEqual(["uk-align-left"]);
    });

    test("with children", () => {
        expect(buttonGroup("left", ["button"], ["button"]).slice(2))
            .toEqual([["button"], ["button"]]);
    });
});

describe("toolBar", () => {
    test("basic", () => {
        expect(toolBar()).toEqual(["div", { style: { height: "67px" } }]);
    });

    test("with child", () => {
        expect(toolBar(["div"])).toEqual(["div", { style: { height: "67px" } }, ["div"]]);
    });
});
