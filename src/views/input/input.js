import { inputAttrs } from "./base.js";
import select from "./select.js";
import dateInput from "./date.js";
import maskedInput from "./masked_input.js";
import { integer, float } from "./numeric.js";
import textArea from "./text_area.js";
import XLookupInput from "./x_lookup_input.js";

const hidden = field => ["input", inputAttrs(field, {}, "hidden")];
const text = field => field.mask ? maskedInput(field) : ["input", inputAttrs(field)];

const types = {
    "data/char": text,
    "data/integer": integer,
    "data/float": float,
    "data/date": dateInput,
    "data/memo": textArea,
    "lookup/char": select,
    "lookup/integer": select,
    "x-lookup/integer": { AltConstructor: XLookupInput },
    "hidden": hidden,
    default: text,
};

const fieldType = field => field.visible ?
      `${ field["field-kind"] }/${ field["data-type"] }` :
      "hidden";
const inputView = field => types[fieldType(field)] || types.default;
function input(field) {
    const view = inputView(field);
    return view.AltConstructor ? view.AltConstructor(field).hiccup : view(field);
}

function DefaultConstructor(hiccup) {
    return {
        hiccup,
        inputAttrs: () => hiccup[1],
    };
}

function Input(context) {
    const { fieldDef } = context,
          view = inputView(fieldDef);
    return view.AltConstructor ? view.AltConstructor(context) : DefaultConstructor(view(fieldDef));
}

export default input;
export { hidden, Input };
