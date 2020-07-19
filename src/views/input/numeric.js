import Inputmask from "inputmask";
import { parseMask } from "../../logic/mask.js";
import { inputAttrs } from "./base.js";

function inputMask(i18n, options) {
    return Inputmask(
        Object.assign(
            {
                radixPoint: i18n.translate("inputMaskDecimalSeparetor"),
                groupSeparator: i18n.translate("inputMaskGroupSeparator"),
                prefix: "",
            },
            options,
        )
    );
}

const initFn = (options) => ({ id }, { document, i18n }) =>
      inputMask(i18n, options).mask(document.getElementById(id));

const numeric = (field, options) => ["input", inputAttrs(field, { private: { init: initFn(options)} })];
const integer = field => numeric(field, { alias: "integer" });
const float = field => numeric(field, parseMask(field.mask));

export { integer, float };
