import _ from "lodash";

const hiccupAttrs = hiccup => _.isObject(hiccup[1]) && ! _.isArray(hiccup[1]) ? { attrs: hiccup[1] } : null;
const hiccupInnerText = remaining => _.isString(remaining[0]) ? { innerText: remaining[0] } : null;
const parseChildren = remaining => _.map(remaining, child => hiccupToObj(child));
const hiccupChildren = children => _.isEmpty(children) ? null : { children };

function hiccupToObj(hiccup) {
    const attrs = hiccupAttrs(hiccup),
          remaining = _.slice(hiccup, attrs ? 2 : 1),
          innerText = hiccupInnerText(remaining),
          children = parseChildren(innerText ? _.slice(remaining, 1) : _.slice(remaining, 0));
    return hiccup ?
        _.merge({tag: hiccup[0]}, attrs, innerText, hiccupChildren(children)) :
        null;
}

const camelToKebab = s => s.replace(/([A-Z])/g, "-$1").toLowerCase();
const attrRenderers = {
    arr: attr => attr.join(" "),
    obj: attr => _.reduce(attr, (rendered, v, k) => `${rendered} ${camelToKebab(k)}: ${v};`, "").trim(),
};
const attrValueType = attr => _.isArray(attr) ? "arr" : ( _.isObject(attr) ? "obj" : null);
const renderAttrFn = attr => _.get(attrRenderers, attrValueType(attr), _.identity);
const renderAttrValue = attr => renderAttrFn(attr)(attr);

function renderAttrs(attrs) {
    return _.reduce(attrs, (rendered, v, attr) => `${rendered} ${camelToKebab(attr)}="${renderAttrValue(v)}"`, "");
}

function objToHtml(hiccupObj) {
    return `<${hiccupObj.tag
        }${renderAttrs(hiccupObj.attrs)
        }>${hiccupObj.innerText ? hiccupObj.innerText : ""
        }${_.map(hiccupObj.children, objToHtml).join("")
        }</${hiccupObj.tag}>`;
}

function toHtml(hiccup) {
    return objToHtml(hiccupToObj(hiccup));
}

export { toHtml, renderAttrValue, camelToKebab, hiccupToObj, objToHtml };
