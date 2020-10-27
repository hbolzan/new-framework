import { WIDTH_MAP, constraints, smartForm } from "../../logic/smart_forms.js";
import { hidden } from "../input/input.js";
import { formField } from "./form.js";

function smartFields(context) {
    let { fieldsDefs, dataFields } = context,
        visibleFields = smartForm(WIDTH_MAP, constraints(WIDTH_MAP), fieldsDefs),
        hiddenFields = _.filter(fieldsDefs, field => field.visible === false);

    return _.map(
        visibleFields,
        row => ["div",
                { class: "uk-grid-small", ukGrid: "uk-grid" },
                ...(_.map(
                    row,
                    fieldDef => formField({ ...context, fieldDef, dataField: dataFields[fieldDef.name] })
                )),]
    ).concat(
        _.map(hiddenFields, fieldDef => hidden(fieldDef))
    );
}

export default smartFields;
