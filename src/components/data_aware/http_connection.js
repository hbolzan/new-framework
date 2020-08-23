import DataConnection from "./data_connection.js";

const stdBuildUrl = ({ host }, resource) => `${ host }${ resource }`;

function _get(params, resource) {
    return fetch(params.buildUrl(params, resource), {
        method: "GET",
        mode: "cors",
    }).then(r => r.json());
}

function _delete(params, resource) {
    return fetch(params.buildUrl(params, resource), { method: "DELETE" }).then(r => r.json());
}

function _send(method, params, resource, payload) {
    return fetch(
        params.buildUrl(params, resource),
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
    const buildUrl = params.buildUrl || stdBuildUrl;
    return DataConnection(params, {
        get: (params, resource) => _get({ buildUrl, ...params }, resource),
        delete: (params, resource) => _delete({ buildUrl, ...params }, resource),
        post: (params, resource, payload) => _send("POST", { buildUrl, ...params }, resource, payload),
        put: (params, resource, payload) => _send("PUT", { buildUrl, ...params }, resource, payload),
    });
}

export default HttpConnection;
