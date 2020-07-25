import { Dom } from "./dom.js";
import { smartFields } from "../../views/forms/smart_fields.js";
import { complexForm } from "../../views/forms/complex.js";

function buildComplexForm({ formsConnection }, complexId) {
    return formsConnection
        .get(complexId)
        .then(resp => complexForm(resp.data[0].title, smartFields(resp.data[0]["fields-defs"])));
}

function formDom(components, complexId) {
    return buildComplexForm(components, complexId)
        .then(form => Dom(components, form));
}

function ComplexFormDom(components, complexId, parentNodeId) {
    return {
        render: () => formDom(components, complexId).then(dom => dom.render(parentNodeId))
    };
}

export default ComplexFormDom;
