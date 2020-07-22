function DataConnection(params, connector) {
    return {
        get: resource => connector.get(params, resource),
        delete: resource => connector.delete(params, resource),
        post: (resource, payload) => connector.post(params, resource, payload),
        put: (resource, payload) => connector.put(params, resource, payload),
    };
}

export default DataConnection;
