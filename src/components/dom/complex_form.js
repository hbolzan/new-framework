import { Dom } from "./dom.js";
import { smartFields } from "../../views/forms/smart_fields.js";
import { complexForm } from "../../views/forms/complex.js";

function buildComplexForm(provider, complexId) {
    return provider
        .getOne(complexId)
        .then(data => complexForm(data["title"], smartFields(data["fields-defs"])));
}

function formDom(components, provider, complexId) {
    return buildComplexForm(provider, complexId)
        .then(form => Dom(components, form));
}

function ComplexFormDom(components, complexId, parentNodeId) {
    const provider = components.DataProvider(components, "complexForm");
    return {
        render: () => formDom(components, provider, complexId).then(dom => dom.render(parentNodeId))
    };
}

export default ComplexFormDom;
