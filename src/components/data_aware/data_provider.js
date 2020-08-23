import BaseComponent from "../common/base.js";
import DataSet from "./data_set.js";

function DataProvider(components, { connection, fieldsDefs }) {
    let self = BaseComponent();
    const dataset = DataSet(components, { connection, fieldsDefs });
    dataset.onCommit((_, beforeRows, afterRows) => null);

    return Object.assign(self, {
        fieldsDefs, // schema
        dataset,
    });
}

export default DataProvider;
