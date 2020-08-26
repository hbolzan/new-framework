import BaseComponent from "../common/base.js";
import DataSet from "./data_set.js";

const persistentQueryBaseURL = "/api/query/persistent";
const providerTypes = {
    complexForm: "complexForm",
    persistentQuery: "persistentQuery",
};

const complexFormFieldsDefs = _.map([
    "id",
    "dataset-name",
    "title",
    "pk-fields",
    "auto-pk",
    "order-by-fields",
    "permissions",
    "fields-defs"
], fieldName => ({ name: fieldName }));

function complexFormURL({ host }, formId) {
    return `${ host
           }${ persistentQueryBaseURL
           }/complex-tables/?middleware=complex_forms&depth=1&id=${ formId
           }`;
}

function persistentQueryURL({ host }, { queryId, queryParams }) {
    return `${ host }${ persistentQueryBaseURL }/${ queryId }/${ queryParams }`;
}

const urlBuilders = {
    [providerTypes.complexForm]: complexFormURL,
    [providerTypes.persistentQuery]: persistentQueryURL,
};

function connectionByType({ host, HttpConnection }, providerType) {
    return HttpConnection({
        host,
        buildUrl: urlBuilders[providerType],
    });
}

function selectedFieldsDefs(type, fieldsDefs) {
    return ! fieldsDefs && type == providerTypes.complexForm && complexFormFieldsDefs ?
        complexFormFieldsDefs :
        fieldsDefs;
}

function getOne(connection, dataset, key) {
    return connection
        .get(key)
        .then(resp => dataset.loadData(resp.data.slice(0, 1)))
        .then(ds => ds.rows()[0]);
}

function DSqlToRestProvider(components, type, params={}) {
    let self = BaseComponent();
    const connection = connectionByType(components, type),
          fieldsDefs = selectedFieldsDefs(type, params.fieldsDefs),
          queryId = params.queryId,
          dataset = DataSet({ fieldsDefs, ...components });

    // TODO: write onCommit handler that posts changes through connection
    // components.dataset.onCommit((_, beforeRows, afterRows) => null);

    return Object.assign(self, {
        getOne: key => getOne(connection, dataset, key),
        fieldsDefs,
        dataset,
    });
}

export default DSqlToRestProvider;
export { providerTypes };
