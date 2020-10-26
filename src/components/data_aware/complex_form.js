import smartFields from "../../views/forms/smart_fields.js";
import { complexForm, toolbarActions } from "../../views/forms/complex.js";

const refresh = (provider, complexId) => build(load(provider, complexId));

function ComplexForm(context, complexId, parentNodeId) {
    let loaded, built, dataProvider, search;
    const { ComplexFormProvider, PersistentQueryProvider, ComplexFormDom, ModalSearch } = context,
          provider = ComplexFormProvider(context),
          formDom = ComplexFormDom(context, parentNodeId),
          refresh = () => build(load()),
          actions = {
              [toolbarActions.search.action]: () => search.show(),
          },
          toolbarEventHandler = (e, action) => actions[action] ? actions[action]() : null;

    function initSearch(dataProvider) {
        return ModalSearch(
            { dataProvider, ...context },
            {
                onSearch: searchValue => dataProvider.search(searchValue),
                // onSelectRow: node => console.log(node),
            }
        );
    }

    function init(loaded) {
        if ( ! _.isUndefined(dataProvider) ) {
            return;
        }
        loaded.then(data => {
            dataProvider = PersistentQueryProvider(
                context,
                {
                    fieldsDefs: data["fields-defs"],
                    queryId: data["dataset-name"],
                }
            );
            search = initSearch(dataProvider);
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
            smartFields({
                ...context,
                fieldsDefs: data["fields-defs"],
                dataFields: dataProvider.dataset.fields,
            }),
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
