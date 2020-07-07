import { _ } from "lodash";

const WIDTH_STEPS = [7, 15, 18, 23, 30, 36, 45, 54, 60, 68, 72, 75, 999];

const WIDTH_MAP = {
    7: "uk-width-expand",
    15: "uk-width-1-6",
    18: "uk-width-1-5",
    23: "uk-width-1-4",
    30: "uk-width-1-3",
    36: "uk-width-2-5",
    45: "uk-width-1-2",
    54: "uk-width-3-5",
    60: "uk-width-2-3",
    68: "uk-width-3-4",
    72: "uk-width-4-5",
    75: "uk-width-5-6",
    90: "uk-width-1-1"
};

const lastWidth = widthMap => _.last(_.keys(widthMap))*1;

const CONSTRAINTS = {
    maxWidth: lastWidth(WIDTH_MAP),
    threshold: 75
};

const standardWidth = (widthSteps, w) => Math.min(
    CONSTRAINTS.maxWidth,
    _.takeRightWhile(widthSteps, x => x >= w)[0]*1
);

function adjustdWidth(widthSteps, field) {
    let stdWidth = standardWidth(widthSteps, field["width"]);
    return Object.assign({}, field, { width: stdWidth });
}

const adjustdWidths = (widthSteps, fields) => _.map(fields, field => adjustdWidth(widthSteps, field));

function mayAppendFieldToRow({ maxWidth }, sum, width) {
    return sum + width <= maxWidth;
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

const modifiedSum = (firstWidth, secondWidth, row) => _.reduce(
    row,
    (sum, field) => sum + (field.width == firstWidth ? secondWidth*1 : field.width*1),
    0
);

function classToApply(widthMap, row, field) {
    let widths = _.keys(widthMap),
        firstWidth = widths[0],
        secondWidth = widths[1],
        maxWidth = _.last(widths)*1;
    if ( field.width == firstWidth && modifiedSum(firstWidth, secondWidth, row) <= maxWidth) {
        return widthMap[secondWidth];
    }
    return widthMap[field.width];
}

function containsExpanded(row, widthMap) {
    let expandClass = widthMap[_.keys(widthMap)[0]];
    return _.reduce(row, (result, field) => result || field.class == expandClass, false);
}

const maxWidth = row => _.max(_.map(row, field => field.width));

function changeClassByWidth(width, newClass, field) {
    return field.width == width ? Object.assign({}, field, { class: newClass }) : field;
}

function widthIsEligibleForReview(width, threshold, widthMap) {
    return width > threshold && width != lastWidth(widthMap);
}

function reviewClasses({ threshold }, widthMap, row) {
    let widths = _.keys(widthMap);

    if (containsExpanded(row, widthMap) ||
        ! widthIsEligibleForReview(modifiedSum(widths[0], widths[1], row), threshold, widthMap)) {
        return row;
    }

    let max = maxWidth(row),
        expandClass = widthMap[widths[0]];
    return _.map(row, field => changeClassByWidth(max, expandClass, field));
}

function applyClasses(constraints, widthMap, row) {
    return reviewClasses(
        constraints,
        widthMap,
        _.map(
            row,
            field => Object.assign({}, field, { class: classToApply(widthMap, row, field) })
        )
    );
}

export {
    WIDTH_MAP,
    WIDTH_STEPS,
    standardWidth,
    adjustdWidth,
    nextSmartRow,
    smartRows,
    modifiedSum,
    classToApply,
    applyClasses
};
