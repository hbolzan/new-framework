if (window._ == undefined) {
    window._ = require("lodash");
}

function objectToQueryParams(args) {
    const queryParams = _.map(args, (v, k) => `${ k }=${ v }`).join("&");
    return _.isEmpty(queryParams) ? "" : `?${ queryParams }`;
}

const withQueryParams = (url, args) => `${ url }${ objectToQueryParams(args) }`;

export { withQueryParams, objectToQueryParams };
