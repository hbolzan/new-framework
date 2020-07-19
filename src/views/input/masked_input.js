import { trace } from "../../common/misc.js";
import Inputmask from "inputmask";
import { inputAttrs } from "./base.js";

function init ({ id, self }, { document }) {
    console.log(self);
    Inputmask({
        mask: self.private.field.mask,
        clearIncomplete: true,
    }).mask(document.getElementById(id));
}

function maskedInput(field) {
    return ["input", inputAttrs(field, { private: { init: init } })];
}

export default maskedInput;
