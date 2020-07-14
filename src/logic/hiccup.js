import _ from "lodash";

const hiccupAttrs = hiccup => hiccup ?
      (_.isObject(hiccup[1]) && ! _.isArray(hiccup[1]) ? { attrs: hiccup[1] } : null) :
      null;
const hiccupInnerText = remaining => _.isString(remaining[0]) ? { innerText: remaining[0] } : null;
const parseChildren = (remaining, idGenFn) => _.map(remaining, child => hiccupToObj(child, idGenFn));
const hiccupChildren = children => _.isEmpty(children) ? null : { children };
const withId = (attrs, idGenFn) => (attrs || {}).id ? attrs : Object.assign( { id: idGenFn() }, attrs);

function hiccupToObj(hiccup, idGenFn) {
    const allAttrs = hiccupAttrs(hiccup) || {},
          attrs = _.omit(allAttrs, ["attrs.private"]),
          remaining = _.slice(hiccup, _.isEmpty(attrs) ? 1 : 2),
          innerText = hiccupInnerText(remaining),
          children = parseChildren(innerText ? _.slice(remaining, 1) : _.slice(remaining, 0), idGenFn);
    return hiccup ?
        _.merge(
            { tag: hiccup[0] },
            { attrs: withId(attrs.attrs, idGenFn) },
            { private: _.get(allAttrs, "attrs.private", {}) },
            innerText,
            hiccupChildren(children)
        ) :
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
    return _.reduce(
        attrs,
        (rendered, v, attr) => `${ rendered } ${ camelToKebab(attr) }="${ renderAttrValue(v)}"`, ""
    );
}

function objToHtml(hiccupObj) {
    return hiccupObj ?
        `<${ hiccupObj.tag
        }${ renderAttrs(hiccupObj.attrs)
        }>${ hiccupObj.innerText ? hiccupObj.innerText : ""
        }${ _.map(hiccupObj.children, objToHtml).join("")
        }</${ hiccupObj.tag }>` :
        "ERRO";
}

function toHtml(hiccup, idGenFn) {
    return objToHtml(hiccupToObj(hiccup, idGenFn));
}

export { toHtml, renderAttrValue, camelToKebab, hiccupToObj, objToHtml };
