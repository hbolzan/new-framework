import { smartFields } from "../../views/forms/smart_fields.js";
import { complexForm } from "../../views/forms/complex.js";

const refresh = (provider, complexId) => build(load(provider, complexId));

function ComplexForm(components, complexId, parentNodeId) {
    const { ComplexFormProvider, PersistentQueryProvider, ComplexFormDom, ModalSearch } = components,
          provider = ComplexFormProvider(components),
          formDom = ComplexFormDom(components, parentNodeId),
          refresh = () => build(load());

    let loaded, built, dataProvider, search;

    function buildSearch(dataProvider) {
        return ModalSearch(
            { dataProvider, ...components },
            searchValue => console.log(searchValue)
        );
    }

    function toolbarEventHandler(e, action) {
        if (action.action == "search") {
            search.show();
        }
    }

    function init(loaded) {
        if ( ! _.isUndefined(dataProvider) ) {
            return;
        }
        loaded.then(data => {
            console.log(data);
            dataProvider = PersistentQueryProvider(components, { fieldsDefs: data["fields-defs"] });
            search = buildSearch(dataProvider);
        });
    }

    function load() {
        loaded = provider.getOne(complexId);
        init(loaded);
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
