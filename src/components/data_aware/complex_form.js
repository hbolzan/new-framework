import smartFields from "../../views/forms/smart_fields.js";
import { complexForm } from "../../views/forms/complex.js";
import { actionGroups } from "../../views/button/toolbar.js";

const refresh = (provider, complexId) => build(load(provider, complexId));

function ComplexForm(context, complexId, parentNodeId) {
    let loaded, built, dataProvider, search;
    const {
        ComplexFormProvider,
        PersistentQueryProvider,
        ComplexFormDom,
        DataToolbar,
        ModalSearch,
        UIkit
    } = context,
          provider = ComplexFormProvider(context),
          formDom = ComplexFormDom(context, parentNodeId),
          refresh = () => build(load());

    function initSearch(dataProvider) {
        return ModalSearch(
            { dataProvider, ...context },
            {
                onSearch: searchValue => dataProvider.search(searchValue),
                onSelectRow: node => dataProvider.dataset.seek(node.rowIndex),
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
            setDatasetEventHandlers();
            search = initSearch(dataProvider);
        });
    }

    function load() {
        loaded = provider.getOne(complexId);
        init(loaded);
        return loaded;
    }

    function build(loaded) {
        built = loaded.then(
            data => complexForm(
                data["title"],
                smartFields(
                    {
                        ...context,
                        fieldsDefs: data["fields-defs"],
                        dataFields: dataProvider.dataset.fields(),
                    }
                ),
                null,
                DataToolbar(
                    { ...context, dataProvider, search },
                    [actionGroups.nav, actionGroups.crud, actionGroups.additional],
                ).hiccup(),
            )
        );
        return built;
    }

    function render() {
        if ( _.isUndefined(built) ) {
            refresh();
        }
        formDom.render(built);
    }

    async function handleBeforeDelete() {
        return UIkit.modal.confirm("Tem certeza????");
    }

    function setDatasetEventHandlers(args) {
        dataProvider.dataset.beforeDelete(() => UIkit.modal.confirm("Tem certeza?"));
        dataProvider.dataset.beforeDelete(() => UIkit.modal.confirm("Mas tem certeza mesmo????"));
    }

    return {
        definition: callback => loaded.then(data => callback(data)),
        refresh,
        render,
    };
}

export default ComplexForm;
