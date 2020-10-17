const events = {
    onRowDoubleClicked: "onRowDoubleClicked",
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
    console.log(eventHandlers);
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

function DataGrid(insertionNode, components) {
    let self = components.BaseComponent();
    const { i18n, Grid, dataProvider } = components,
          { fieldsDefs, dataset } = dataProvider,
          eventHandlers = _.reduce(events, (handlers, event) => Object.assign(
              {},
              handlers,
              { [event]: (e) => self.events.run(event, [e, self]) }
          ), {}),
          grid = new Grid(
              insertionNode,
              gridOptions(fieldsDefsToColumnDefs(fieldsDefs), dataset.rows(), eventHandlers, i18n.translate)
          );

    dataset.onDataChange(ds => grid.gridOptions.api.setRowData(ds.rows()));

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