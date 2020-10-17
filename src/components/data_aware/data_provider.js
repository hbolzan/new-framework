function DataProvider(context, { connection, fieldsDefs }) {
    let self = context.BaseComponent();
    const dataset = context.DataSet(context, { connection, fieldsDefs });
    dataset.onCommit((_, beforeRows, afterRows) => null);

    return Object.assign(self, {
        fieldsDefs, // schema
        dataset,
    });
}

export default DataProvider;
