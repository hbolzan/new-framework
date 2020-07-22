import DataConnection from "./data_connection.js";

function HttpConnection(params) {
    return Object.assign(
        {
            _get(params, resource) {
                return fetch(params.url)
            }
        },
        DataConnection(params));
}
