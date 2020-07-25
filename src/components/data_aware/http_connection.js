import DataConnection from "./data_connection.js";

function buildUrl({ host }, resource) {
    return `${ host }${ resource }`;
}

function _get(params, resource) {
    return fetch(buildUrl(params, resource), {
        method: "GET",
        mode: "cors",
    }).then(r => r.json());
}

function _delete(params, resource) {
    return fetch(buildUrl(params, resource), { method: "DELETE" }).then(r => r.json());
}

function _send(method, params, resource, payload) {
    return fetch(
        buildUrl(params, resource),
        {
            method: method,
            body: params.JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            }
        }
    ).then(r => r.json());
}

function HttpConnection(params) {
    return DataConnection(params, {
        get: (params, resource) => _get(params, resource),
        delete: (params, resource) => _delete(params, resource),
        post: (params, resource, payload) => _send("POST", params, resource, payload),
        put: (params, resource, payload) => _send("PUT", params, resource, payload),
    });
}

export default HttpConnection;
