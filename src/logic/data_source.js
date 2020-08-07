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

const newValue = fieldDef => fieldDef.default || null;

function newRecord(fieldsDefs) {
    return {
        state: recordSates.new,
        record: _.reduce(
            fieldsDefs,
            (record, fieldDef) => Object.assign({ [fieldDef.name]: newValue(fieldDef) }, record),
            {}
        )};
}

function appendRecord(data, fieldsDefs) {
    return  Object.assign(
        {},
        data,
        {
            records: data.records.concat([newRecord(fieldsDefs)]),
            recordIndex: data.records.length+1,
            state: datasetStates.insert,
        }
    );
};

export { datasetStates, recordSates, newRecord };
