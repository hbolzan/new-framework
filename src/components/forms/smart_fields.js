import { WIDTH_MAP, constraints, smartForm } from "../../logic/smart_forms.js";
import { formInputField } from "./form.js";

function smartFields(defs) {
    let visibleRows = smartForm(WIDTH_MAP, constraints(WIDTH_MAP), defs),
        hiddenFields = _.filter(defs, field => field.visible === false);

    return _.map(
        visibleRows,
        row => ["div",
                { class: "uk-grid-small", ukGrid: "uk-grid" },
                ...(_.map(row, field => formInputField(field)))]
    );
}

export { smartFields };
