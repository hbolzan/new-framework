import _ from "lodash";

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
    let params = _params || {};
    return ["button", buttonAttrs({ class: buttonClasses(params) }, params)]
        .concat(params.label ? params.label : [])
        .concat(children);
}

function buttonGroup(align, ...children) {
    const validAlignment = (a) => ["left", "right"].includes(a) ? a : "left";
    return [
        "div",
        {
            class: [`uk-align-${ validAlignment(align) }`],
            style: {backgroundColor: "#f9f9f9", padding: "4px", margin: "2px" }
        }
    ]
        .concat(children);
}

function toolBar(...children) {
    return ["div", { style: { height: "67px" } }, ...children];
}

export { buttonClasses, buttonAttrs, singleButton, buttonGroup, toolBar };
