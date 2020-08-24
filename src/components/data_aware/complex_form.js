import { Dom } from "../dom/dom.js";
import { smartFields } from "../../views/forms/smart_fields.js";
import { complexForm } from "../../views/forms/complex.js";

const refresh = (provider, complexId) => build(load(provider, complexId));

function ComplexForm(components, complexId, parentNodeId) {
    const provider = components.ComplexFormProvider(components),
          formDom = components.ComplexFormDom(components, parentNodeId),
          refresh = () => build(load()),
          modalSearch = components.Modal(components, "Teste", ["p", "Este é o modal de busca!"]);

    let loaded, built;

    function toolbarEventHandler(e, action) {
        if (action.action == "search") {
            modalSearch.show();
        }
    }

    function load() {
        loaded = provider.getOne(complexId);
        return loaded;
    }

    function build(loaded) {
        built = loaded.then(data => complexForm(
            data["title"],
            smartFields(data["fields-defs"]),
            null,
            toolbarEventHandler
        ));
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
