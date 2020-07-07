const smartFormTestData = {
    input: [
        { order: 1, width: 7 },   //  7
        { order: 3, width: 11 },  // 15
        { order: 4, width: 18 },  // 18
        { order: 5, width: 16 },  // 18
        { order: 6, width: 16 },  // 18 - 76 or 84
        { order: 7, width: 20 },  // 23
        { order: 8, width: 16 },  // 18
        { order: 9, width: 35 },  // 36 - 77
        { order: 11, width: 19 }, // 23
        { order: 14, width: 20 }, // 23
        { order: 16, width: 19 }, // 23 - 69
        { order: 17, width: 19 }, // 23
        { order: 18, width: 24 }, // 30
        { order: 21, width: 28 }, // 30 - 83
        { order: 22, width: 25 }, // 30
        { order: 25, width: 19 }, // 23
        { order: 26, width: 10 }, // 15
        { order: 28, width: 6 },  //  7 - 75 or 83
        { order: 31, width: 28 }, // 30
        { order: 33, width: 15 }, // 15
        { order: 34, width: 28 }, // 30
        { order: 35, width: 10 }, // 15 - 90
        { order: 36, width: 17 }, // 18
        { order: 37, width: 18 }, // 18
        { order: 38, width: 18 }, // 18
        { order: 41, width: 20 }, // 23 - 76
        { order: 42, width: 20 }, // 23
        { order: 43, width: 32 }, // 36
        { order: 44, width: 30 }, // 30 - 89
    ],

    expected: [
        [
            { order: 1, width: 7, class: "uk-width-1-6" },
            { order: 3, width: 15, class: "uk-width-1-6" },
            { order: 4, width: 18, class: "uk-width-expand" },
            { order: 5, width: 18, class: "uk-width-expand" },
            { order: 6, width: 18, class: "uk-width-expand" },
        ],
        [
            { order: 7, width: 23, class: "uk-width-1-4" },  // 23
            { order: 8, width: 18, class: "uk-width-1-5" },  // 18
            { order: 9, width: 36, class: "uk-width-2-5" },  // 36
        ],
        [
            { order: 11, width: 23, class: "uk-width-1-4" }, // 23
            { order: 14, width: 23, class: "uk-width-1-4" }, // 23
            { order: 16, width: 23, class: "uk-width-1-4" }, // 23 - 69
        ],
        [
            { order: 17, width: 23, class: "uk-width-1-4" },
            { order: 18, width: 30, class: "uk-width-expand" },
            { order: 21, width: 30, class: "uk-width-expand" },
        ],
        [
            { order: 22, width: 30, class: "uk-width-expand" },
            { order: 25, width: 23, class: "uk-width-1-4" },
            { order: 26, width: 15, class: "uk-width-1-6" },
            { order: 28, width: 7, class: "uk-width-1-6"},
        ],
        [
            { order: 31, width: 30, class: "uk-width-1-3" },
            { order: 33, width: 15, class: "uk-width-1-6" },
            { order: 34, width: 30, class: "uk-width-1-3" },
            { order: 35, width: 15, class: "uk-width-1-6" },
        ],
        [
            { order: 36, width: 18, class: "uk-width-1-5" },
            { order: 37, width: 18, class: "uk-width-1-5" },
            { order: 38, width: 18, class: "uk-width-1-5" },
            { order: 41, width: 23, class: "uk-width-1-4" },
        ],
        [
            { order: 42, width: 23, class: "uk-width-1-4" },
            { order: 43, width: 36, class: "uk-width-expand" },
            { order: 44, width: 30, class: "uk-width-1-3" },
        ],
    ]
};

export { smartFormTestData };
