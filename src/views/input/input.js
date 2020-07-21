import { inputAttrs } from "./base.js";
import select from "./select.js";
import dateInput from "./date.js";
import maskedInput from "./masked_input.js";
import { integer, float } from "./numeric.js";
import textArea from "./text_area.js";

const hidden = field => ["input", inputAttrs(field, {}, "hidden")];
const text = field => field.mask ? maskedInput(field) : ["input", inputAttrs(field)];

const inputByType = {
    "data/char": text,
    "data/integer": integer,
    "data/float": float,
    "data/date": dateInput,
    "data/memo": textArea,
    "lookup/char": select,
    "lookup/integer": select,
    "hidden": hidden,
    default: text,
};

const fieldType = field => field.visible ?
      `${ field["field-kind"] }/${ field["data-type"] }` :
      "hidden";
const input = field => (inputByType[fieldType(field)] || inputByType.default)(field);

export default input;
export { hidden };
