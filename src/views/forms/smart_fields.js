import { WIDTH_MAP, constraints, smartForm } from "../../logic/smart_forms.js";
import { hidden } from "../input/input.js";
import { formField } from "./form.js";

function smartFields(defs) {
    let visibleRows = smartForm(WIDTH_MAP, constraints(WIDTH_MAP), defs),
        hiddenFields = _.filter(defs, field => field.visible === false);

    return _.map(
        visibleRows,
        row => ["div",
                { class: "uk-grid-small", ukGrid: "uk-grid" },
                ...(_.map(row, field => formField(field))),
                ..._.map(hiddenFields, field => hidden(field))
               ]
    );
}

export { smartFields };
