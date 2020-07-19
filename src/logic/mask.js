if (window._ == undefined) {
    window._ = require("lodash");
}

const length = s => (s || "").length;

function maskParts (mask = "") {
    let parts = mask.trim().split(".");
    return {
        integer: parts[0] || "",
        integerCount: length(parts[0]),
        decimal: parts[1] || "",
        decimalCount: length(parts[1]),
    };
}

const maskAlias = parts =>
      ! _.isEmpty(parts.decimal) && parts.decimal == "9".repeat(parts.decimalCount) ?
      "currency" :
      "numeric";

const maskMax = parts => ("9".repeat(parts.integerCount) + "." + "9".repeat(parts.decimalCount))*1;

function parseMask(mask) {
    let parts = maskParts(mask);
    return Object.assign(
        { alias: maskAlias(parts) },
        _.isEmpty(mask) ? {} : { digits: parts.decimalCount },
    );
}

export { parseMask };
