import { _ } from "lodash";

const CONSTRAINTS = {
    maxWidth: 90,
    threshold: 65,
    tolerance: 10
};

const WIDTH_STEPS = [7, 15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 999];

const WIDTH_MAP = {
    7: "expand",
    15: "1-6",
    18: "1-5",
    23: "1-4",
    30: "1-3",
    36: "2-5",
    45: "1-2",
    54: "3-5",
    60: "2-3",
    68: "3-4",
    72: "4-5",
    75: "5-6",
    80: "1-1"
};

const standardWidth = (widthSteps, w) => Math.min(80, _.takeRightWhile(widthSteps, x => x >= w)[0]*1);

function adjustdWidth(widthSteps, field) {
    let stdWidth = standardWidth(widthSteps, field["width"]);
    return Object.assign({}, field, { width: stdWidth });
}

const adjustdWidths = (widthSteps, fields) => _.map(fields, field => adjustdWidth(widthSteps, field));

function mayAppendFieldToRow({ maxWidth, threshold, tolerance }, sum, width) {
    return sum + width <= maxWidth || (sum < threshold && sum + width <= maxWidth + threshold);
};

function smartRow(constraints, result, field) {
    if (! result.achieved && mayAppendFieldToRow(constraints, result.sum, field.width)) {
        result.next = result.next.concat(field);
        result.sum += field.width;
    } else {
        result.remaining = result.remaining.concat(field);
        result.achieved = true;
    }
    return result;
}

function nextSmartRow(constraints, fields) {
    return (({ next, remaining }) => ({ next, remaining }))(
        _.reduce(
            fields,
            _.partial(smartRow, constraints),
            { next: [], remaining: [], sum: 0, achieved: false }
        )
    );
}

function smartRows(constraints, fields) {
    let result = [],
        row = { next: [], remaining: fields };

    while (! _.isEmpty(row.remaining)) {
        row = nextSmartRow(constraints, row.remaining);
        result.push(row.next);
    }
    return result;
}

export { WIDTH_MAP, WIDTH_STEPS, standardWidth, adjustdWidth, nextSmartRow, smartRows };
