import { Dom } from "../dom/dom.js";
import { smartFields } from "../../views/forms/smart_fields.js";
import { complexForm } from "../../views/forms/complex.js";

const refresh = (provider, complexId) => build(load(provider, complexId));

function ComplexForm(components, complexId, parentNodeId) {
    const provider = components.ComplexFormProvider(components),
          formDom = components.ComplexFormDom(components, parentNodeId),
          refresh = () => build(load());

    let loaded, built;

    function load() {
        loaded = provider.getOne(complexId);
        return loaded;
    }

    function build(loaded) {
        built = loaded.then(data => complexForm(data["title"], smartFields(data["fields-defs"])));
        return built;
    }

    function render() {
        if ( _.isUndefined(built) ) {
            refresh();
        }
        formDom.render(built);
    }

    return {
        definition: callback => loaded.then(data => callback(data)),
        refresh,
        render,
    };
}

export default ComplexForm;
