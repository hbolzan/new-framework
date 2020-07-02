import _ from "lodash";

function renderAttrs(attrs) {
    return _.reduce(attrs, (rendered, v, attr) => `${rendered} ${attr}="${v}"`, "");
}

function toHtml(hiccup) {
    return `<${hiccup[0]}${renderAttrs(hiccup[1])}></${hiccup[0]}>`;
}

export { toHtml };
