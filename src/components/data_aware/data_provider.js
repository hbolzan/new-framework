function DataProvider(context, { connection, fieldsDefs }) {
    let self = context.BaseComponent();
    const dataSet = context.DataSet(context, { connection, fieldsDefs });
    dataSet.onCommit((_, beforeRows, afterRows) => null);

    return Object.assign(self, {
        fieldsDefs, // schema
        dataSet,
    });
}

export default DataProvider;
