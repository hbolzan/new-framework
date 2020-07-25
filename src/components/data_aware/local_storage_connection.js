import DataConnection from "./data_connection.js";

function _get(params, resource) {
    return {
        status: "OK",
        data: [params.JSON.parse(params.localStorage.getItem(resource))].filter(x => x != undefined),
    };
};

function _set(params, resource, payload) {
    params.localStorage.setItem(resource, params.JSON.stringify(payload));
    return _get(params, resource);
}

function _delete(params, resource) {
    params.localStorage.removeItem(resource);
    return true;
}

function promiseRequest(resolveFn, ...args) {
    return new Promise((resolve, reject) => resolve(resolveFn(...args)));
}

function LocaStorageConnection(params) {
    return DataConnection(params, {
        get: (params, resource) => promiseRequest(_get, params, resource),
        delete: (params, resource) => promiseRequest(_delete, params, resource),
        post: (params, resource, payload) => promiseRequest(_set, params, resource, payload),
        put: (params, resource, payload) => promiseRequest(_set, params, resource, payload),
    });
}

export default LocaStorageConnection;
