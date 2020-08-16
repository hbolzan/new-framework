import { DataSet } from "../../../src/components/data_aware/data_source.js";

describe("DataSet", () => {
    const DataField = jest.fn(),
          fieldsDefs = [{ name: "a" }, { name: "b" }];
    it("initializes data fields", () => {
        let dataSet = DataSet({ DataField, fieldsDefs });
        expect(DataField).toHaveBeenCalledTimes(2);
    });
});
