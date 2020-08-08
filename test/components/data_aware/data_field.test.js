import { DataField } from "../../../src/components/data_aware/data_field.js";

const mockedDataSet = {
    edit: jest.fn(),
    afterPost: jest.fn(),
};

const fieldsDefs = [
    { name: "a", default: "ABC", label: "Field A" },
    { name: "b", default: 123, label: "Field B" },
    { name: "c", label: "Field C" },
];

describe("DataField", () => {

    it("self registers in dataset afterPost listener", () => {
        DataField(fieldsDefs[0], mockedDataSet);
        expect(mockedDataSet.afterPost).toHaveBeenCalled();
        // expect(mockedDataSet.edit).toHaveBeenCalledTimes(0);
    });

    it("is initialized with fieldDef default value", () => {
        expect(DataField(fieldsDefs[0], mockedDataSet).value()).toBe("ABC");
        expect(DataField(fieldsDefs[1], mockedDataSet).value()).toBe(123);
    });

    it("is initialized with null if there is no default value", () => {
        expect(DataField(fieldsDefs[2], mockedDataSet).value()).toBeNull();
    });

    it("has all fieldDef attributes", () => {
        let dataField = DataField(fieldsDefs[0], mockedDataSet);
        expect(dataField.name).toBe("a");
        expect(dataField.default).toBe("ABC");
        expect(dataField.label).toBe("Field A");
    });

    it("changes valueChanged state when a new value is set " +
       "and triggers onChange event which calls dataset edit method", () => {
           let dataField = DataField(fieldsDefs[0], mockedDataSet);
           expect(dataField.valueChanged()).toBe(false);
           dataField.value("XYZ");
           expect(dataField.value()).toBe("XYZ");
           expect(dataField.valueChanged()).toBe(true);

           expect(mockedDataSet.edit).toHaveBeenCalled();
       });
});
