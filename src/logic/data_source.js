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

function newRecord(fieldsDefs, dataSet, DataField) {
    return {
        state: recordSates.new,
        record: _.reduce(
            fieldsDefs,
            (record, fieldDef) => Object.assign({ [fieldDef.name]: DataField(fieldDef, dataSet) }, record),
            {}
        )};
}

function appendRecord(dataSet, fieldsDefs, DataField, data) {
    return  Object.assign(
        {},
        data,
        {
            records: data.records.concat(newRecord(fieldsDefs, dataSet, DataField)),
            recordIndex: data.records.length+1,
            state: datasetStates.insert,
        }
    );
};

export { datasetStates, recordSates, appendRecord };
