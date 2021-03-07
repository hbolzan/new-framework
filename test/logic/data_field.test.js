import { validationAssignments, validationAssigner } from "../../src/logic/data_field.js";

const validation = {
    handling: {
        assignmentsPath: "data.result.subject_data",
        // assignments: {a: "x", e: "y", c: "z",},
        assignments: [
            { destination: "a", origin: "x" },
            { destination: "e", origin: "y" },
            { destination: "c", origin: "z" },
        ]
    }
};

const prefix = validation.handling.assignmentsPath,
      fields = {
          a: { name: "a", label: "A" },
          b: { name: "b", label: "B" },
          c: { name: "c", label: "C" },
          d: { name: "d", label: "D" },
          e: { name: "e", label: "E" },
          f: { name: "f", label: "F" },
      };

describe("validationAssignments", () => {
    it("filters fields that should have values assigned after field validation", () => {
        expect(validationAssignments(undefined, fields)).toEqual([]);
        expect(validationAssignments(validation, fields))
            .toEqual([
                { name: "a",  label: "A", path: "data.result.subject_data.x" },
                { name: "e",  label: "E", path: "data.result.subject_data.y" },
                { name: "c",  label: "C", path: "data.result.subject_data.z" },
            ]);
    });
});

describe("validationAssigner", () => {
    const aSetValue = jest.fn(),
          cSetValue = jest.fn(),
          eSetValue = jest.fn(),
          assignments = [
              { name: "a",  label: "A", value: aSetValue, path: "f.g.h.x" },
              { name: "c",  label: "C", value: cSetValue, path: "f.g.h.y" },
              { name: "e",  label: "E", value: eSetValue, path: "f.g.h.z" },
          ];

    it("returns a function that performs fields assignemnts", () => {
        const assigner = validationAssigner(assignments);
        assigner({f: {g: {h: {x: 1, y: 2, z: 3}}}});
        expect(aSetValue).toHaveBeenCalledWith(1);
        expect(cSetValue).toHaveBeenCalledWith(2);
        expect(eSetValue).toHaveBeenCalledWith(3);

        assigner({f: {g: {h: {x: 10, y: 20, z: 30}}}});
        expect(aSetValue).toHaveBeenCalledWith(10);
        expect(cSetValue).toHaveBeenCalledWith(20);
        expect(eSetValue).toHaveBeenCalledWith(30);
    });

    it("returns a function that does nothing if there are no assignments", () => {
        const assigner = validationAssigner([]);
        expect(assigner(undefined)).toBeUndefined();
    });
});
