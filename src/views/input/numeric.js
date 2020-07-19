import Inputmask from "inputmask";
import { inputAttrs } from "./base.js";

function inputMask(i18n, digits) {
    return Inputmask({
        alias: "decimal",
        radixPoint: i18n.translate("inputMaskDecimalSeparetor"),
        groupSeparator: i18n.translate("inputMaskGroupSeparator"),
        digits: digits,
    });
}

function init({ id }, { document, i18n }) {
    inputMask(i18n, 0).mask(document.getElementById(id));
}

function integer(field) {
    return ["input", inputAttrs(field, { private: { init: init } })];
}

export { integer };
