const baseUrl = "/api/data";

function objectToQueryParams(args) {
    const queryParams = _.map(args, (v, k) => `${ k }=${ v }`).join("&");
    return _.isEmpty(queryParams) ? "" : `?${ queryParams }`;
}

const withKey = (url, key) => _.isEmpty(key) ? url : `${ url }/${ key }`;
const withQueryParams = (url, args) => `${ url }${ objectToQueryParams(args) }`;

function urlWithKey({ host }, { key, args }, provider, source) {
    return withKey(
        `${ host }/${ baseUrl }/${ provider }/${ source }`,
        key
    );
}

function oneUrl({ host }, { key }, provider, source) {
    return `${ host }${ baseUrl }/${ provider }/${ source }/${ key }`;
}

function searchUrl({ host }, { searchValue }, provider, source, searchFields) {
    return withQueryParams(
        `${ host }${ baseUrl }/${ provider }/${ source }`,
        { searchValue, searchFields }
    );
}

function expandedResource(resource) {
    const [_provider, _source] = resource.split("."),
          provider = _source  ? _provider : "legacy",
          source = _source || _provider;
    return { provider, source };
}

function buildUrl({ searchDataset, searchFields }) {
    const { provider, source } = expandedResource(searchDataset);

    return (context, params) => {
        const { mode, key } = params;
        if ( mode === "one" ) {
            return oneUrl(context, params, provider, source);
        }
        return searchUrl(context, params, provider, source, searchFields);
    };
}

function get(connection, dataSet, params) {
    return connection
        .get(params)
        .then(resp => dataSet.loadData(resp.data))
        .then(ds => ds.rows());
}

function getOne(connection, dataSet, key) {
    return connection
        .get({ mode: "one", "key": key })
        .then(resp => dataSet.loadData(resp.data))
        .then(ds => ds.rows()[0]);
}

function WebMrpDataProvider(context, params={}) {
    let self = context.BaseComponent(),
        lastSearchValue;

    const connection = context.HttpConnection({ ...context, buildUrl: buildUrl(params) }),
          dataSet = context.DataSet({ fieldsDefs: params.fieldsDefs, ...context });

    function search(searchValue) {
        lastSearchValue = searchValue;
        return get(connection, dataSet, { mode: "search", searchValue });
    }

    return Object.assign(self, {
        getOne: key => getOne(connection, dataSet, key),
        search,
        fieldsDefs: params.fieldsDefs,
        dataSet,
    });
}

export default WebMrpDataProvider;
