if (window._ == undefined) {
    window._ = require("lodash");
}

const isPromise = x => x?.then && typeof(x.then) === "function" ? true : false;
const first = x => ( _.isArray(x) && x.length  > 0 ) ? x[0] : null;

export { isPromise, first };
