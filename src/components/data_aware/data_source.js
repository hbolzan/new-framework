import { datasetStates, recordSates, dataFields, newRow, appendRow } from "../../logic/data_source.js";
import BaseComponent from "../common/base.js";

const events = {
    beforeEdit: "beforeEdit",
    afterEdit: "afterEdit",
    beforeInsert: "beforeInsert",
    afterInsert: "afterInsert",
    beforePost: "beforePost",
    afterPost: "afterPost",
    beforeCommit: "beforeCommit",
    afterCommit: "afterCommit",
    beforeDelete: "beforeDelete",
    afterDelete: "afterDelete",
    onStateChange: "onStateChange",
    onDataChange: "onDataChange",
    beforeScroll: "beforeScroll",
    afterScroll: "afterScroll",
};

const navMethods = {
    first: (data) => data.rows.length > 0 ? 0 : data.recordIndex,
    prior: (data) => data.recordIndex > 0 ? data.recordIndex - 1 : data.recordIndex,
    next: (data) => data.recordIndex < data.rows.length - 1 ? data.recordIndex + 1 : data.recordIndex,
    last: (data) => data.rows.length - 1,
};

function throwIfInactive(self, data) {
    if (data == datasetStates.inactive) {
        throw {
            origin: self,
            message: "cannot perform this operation on a closed dataset",
        };
    }
}

function resetData({ rows, recordIndex, state }) {
    return {
        rows: rows || [],
        recordIndex: recordIndex || -1,
        state: state || datasetStates.inactive,
        modified: false,
    };
}

function fieldChangeHandler(self) {
    dataField => self.events.run(events.onDataChange, [self, dataField]);
}

function DataSet({ connection, DataField, fieldsDefs }) {
    let self = BaseComponent(),
        fields = dataFields({
            dataSet: self,
            fieldsDefs,
            DataField,
            eventHandlers: [
                { onChange: fieldChangeHandler(self) },
                { onChange: dataField => self.edit() },
            ],
        }),
        data = resetData({});

    function loadData(newRows) {
        let rows = _.map(newRows, rowData => newRow(fieldsDefs, rowData));
        data = resetData({
            rows,
            recordIndex: navMethods["first"](data),
            state: datasetStates.browse
        });
        self.events.run(events.onDataChange, [self]);
        self.events.run(events.onStateChange, [self, data.state]);
        self.events.run(events.afterScroll, [self]);
    }

    function append() {
        throwIfInactive(self, data);
        self.events.run(events.beforeInsert, [self]);
        data = appendRow(data, fieldsDefs);
        self.events.run(events.afterInsert, [self]);
        self.events.run(events.onStateChange, [self, data.state]);
        return data.rows[data.recordIndex];
    }

    function edit() {
        throwIfInactive(self, data);
        if (data.state == datasetStates.edit || data.state == datasetStates.insert) {
            return data.records[data.recordIndex];
        }
        if (data.recordIndex < 0) {
            return append();
        }
        self.events.run(events.beforeEdit, [self]);
        data.state = datasetStates.edit;
        self.events.run(events.afterEdit, [self]);
        self.events.run(events.onStateChange, [self, data.state]);
        return data.records[data.recordIndex];
    }

    function post() {
        self.events.run(events.beforePost, [self]);
        data.state = datasetStates.browse;
        self.events.run(events.afterPost, [self]);
        self.events.run(events.onStateChange, [self, data.state]);
    }

    function commit() {
        self.events.run(events.beforeCommit, [self]);
        // TODO: implement commit to API action (modified must be reset to false)
        data.state = datasetStates.browse;
        self.events.run(events.afterCommit, [self]);
        self.events.run(events.onStateChange, [self, data.state]);
    }

    function _delete() {
        self.events.run(events.beforeDelete, [self]);
        // TODO: implement delete action (modified must be true)
        data.state = datasetStates.browse;
        self.events.run(events.afterDelete, [self]);
        self.events.run(events.onStateChange, [self, data.state]);
    }

    function navigate(direction) {
        let recordIndex = data.recordIndex;
        self.events.run(events.beforeScroll, [self]);
        data.recordIndex = navMethods[direction](data);
        self.events.run(events.afterScroll, [self]);
        if (data.recordIndex != recordIndex) {
            self.events.run(events.onDataChange, [self]);
        };
    }

    return Object.assign(
        self,

        _.reduce(events, (handlers, event) => Object.assign(
            {},
            handlers,
            { [event]: handler => self.events.on(event, handler) }
        ), {}),

        _.reduce(navMethods, (nav, _, d) => Object.assign({}, nav, { [d]: navigate(d) }), {}),

        {
            rows: () => data.rows,
            recordIndex: () => data.recordIndex,
            state: () => data.state,
            eof: () => data.recordIndex == data.records.length-1,
            bof: () => data.recordIndex <= 0,
            isEmpty: () => data.records.length == 0,

            loadData,
            append,
            edit,
            post,
            commit,
            delete: _delete,
        });
}

function DataSource({ connection, fieldsDefs }) {
    let self = BaseComponent();
    const dataset = DataSet({ connection, fieldsDefs });

    return Object.assign(self, {
        fieldsDefs, // schema
        dataset,
    });
}

export { DataSet, DataSource };
