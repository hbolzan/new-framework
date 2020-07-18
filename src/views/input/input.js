import { inputAttrs } from "./base.js";
import select from "./select.js";
import dateInput from "./date.js";

const hidden = field => ["input", inputAttrs(field, {}, "hidden")];
const text = (field) => ["input", inputAttrs(field)];

const inputByType = {
    "data/char": text,
    "data/integer": text,
    "data/date": dateInput,
    "lookup/char": select,
    "lookup/integer": select,
    "hidden": hidden,
    default: text,
};

const fieldType = (field) => field.visible ?
      `${ field["field-kind"] }/${ field["data-type"] }` :
      "hidden";
const input = (field) => (inputByType[fieldType(field)] || inputByType.default)(field);

export default input;
export { hidden };
