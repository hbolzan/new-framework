import { _ } from "lodash";
import {
    WIDTH_MAP,
    standardWidth,
    adjustdWidth,
    nextSmartRow,
    smartRows,
    modifiedSum,
    classToApply,
    applyClasses,
    smartForm
} from "../../src/logic/smart_forms.js";
import { smartFormTestData } from "./smart_forms.data.js";

const WIDTH_STEPS = [7, 15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 999];

describe("standardWidth", () => {
    test("convert width to standard width", () => {
        expect(standardWidth(WIDTH_STEPS, 1)).toBe(7);
        expect(_.map([7, 15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 90], _.partial(standardWidth, WIDTH_STEPS)))
            .toEqual([7, 15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 90]);
        expect(_.map([6, 14, 17, 22, 29, 35, 44, 53, 59, 67, 71, 74, 79], _.partial(standardWidth, WIDTH_STEPS)))
            .toEqual([7, 15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 90]);
        expect(_.map([8, 16, 19, 24, 31, 37, 46, 55, 61, 69, 73, 76, 91], _.partial(standardWidth, WIDTH_STEPS)))
            .toEqual([15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 90, 90]);
    });
});

describe("adjustdWidth", () => {
    test("change field width to standard width", () => {
        expect(adjustdWidth(WIDTH_STEPS, { name: "x", width: 1 })).toEqual({ name: "x", width: 7 });
        expect(adjustdWidth(WIDTH_STEPS, { name: "x", width: 20 })).toEqual({ name: "x", width: 23 });
        expect(adjustdWidth(WIDTH_STEPS, { name: "x", width: 30 })).toEqual({ name: "x", width: 30 });
        expect(adjustdWidth(WIDTH_STEPS, { name: "x", width: 31 })).toEqual({ name: "x", width: 36 });
    });
});

describe("nextSmartRow", () => {
    test("don't allow width beyond maximum width", () => {
        let input = [{ order: 3, width: 23 }, { order: 4, width: 72 }, { order: 5, width: 15 },],
            expected = [{ order: 3, width: 23 }];
        expect(nextSmartRow({ maxWidth: 90 }, input))
            .toEqual({
                next: expect.arrayContaining(expected),
                remaining: expect.arrayContaining([{ order: 4, width: 72 }, { order: 5, width: 15 }])
            });

        input = [{ order: 1, width: 23 }, { order: 2, width: 15 }, { order: 3, width: 72 }];
        expected = [{ order: 1, width: 23 }, { order: 2, width: 15 }];
        expect(nextSmartRow({ maxWidth: 90 }, input))
            .toEqual({
                next: expect.arrayContaining([{ order: 1, width: 23 }, { order: 2, width: 15 }]),
                remaining: expect.arrayContaining([{ order: 3, width: 72 }])
            });
    });

    test("achieve last row", () => {
        let input = [{ order: 3, width: 23 }, { order: 5, width: 15 }],
            expected = [{ order: 3, width: 23 }, { order: 5, width: 15 }];
        expect(nextSmartRow({ maxWidth: 90 }, input))
            .toEqual({
                next: expect.arrayContaining(expected),
                remaining: []
            });
    });
});

describe("smartRows", () => {
    test("convert a list of fields into a list of rows", () => {
        let input = [{ order: 3, width: 23 }, { order: 4, width: 72 }, { order: 5, width: 15 }],
            expected = [[{ order: 3, width: 23 }], [{ order: 4, width: 72 }, { order: 5, width: 15 }]];
        expect(smartRows({ maxWidth: 90 }, input))
            .toEqual(expected);
    });

    test("a different order changes the distribution", () => {
        let input = [{ order: 2, width: 72 }, { order: 3, width: 23 }, { order: 5, width: 15 }],
            expected = [[{ order: 2, width: 72 }], [{ order: 3, width: 23 }, { order: 5, width: 15 }]];
        expect(smartRows({ maxWidth: 90 }, input))
            .toEqual(expected);
    });
});

describe("modifiedSum", () => {
    test("sum fields widths", () => {
        expect(modifiedSum(7, 15, [{ width: 15 }, { width: 23 }, { width: 30 }])).toBe(68);
    });

    test("replaces fields width by secondWidth when it's firstWidth", () => {
        expect(modifiedSum(7, 15, [{ width: 15 }, { width: 7 }, { width: 30 }])).toBe(60);
        expect(modifiedSum(7, 15, [{ width: 7 }, { width: 7 }, { width: 30 }])).toBe(60);
    });
});

describe("classToApply", () => {
    test("if field width is not the first of the widths, it keeps the same", () => {
        expect(classToApply(WIDTH_MAP, [{ width: 15 }], { width: 15 }))
            .toEqual("uk-width-1-6");
    });

    test("don't apply extended if row will sum less than maximum width", () => {
        expect(classToApply(WIDTH_MAP, [{ width: 15 }, { width: 7 }, { width: 30 }], { width: 7 }))
            .toEqual("uk-width-1-6");
    });
});

describe("applyClasses happy path", () => {
    test("single field in a row", () => {
        expect(applyClasses({ threshold: 90 }, WIDTH_MAP, [{ order: 2, width: 90 }]))
            .toEqual([{ order: 2, width: 90, class: "uk-width-1-1" }]);
        expect(applyClasses({ threshold: 90 }, WIDTH_MAP, [{ order: 2, width: 72 }]))
            .toEqual([{ order: 2, width: 72, class: "uk-width-4-5" }]);
    });

    test("multiple fields in a row", () => {
        expect(applyClasses({ threshold: 90 }, WIDTH_MAP, [{ order: 3, width: 23 }, { order: 4, width: 68 }]))
            .toEqual([
                { order: 3, width: 23, class: "uk-width-1-4" },
                { order: 4, width: 68, class: "uk-width-expand" }
            ]);
    });
});

describe("applyClasses corner cases", () => {
    test("we don't want a single field with expand class", () => {
        expect(applyClasses({ threshold: 90 }, WIDTH_MAP, [{ order: 1, width: 7 }]))
            .toEqual([{ order: 1, width: 7, class: "uk-width-1-6" }]);
    });

    test("convert expand fields to 1/6 if the new total width is less than maximum", () => {
        expect(applyClasses({ threshold: 90 }, WIDTH_MAP, [
            { order: 1, width: 7 },
            { order: 2, width: 7 },
            { order: 3, width: 7 },
            { order: 4, width: 7 },
            { order: 5, width: 18 }
        ])).toEqual([
            { order: 1, width: 7, class: "uk-width-1-6" },
            { order: 2, width: 7, class: "uk-width-1-6" },
            { order: 3, width: 7, class: "uk-width-1-6" },
            { order: 4, width: 7, class: "uk-width-1-6" },
            { order: 5, width: 18, class: "uk-width-1-5" }
        ]);
    });

    test("when total width is above threshold, expands the widest fields", () => {
        expect(applyClasses({ threshold: 80 }, WIDTH_MAP, [{ order: 1, width: 45 }, { order: 2, width: 36 }]))
            .toEqual([
                { order: 1, width: 45, class: "uk-width-expand" },
                { order: 2, width: 36, class: "uk-width-2-5" }
            ]);
    });

    test("serveral rows from a real scenario", () => {
        expect(applyClasses({ threshold: 80 }, WIDTH_MAP, [
            { order: 1, width: 7 },   //  7
            { order: 3, width: 15 },  // 15
            { order: 4, width: 18 },  // 18
            { order: 5, width: 18 },  // 18
            { order: 6, width: 18 },  // 18 - 76 or 84
        ])).toEqual([
            { order: 1, width: 7, class: "uk-width-1-6" },
            { order: 3, width: 15, class: "uk-width-1-6" },
            { order: 4, width: 18, class: "uk-width-expand" },
            { order: 5, width: 18, class: "uk-width-expand" },
            { order: 6, width: 18, class: "uk-width-expand" },
        ]);

        expect(applyClasses({ threshold: 80 }, WIDTH_MAP, [
            { order: 7, width: 23 },  // 23
            { order: 8, width: 18 },  // 18
            { order: 9, width: 36 },  // 36 - 77
        ])).toEqual([
            { order: 7, width: 23, class: "uk-width-1-4" },
            { order: 8, width: 18, class: "uk-width-1-5" },
            { order: 9, width: 36, class: "uk-width-2-5" },
        ]);

        expect(applyClasses({ threshold: 80 }, WIDTH_MAP, [
            { order: 11, width: 23 }, // 23
            { order: 14, width: 23 }, // 23
            { order: 16, width: 23 }, // 23 - 69
        ])).toEqual([
            { order: 11, width: 23, class: "uk-width-1-4" }, // 23
            { order: 14, width: 23, class: "uk-width-1-4" }, // 23
            { order: 16, width: 23, class: "uk-width-1-4" }, // 23 - 69
        ]);

        expect(applyClasses({ threshold: 80 }, WIDTH_MAP, [
            { order: 17, width: 23 }, // 23
            { order: 18, width: 30 }, // 30
            { order: 21, width: 30 }, // 30 - 83
        ])).toEqual([
            { order: 17, width: 23, class: "uk-width-1-4" },
            { order: 18, width: 30, class: "uk-width-expand" },
            { order: 21, width: 30, class: "uk-width-expand" },
        ]);

        expect(applyClasses({ threshold: 80 }, WIDTH_MAP, [
            { order: 22, width: 30 }, // 30
            { order: 25, width: 23 }, // 23
            { order: 26, width: 15 }, // 15
            { order: 28, width: 7 },  //  7 - 75 or 83
        ])).toEqual([
            { order: 22, width: 30, class: "uk-width-expand" },
            { order: 25, width: 23, class: "uk-width-1-4" },
            { order: 26, width: 15, class: "uk-width-1-6" },
            { order: 28, width: 7, class: "uk-width-1-6"},
        ]);

        expect(applyClasses({ threshold: 80 }, WIDTH_MAP, [
            { order: 31, width: 30 }, // 30
            { order: 33, width: 15 }, // 15
            { order: 34, width: 30 }, // 30
            { order: 35, width: 15 }, // 15 - 90
        ])).toEqual([
            { order: 31, width: 30, class: "uk-width-1-3" },
            { order: 33, width: 15, class: "uk-width-1-6" },
            { order: 34, width: 30, class: "uk-width-1-3" },
            { order: 35, width: 15, class: "uk-width-1-6" },
        ]);

        expect(applyClasses({ threshold: 80 }, WIDTH_MAP, [
            { order: 36, width: 18 }, // 18
            { order: 37, width: 18 }, // 18
            { order: 38, width: 18 }, // 18
            { order: 41, width: 23 }, // 23 - 76
        ])).toEqual([
            { order: 36, width: 18, class: "uk-width-1-5" },
            { order: 37, width: 18, class: "uk-width-1-5" },
            { order: 38, width: 18, class: "uk-width-1-5" },
            { order: 41, width: 23, class: "uk-width-1-4" },
        ]);

        expect(applyClasses({ threshold: 80 }, WIDTH_MAP, [
            { order: 42, width: 23 }, // 23
            { order: 43, width: 36 }, // 36
            { order: 44, width: 30 }, // 30 - 89
        ])).toEqual([
            { order: 42, width: 23, class: "uk-width-1-4" },
            { order: 43, width: 36, class: "uk-width-expand" },
            { order: 44, width: 30, class: "uk-width-1-3" },
        ]);
    });
});

describe("smartForm", () => {
    test("adjust widths, split in columns and apply classes", () => {
        expect(smartForm(WIDTH_MAP, { maxWidth: 90, threshold: 80 }, smartFormTestData.input))
            .toEqual(smartFormTestData.expected);
    });
});
