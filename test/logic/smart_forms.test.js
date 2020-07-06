import { _ } from "lodash";
import {
    WIDTH_MAP,
    WIDTH_STEPS,
    standardWidth,
    smartDistribution,
    adjustdWidth,
    nextSmartRow,
    smartRows,
    modifiedSum,
    classToApply,
    applyClasses
} from "../../src/logic/smart_forms.js";

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
    test("change width to standard width", () => {
        expect(adjustdWidth(WIDTH_STEPS, { name: "x", width: 20 }))
            .toEqual({ name: "x", width: 23 });
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


describe("applyClasses happy path", () => {
    test("single field in a row", () => {
        expect(applyClasses(WIDTH_MAP, [{ order: 2, width: 90 }]))
            .toEqual([{ order: 2, width: 90, class: "uk-width-1-1" }]);
        expect(applyClasses(WIDTH_MAP, [{ order: 2, width: 72 }]))
            .toEqual([{ order: 2, width: 72, class: "uk-width-4-5" }]);
    });

    test("multiple fields in a row", () => {
        expect(applyClasses(WIDTH_MAP, [{ order: 3, width: 23 }, { order: 4, width: 68 }]))
            .toEqual([
                { order: 3, width: 23, class: "uk-width-1-4" },
                { order: 4, width: 68, class: "uk-width-3-4" }
            ]);
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

    test("don't apply extended if it would sum to less than total width", () => {
        expect(classToApply(WIDTH_MAP, [{ width: 15 }, { width: 7 }, { width: 30 }], { width: 7 }))
            .toEqual("uk-width-1-6");
    });
});

describe("applyClasses corner cases", () => {
    test("we don't want a single field with expand class", () => {
        expect(applyClasses(WIDTH_MAP, [{ order: 1, width: 7 }]))
            .toEqual([{ order: 1, width: 7, class: "uk-width-1-6" }]);
    });

    test("convert expand fields to 1/6 if the new total width is less than maximum", () => {
        expect(applyClasses(WIDTH_MAP, [
            { order: 1, width: 7 },
            { order: 2, width: 7 },
            { order: 3, width: 7 },
            { order: 4, width: 7 },
            { order: 5, width: 18 }
        ]))
            .toEqual([
                { order: 1, width: 7, class: "uk-width-1-6" },
                { order: 2, width: 7, class: "uk-width-1-6" },
                { order: 3, width: 7, class: "uk-width-1-6" },
                { order: 4, width: 7, class: "uk-width-1-6" },
                { order: 5, width: 18, class: "uk-width-1-5" }
            ]);
    });
});

// describe("splitToRows", () => {
//     let input = [
//         { order: 1, width: 24 },
//         { order: 2, width: 46 },
//         { order: 3, width: 20 },
//         { order: 4, width: 70 },
//         { order: 5, width: 10 },
//     ],
//         expected = [
//             [
//                 { order: 1, width: 30 },
//                 { order: 2, width: 54 },
//             ],
//             [
//                 { order: 3, width: 23 },
//                 { order: 4, width: 72 },
//             ],
//             [
//             ]
//         ]
//     test("split fields list to rows limited to maximum width", () => {
//         expect(splitToRows([{ width}]));
//     });
// });

// describe("smartDistribution", () => {
//     test("limit fields by row", () => {
//         expect(smartDistribution(WIDTH_STEPS, 90, fields)).toEqual(expectedRows);
//     });
// });
