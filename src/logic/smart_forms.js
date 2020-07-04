import { _ } from "lodash";

const MAX_WIDTH = 90;
const widthMap = {
    7: "x",
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
    999: "1-1" // 80
};

const standardWidth = (wm, w) => Math.min(80, _.takeRightWhile(_.keys(wm), x => x >= w)[0]*1);
const adjustdWidths = (wm, fields) => _.map(fields, f => )

function smartDistribution(widthMap, maxWidth, fields) {
}

export { widthMap, standardWidth, smartDistribution };
