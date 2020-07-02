import _ from "lodash";

const renderClassAttr = (mandatory, other) => _.filter(_.concat(mandatory, other)).join(" ");

export { renderClassAttr };
