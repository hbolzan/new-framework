function DataSource({ connection, fieldsDefs }) {
    return {
        get: connection.get,
        post: connection.post,
        put: connection.put,
        delete: connection.delete,
    };
}
