import { _ } from "lodash";
import { widthMap, standardWidth, smartDistribution } from "../../src/logic/smart_forms.js";

describe("standardWidth", () => {
    test("convert width to standard width", () => {
        expect(standardWidth(widthMap, 1)).toBe(7);
        expect(_.map([7, 15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 80], _.partial(standardWidth, widthMap)))
            .toEqual([7, 15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 80]);
        expect(_.map([6, 14, 17, 22, 29, 35, 44, 53, 59, 67, 71, 74, 79], _.partial(standardWidth, widthMap)))
            .toEqual([7, 15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 80]);
        expect(_.map([8, 16, 19, 24, 31, 37, 46, 55, 61, 69, 73, 76, 81], _.partial(standardWidth, widthMap)))
            .toEqual([15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 80, 80]);
    });
});

const fields = [
    { order: 1, width: 7 },   //  7
    { order: 3, width: 11 },  // 15
    { order: 4, width: 18 },  // 18
    { order: 5, width: 16 },  // 18
    { order: 6, width: 16 },  // 18
    { order: 7, width: 20 },  // 23 - 81
    { order: 8, width: 16 },  // 18
    { order: 9, width: 35 },  // 36
    { order: 11, width: 19 }, // 23 - 77
    { order: 14, width: 20 }, // 23
    { order: 16, width: 19 }, // 23
    { order: 17, width: 19 }, // 23 - 69
    { order: 18, width: 24 }, // 30
    { order: 21, width: 28 }, // 30
    { order: 22, width: 25 }, // 30 - 90
    { order: 25, width: 19 }, // 23
    { order: 26, width: 10 }, // 15
    { order: 28, width: 6 },  //  7
    { order: 31, width: 28 }, // 30
    { order: 33, width: 15 }, // 15 - 90
    { order: 34, width: 28 }, // 30
    { order: 35, width: 10 }, // 15
    { order: 36, width: 17 }, // 18
    { order: 37, width: 18 }, // 18 - 81
    { order: 38, width: 18 }, // 18
    { order: 41, width: 20 }, // 23
    { order: 42, width: 20 }, // 23 - 64
    { order: 43, width: 32 }, // 36
    { order: 44, width: 30 }, // 30 - 66
];

const expectedRows = [
    [
        { order: 1, width: 7 },   //  7
        { order: 3, width: 15 },  // 15
        { order: 4, width: 18 },  // 18
        { order: 5, width: 18 },  // 18
        { order: 6, width: 18 },  // 18
        { order: 7, width: 23 },  // 23 - 81
    ],
    [
        { order: 8, width: 18 },  // 18
        { order: 9, width: 36 },  // 36
        { order: 11, width: 23 }, // 23 - 77
    ],
    [
        { order: 14, width: 23 }, // 23
        { order: 16, width: 23 }, // 23
        { order: 17, width: 23 }, // 23 - 69
    ],
    [
        { order: 18, width: 30 }, // 30
        { order: 21, width: 30 }, // 30
        { order: 22, width: 30 }, // 30 - 90
    ],
    [
        { order: 25, width: 23 }, // 23
        { order: 26, width: 15 }, // 15
        { order: 28, width: 7 },  //  7
        { order: 31, width: 30 }, // 30
        { order: 33, width: 15 }, // 15 - 90
    ],
    [
        { order: 34, width: 30 }, // 30
        { order: 35, width: 15 }, // 15
        { order: 36, width: 18 }, // 18
        { order: 37, width: 18 }, // 18 - 81
    ],
    [
        { order: 38, width: 18 }, // 18
        { order: 41, width: 23 }, // 23
        { order: 42, width: 23 }, // 23 - 64
    ],
    [
        { order: 43, width: 36 }, // 36
        { order: 44, width: 30 }, // 30 - 66
    ],
]

describe("smartDistribution", () => {
    test("limit fields by row", () => {
        expect(smartDistribution(widthMap, 90, fields)).toEqual(expectedRows);
    });
});
