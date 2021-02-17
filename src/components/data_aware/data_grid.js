const events = {
    onRowDoubleClicked: "onRowDoubleClicked",
    onRowClicked: "onRowClicked",
    onCellFocused: "onCellFocused",
    onCellKeyPress: "onCellKeyPress",
    onCellKeyDown: "onCellKeyDown",
};

function fieldsDefsToColumnDefs(fieldsDefs) {
    return _.map(fieldsDefs, (fieldDef) => {
        return {
            headerName: fieldDef.label,
            field: fieldDef.name,
        };
    });
}

function gridOptions(columnDefs, rowData, eventHandlers, translate) {
    return Object.assign(
        {
            columnDefs,
            rowData,
            localeTextFunc: (key, defaultValue) => {
                let s = translate(key, "grid");
                return s == key ? defaultValue : s;
            }
        },
        eventHandlers,
    );
}

function DataGrid(insertionNode, context) {
    let self = context.BaseComponent();
    const { i18n, Grid, dataProvider } = context,
          { fieldsDefs, dataSet } = dataProvider,
          eventHandlers = _.reduce(events, (handlers, event) => Object.assign(
              {},
              handlers,
              { [event]: (e) => self.events.run(event, [e, self]) }
          ), {}),
          grid = new Grid(
              insertionNode,
              gridOptions(fieldsDefsToColumnDefs(fieldsDefs), dataSet.rows(), eventHandlers, i18n.translate)
          );

    dataSet.onDataChange(ds => grid.gridOptions.api.setRowData(ds.rows()));

    return Object.assign(
        self,

        _.reduce(events, (handlers, event) => Object.assign(
            {},
            handlers,
            { [event]: handler => self.events.on(event, handler) }
        ), {}),

        grid,
        {},
    );
}

export default DataGrid;
