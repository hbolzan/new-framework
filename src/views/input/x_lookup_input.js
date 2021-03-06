import { inputAttrs } from "./base.js";
import { mergeAttrs } from "../../logic/hiccup.js";
import { capitalize, assocIf } from "../../logic/misc.js";

function xLookupInput(field, search) {
    const attrs = inputAttrs(field, { style: { cursor: "pointer" }, readonly: true, onclick: () => search.clearSearch().show() }),
          iconAttrs = { class: ["uk-form-icon", "uk-form-icon-flip"], ukIcon: "icon: search" },
          inputHiccup = ["input", attrs],
          hiccup = ["div", { style: { width: "100%" } },
                    ["div", { class: ["uk-inline"], style: { width: "100%" } },
                     ["span", iconAttrs],
                     inputHiccup]];

    return { hiccup, inputHiccup };
}

function searchFieldDefs({ key, result, keyLabel, resultLabel }) {
    return [
        { name: key, label: keyLabel || capitalize(key) },
        { name: result, label: resultLabel || capitalize(result) },
    ];
}

function filterParams(fieldDef) {
    return assocIf(
        assocIf(
            null,
            "filterBy", fieldDef.xLookup?.filter?.by
        ),
        "filterWith",
        fieldDef.xLookup?.filter?.with
    );
}

function provider(context) {
    const { fieldDef, DataProvider, fieldsDefs } = context;
    return DataProvider(
        context,
        {
            fieldsDefs,
            searchDataset: fieldDef.xLookup.source,
            searchFields: `${ fieldDef.xLookup.key },${ fieldDef.xLookup.result }`,
            ...filterParams(fieldDef),
        }
    );
}

// TODO: make it work with composite filters, i.e. { filterBy: "uf,pais", filterWith: "uf,pais"}
function searchFilter({ dataField }) {
    const params = filterParams(dataField.fieldDef),
          rowData = dataField.dataSet.selectedRow() || {};
    if ( ! params ) {
        return null;
    }
    return { ...params, filterWith: rowData[params.filterWith] || "" };
}

function initSearch(context) {
    const { fieldDef, ModalSearch, dataProvider, dataField, dataInput } = context,
          self = ModalSearch(
              context,
              {
                  onSearch: searchValue => dataProvider.search(searchValue, searchFilter(context)),
                  onSelectRow: handleSearchResult,
              }
          );

    function handleSearchResult(node) {
        const dataFields = dataField.dataSet.fields(),
              searchKey = node.data[fieldDef.xLookup.key],
              result = node.data[fieldDef.xLookup.result];
        dataFields[fieldDef.xLookup.displayField].value(result);
        dataField.value(searchKey);
        dataInput.node.value(searchKey, dataField, dataField.dataSet);
    }

    return {
        ...self,
        clearSearch: () => {
            dataProvider.dataSet.clear();
            return self;
        },
    };
}

function XLookupInput(context) {
    const { fieldDef } = context,
          fieldsDefs = searchFieldDefs(fieldDef.xLookup),
          dataProvider = provider({ ...context, fieldsDefs }),
          search = initSearch({ dataProvider, ...context, fieldsDefs }),
          view = xLookupInput(fieldDef, search);
    return {
        hiccup: view.hiccup,
        inputAttrs: () => view.inputHiccup[1]
    };
}

export default XLookupInput;
