import DataConnection from "./data_connection.js";

function _get(params, resource) {
    return params.JSON.parse(params.localStorage.getItem(resource));
};

function _set(params, resource, payload) {
    params.localStorage.setItem(resource, params.JSON.stringify(payload));
    return _get(params, resource);
}

function _delete(params, resource) {
    params.localStorage.removeItem(resource);
    return true;
}

function LocaStorageConnection(params) {
    return DataConnection(params, {
        get: _get,
        delete: _delete,
        post: _set,
        put: _set,
    });
}

export default LocaStorageConnection;
