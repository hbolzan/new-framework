import { inputAttrs } from "./base.js";
import { mergeAttrs } from "../../logic/hiccup.js";
import { capitalize } from "../../logic/misc.js";

function xLookupInput(field, search) {
    const attrs = inputAttrs(field, { style: { cursor: "pointer" }, readonly: true, onclick: () => search.show() }),
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

function provider(context) {
    const { fieldDef, DataProvider, fieldsDefs } = context;
    return DataProvider(
        context,
        {
            fieldsDefs,
            searchDataset: fieldDef.xLookup.source,
            searchFields: `${ fieldDef.xLookup.key },${ fieldDef.xLookup.result }`,
        }
    );
}

let view;

function initSearch(context) {
    const { fieldDef, ModalSearch, dataProvider, dataField, dataInput } = context;
    return ModalSearch(
        context,
        {
            onSearch: searchValue => dataProvider.search(searchValue),
            onSelectRow: node => {
                const dataFields = dataField.dataSet.fields(),
                      searchKey = node.data[fieldDef.xLookup.key],
                      result = node.data[fieldDef.xLookup.result];
                dataFields[fieldDef.xLookup.displayField].value(result);
                dataField.value(searchKey);
                dataInput.node.value(searchKey, dataField, dataField.dataSet);
            },
        }
    );
}

function XLookupInput(context) {
    const { fieldDef } = context,
          fieldsDefs = searchFieldDefs(fieldDef.xLookup),
          dataProvider = provider({ ...context, fieldsDefs }),
          search = initSearch({ dataProvider, ...context, fieldsDefs });

    view = xLookupInput(fieldDef, search);
    return {
        hiccup: view.hiccup,
        inputAttrs: () => view.inputHiccup[1]
    };
}

export default XLookupInput;
