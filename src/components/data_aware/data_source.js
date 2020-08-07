import { datasetStates, recordSates, appendRecord } from "../../logic/data_source.js";

function DataSet({ connection, fieldsDefs }) {
    let data = {
        records: [],
        recordIndex: -1,
        state: datasetStates.inactive,
        modified: false,
    };

    function append() {
        data = appendRecord(data, fieldsDefs);
        return data.records[data.recordIndex];
    }

    return {
        records: () => data.records,
        recordIndex: () => data.recordIndex,
        state: () => data.state,
        eof: () => data.recordIndex == data.records.length-1,
        bof: () => data.recordIndex <= 0,
        isEmpty: () => data.records.length == 0,
        append,
    };
}

function DataSource({ connection, fieldsDefs }) {
    const dataset = DataSet({ connection });

    return {
        fieldsDefs, // schema
    };
}
