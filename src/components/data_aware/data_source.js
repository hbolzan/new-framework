import { registerEvent } from "../../logic/components.js";
import { runEvent } from "../common/controller.js";
import { datasetStates, recordSates, appendRecord } from "../../logic/data_source.js";
import { DataField } from "./data_field.js";

const events = {
    beforeEdit: "beforeEdit",
    afterEdit: "afterEdit",
    beforeInsert: "beforeInsert",
    afterInsert: "afterInsert",
    beforePost: "beforePost",
    afterPost: "afterPost",
};

function throwIfInactive(self, data) {
    if (data == datasetStates.inactive) {
        throw {
            origin: self,
            message: "cannot perform this operation in a closed dataset",
        };
    }
}

function DataSet({ connection, fieldsDefs }) {
    let self = new Object,
        registeredEvents = {};

    let data = {
        records: [],
        recordIndex: -1,
        state: datasetStates.inactive,
        modified: false,
    };

    function append() {
        throwIfInactive(self, data);
        runEvent(events.beforeInsert, registeredEvents, [self]);
        data = appendRecord(self, fieldsDefs, DataField, data);
        runEvent(events.afterInsert, registeredEvents, [self]);
        return data.records[data.recordIndex];
    }

    function edit() {
        throwIfInactive(self, data);
        if (data.state == datasetStates.edit || data.state == datasetStates.insert) {
            return [];
        }
        if (data.recordIndex < 0) {
            return append();
        }
        runEvent(events.beforeEdit, registeredEvents, [self]);
        data.state = datasetStates.edit;
        runEvent(events.afterEdit, registeredEvents, [self]);
        return data.records[data.recordIndex];
    }

    return Object.assign(
        self,
        {
            records: () => data.records,
            recordIndex: () => data.recordIndex,
            state: () => data.state,
            eof: () => data.recordIndex == data.records.length-1,
            bof: () => data.recordIndex <= 0,
            isEmpty: () => data.records.length == 0,
            beforePost: handler =>
                registeredEvents = registerEvent(events.beforePost, handler, registeredEvents),
            afterPost: handler =>
                registeredEvents = registerEvent(events.afterPost, handler, registeredEvents),
            beforeEdit: handler =>
                registeredEvents = registerEvent(events.beforeEdit, handler, registeredEvents),
            afterEdit: handler =>
                registeredEvents = registerEvent(events.afterEdit, handler, registeredEvents),
            beforeInsert: handler =>
                registeredEvents = registerEvent(events.beforeInsert, handler, registeredEvents),
            afterInsert: handler =>
                registeredEvents = registerEvent(events.afterInsert, handler, registeredEvents),
            append,
        });
}

function DataSource({ connection, fieldsDefs }) {
    const dataset = DataSet({ connection, fieldsDefs });

    return {
        fieldsDefs, // schema
        dataset,
    };
}

export { DataSource };
