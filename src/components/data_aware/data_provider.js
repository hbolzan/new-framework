import BaseComponent from "../common/base.js";
import DataSet from "./data_set.js";

function DataProvider(context, { connection, fieldsDefs }) {
    let self = BaseComponent();
    const dataset = DataSet(context, { connection, fieldsDefs });
    dataset.onCommit((_, beforeRows, afterRows) => null);

    return Object.assign(self, {
        fieldsDefs, // schema
        dataset,
    });
}

export default DataProvider;
