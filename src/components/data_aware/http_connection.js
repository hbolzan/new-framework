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

function HttpConnection(context) {
    const buildUrl = context.buildUrl || stdBuildUrl;
    return context.DataConnection(context, {
        get: (context, resource) => _get({ buildUrl, ...context }, resource),
        delete: (context, resource) => _delete({ buildUrl, ...context }, resource),
        post: (context, resource, payload) => _send("POST", { buildUrl, ...context }, resource, payload),
        put: (context, resource, payload) => _send("PUT", { buildUrl, ...context }, resource, payload),
    });
}

export default HttpConnection;
