function promiseRequest(resolveFn, ...args) {
    return new Promise((resolve, reject) => resolve(resolveFn(...args)));
}

function DataConnection(params, connector) {
    return {
        get: resource => promiseRequest(connector.get, params, resource),
        delete: resource => promiseRequest(connector.delete, params, resource),
        post: (resource, payload) => promiseRequest(connector.post, params, resource, payload),
        put: (resource, payload) => promiseRequest(connector.put, params, resource, payload),
    };
}

export default DataConnection;
