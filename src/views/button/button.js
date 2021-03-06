import _ from "lodash";
import { ALIGN_LEFT, ALIGN_RIGHT } from "../common/consts.js";

const buttonTypes = {
    default: "uk-button-default",
    primary: "uk-button-primary",
    secondary: "uk-button-secondary",
    danger: "uk-button-danger",
    text: "uk-button-text",
    link: "uk-button-link"
};

function buttonClasses(params = {}) {
    const attrsClass = _.get(params, "attrs.class");
    return ["uk-button", buttonTypes[params.type] || buttonTypes.default]
        .concat(attrsClass ? attrsClass : []);
}

function buttonAttrs(attrs, params = {}) {
    return _.merge(attrs, _.pickBy(params.attrs, (v, k) => k != "class"));
}

function singleButton(_params, ...children) {
    const params = _params || {};
    return ["button", buttonAttrs({ class: buttonClasses(params) }, params)]
        .concat(params.label ? params.label : [])
        .concat(children);
}

function buttonGroup(align, ...children) {
    const validAlignment = (a) => [ALIGN_LEFT, ALIGN_RIGHT].includes(a) ? a : ALIGN_LEFT;
    return [
        "div",
        {
            class: [`uk-align-${ validAlignment(align) }`],
            style: {backgroundColor: "#f9f9f9", padding: "4px", margin: "2px" }
        }
    ]
        .concat(children);
}

export { buttonClasses, buttonAttrs, singleButton, buttonGroup };
