if (window._ == undefined) {
    window._ = require("lodash");
}

const isPromise = x => x?.then && typeof(x.then) === "function" ? true : false;
const first = x => ( _.isArray(x) && x.length  > 0 ) ? x[0] : null;
const capitalize = s => s.replace(/^\w/, (c) => c.toUpperCase());

function assocIf(o, key, value) {
    if ( _.isNull(value) || _.isUndefined(value) ) {
        return o;
    }
    return { ...(o || {}), [ key ]: value };
}

export { isPromise, first, capitalize, assocIf };
