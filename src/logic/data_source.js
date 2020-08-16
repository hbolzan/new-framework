const datasetStates = {
    inactive: "inactive",
    browse: "browse",
    edit: "edit",
    insert: "insert",
};

const recordSates = {
    new: "new",
    browse: "browse",
    edit: "edit",
};

function dataFields({ dataSet, fieldsDefs, DataField, eventHandlers }) {
    return _.reduce(
        fieldsDefs,
        (fields, fieldDef) => Object.assign({
            [fieldDef.name]: DataField(fieldDef, dataSet, eventHandlers || [])
        }, fields),
        {}
    );
}

function newRow(fieldsDefs, rowData={}) {
    return _.reduce(
        fieldsDefs,
        (row, fieldDef) => Object.assign(
            {},
            row,
            { [fieldDef.name]: rowData[fieldDef.name] || fieldDef.default || null }
        ),
        {}
    );
}

function appendRow(data, fieldsDefs, rowData) {
    return  Object.assign(
        {},
        data,
        {
            rows: data.rows.concat(newRow(fieldsDefs, rowData)),
            recordIndex: data.records.length+1,
            state: datasetStates.insert,
        }
    );
};

export { datasetStates, recordSates, dataFields, newRow, appendRow };
