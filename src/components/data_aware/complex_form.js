import { Dom } from "../dom/dom.js";
import { smartFields } from "../../views/forms/smart_fields.js";
import { complexForm } from "../../views/forms/complex.js";

const load = (provider, complexId) => provider.getOne(complexId),
      refresh = (provider, complexId) => build(load(provider, complexId));

function ComplexForm(components, complexId, parentNodeId) {
    const provider = components.ComplexFormProvider(components),
          formDom = components.ComplexFormDom(components, parentNodeId),
          build = loaded => loaded.then(builder);

    let loaded, built, definition;

    function builder(data) {
        definition = data;
        return complexForm(data["title"], smartFields(data["fields-defs"]));
    }

    function refresh() {
        loaded = load(provider, complexId);
        built = build(loaded);
    }
    refresh();

    return {
        definition,
        refresh,
        build: () => build(loaded),
        render: () => formDom.render(built),
    };
}

export default ComplexForm;
