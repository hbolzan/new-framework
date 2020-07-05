const smartFormTestData = {
    input: [
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
    ],

    expected: [
        [
            { order: 1, width: 7, classSuffix: "expand" },   //  7
            { order: 3, width: 15, classSuffix: "1-6" },  // 15
            { order: 4, width: 18, classSuffix: "1-5" },  // 18
            { order: 5, width: 18, classSuffix: "1-5" },  // 18
            { order: 6, width: 18, classSuffix: "1-5" },  // 18
            { order: 7, width: 23, classSuffix: "1-4" },  // 23 - 81
        ],
        [
            { order: 8, width: 18, classSuffix: "1-5" },  // 18
            { order: 9, width: 36, classSuffix: "2-6" },  // 36
            { order: 11, width: 23, classSuffix: "1-4" }, // 23 - 77
        ],
        [
            { order: 14, width: 23, classSuffix: "1-4" }, // 23
            { order: 16, width: 23, classSuffix: "1-4" }, // 23
            { order: 17, width: 23, classSuffix: "1-4" }, // 23 - 69
        ],
        [
            { order: 18, width: 30, classSuffix: "1-3" }, // 30
            { order: 21, width: 30, classSuffix: "1-3" }, // 30
            { order: 22, width: 30, classSuffix: "1-3" }, // 30 - 90
        ],
        [
            { order: 25, width: 23, classSuffix: "1-4" }, // 23
            { order: 26, width: 15, classSuffix: "1-6" }, // 15
            { order: 28, width: 7, classSuffix: "expand"},  //  7
            { order: 31, width: 30, classSuffix: "1-3" }, // 30
            { order: 33, width: 15, classSuffix: "1-6" }, // 15 - 90
        ],
        [
            { order: 34, width: 30, classSuffix: "1-3" }, // 30
            { order: 35, width: 15, classSuffix: "1-6" }, // 15
            { order: 36, width: 18, classSuffix: "1-5" }, // 18
            { order: 37, width: 18, classSuffix: "1-5" }, // 18 - 81
        ],
        [
            { order: 38, width: 18, classSuffix: "1-5" }, // 18
            { order: 41, width: 23, classSuffix: "1-5" }, // 23
            { order: 42, width: 23, classSuffix: "1-5" }, // 23 - 64
        ],
        [
            { order: 43, width: 36, classSuffix: "2-5" }, // 36
            { order: 44, width: 30, classSuffix: "1-3" }, // 30 - 66
        ],
    ]
};

export { smartFormTestData };
