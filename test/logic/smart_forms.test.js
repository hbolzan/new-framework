import { _ } from "lodash";
import {
    WIDTH_MAP,
    WIDTH_STEPS,
    standardWidth,
    smartDistribution,
    adjustdWidth,
    nextSmartRow,
    smartRows
} from "../../src/logic/smart_forms.js";

describe("standardWidth", () => {
    test("convert width to standard width", () => {
        expect(standardWidth(WIDTH_STEPS, 1)).toBe(7);
        expect(_.map([7, 15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 80], _.partial(standardWidth, WIDTH_STEPS)))
            .toEqual([7, 15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 80]);
        expect(_.map([6, 14, 17, 22, 29, 35, 44, 53, 59, 67, 71, 74, 79], _.partial(standardWidth, WIDTH_STEPS)))
            .toEqual([7, 15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 80]);
        expect(_.map([8, 16, 19, 24, 31, 37, 46, 55, 61, 69, 73, 76, 81], _.partial(standardWidth, WIDTH_STEPS)))
            .toEqual([15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 80, 80]);
    });
});

describe("adjustdWidth", () => {
    test("change width to standard width", () => {
        expect(adjustdWidth(WIDTH_STEPS, { name: "x", width: 20 }))
            .toEqual({ name: "x", width: 23 });
    });
});

describe("nextSmartRow", () => {
    test("accept total width above maximum width when current sum is under threshold", () => {
        let input = [{ order: 3, width: 23 }, { order: 4, width: 72 }, { order: 5, width: 15 },],
            expected = [{ order: 3, width: 23 }, { order: 4, width: 72 },];
        expect(nextSmartRow({ maxWidth: 90, threshold: 65, tolerance: 10 }, input))
            .toEqual({
                next: expect.arrayContaining(expected),
                remaining: expect.arrayContaining([{ order: 5, width: 15 }])
            });
    });

    test("don't go above maximum width when current sum is beyond threshold", () => {
        let input = [{ order: 2, width: 72 }, { order: 3, width: 23 }, { order: 5, width: 15 },],
            expected = [{ order: 2, width: 72 },];
        expect(nextSmartRow({ maxWidth: 90, threshold: 65, tolerance: 10 }, input))
            .toEqual({
                next: expect.arrayContaining(expected),
                remaining: expect.arrayContaining([{ order: 3, width: 23 }, { order: 5, width: 15 }])
            });
    });

    test("achieve last row", () => {
        let input = [{ order: 3, width: 23 }, { order: 5, width: 15 }],
            expected = [{ order: 3, width: 23 }, { order: 5, width: 15 }];
        expect(nextSmartRow({ maxWidth: 90, threshold: 65, tolerance: 10 }, input))
            .toEqual({
                next: expect.arrayContaining(expected),
                remaining: []
            });
    });
});

describe("smartRows", () => {
    test("convert a list of fields into a list of rows", () => {
        let input = [{ order: 3, width: 23 }, { order: 4, width: 72 }, { order: 5, width: 15 }],
            expected = [[{ order: 3, width: 23 }, { order: 4, width: 72 },], [{ order: 5, width: 15 }]];
        expect(smartRows({ maxWidth: 90, threshold: 65, tolerance: 10 }, input))
            .toEqual(expected);
    });

    test("a different order changes the distribution", () => {
        let input = [{ order: 2, width: 72 }, { order: 3, width: 23 }, { order: 5, width: 15 }],
            expected = [[{ order: 2, width: 72 }], [{ order: 3, width: 23 }, { order: 5, width: 15 }]];
        expect(smartRows({ maxWidth: 90, threshold: 65, tolerance: 10 }, input))
            .toEqual(expected);
    });
});

describe("applyClassSuffixes happy path", () => {
    test("single field in a row", () => {
        expect(applyClassSuffixes([{ order: 2, width: 80 }]))
            .toEqual([{ order: 2, width: 80, classSuffix: "1-1" }]);
        expect(applyClassSuffixes([{ order: 2, width: 72 }]))
            .toEqual([{ order: 2, width: 80, classSuffix: "4-5" }]);
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
