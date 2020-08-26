function fieldsDefsToColumnDefs(fieldsDefs) {
    return _.map(fieldsDefs, (fieldDef) => {
        return {
            headerName: fieldDef.label,
            field: fieldDef.name,
        };
    });
}

function gridOptions(columnDefs, rowData, translate) {
    return {
        columnDefs,
        rowData,
        localeTextFunc: (key, defaultValue) => {
            let s = translate(key, "grid");
            return s == key ? defaultValue : s;
        }
    };
}

function DataGrid(insertionNode, components) {
    let self = components.BaseComponent();
    const { i18n, Grid, dataProvider } = components,
          { fieldsDefs, dataset } = dataProvider,
          grid = new Grid(
              insertionNode,
              gridOptions(fieldsDefsToColumnDefs(fieldsDefs), dataset.rows(), i18n.translate)
          );

    dataset.onDataChange(ds => grid.api.setRowData(ds.rows()));

    return Object.assign(
        self,
        grid,
        {},
    );
}

export default DataGrid;
