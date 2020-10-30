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

function connectionByType(context, providerType) {
    return context.HttpConnection({
        ...context,
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

function get(connection, dataset, params) {
    return connection
        .get(params)
        .then(resp => dataset.loadData(resp.data))
        .then(ds => ds.rows());
}

function DSqlToRestProvider(context, type, params={}) {
    let self = context.BaseComponent(),
        lastSearchValue;

    const connection = connectionByType(context, type),
          fieldsDefs = selectedFieldsDefs(type, params.fieldsDefs),
          queryId = params.queryId,
          dataset = context.DataSet({ fieldsDefs, ...context });

    // TODO: write onCommit handler that posts changes through connection
    // context.dataset.onCommit((_, beforeRows, afterRows) => null);

    function search(searchValue) {
        lastSearchValue = searchValue;
        return get(connection, dataset, { queryId, queryParams: `?_search_=${ searchValue }`});
    }

    function refresh() {
        if (_.isUndefined(lastSearchValue)) {
            return;
        }
        search(lastSearchValue);
    }

    return Object.assign(self, {
        getOne: key => getOne(connection, dataset, key),
        get: () => get(connection, params),
        search,
        refresh,
        fieldsDefs,
        dataset,
    });
}

export default DSqlToRestProvider;
export { providerTypes };
