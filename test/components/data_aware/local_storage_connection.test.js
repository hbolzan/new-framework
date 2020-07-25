import LocaStorageConnection from "../../../src/components/data_aware/local_storage_connection.js";

const identity = x => x;

const mockedJSON = {
    stringify: identity,
    parse: identity,
};

function mockedLocalStorage() {
    let storage = {};
    return {
        getItem: resource => storage[resource],
        setItem: (resource, payload) => storage[resource] = payload,
        removeItem: resource => delete(storage[resource]),
    };
}

describe("LocalStorageConnection", () => {
    let params = { JSON: mockedJSON, localStorage: mockedLocalStorage() };
    let storage = LocaStorageConnection(params);
    it("posts data to resource", () => {
        expect.assertions(1);
        return storage.post("test", { a: 1, b: 2 })
            .then(data => expect(data).toEqual({ status: "OK", data: [{ a: 1, b: 2 }]}));
    });

    it("gets data from resource", () => {
        expect.assertions(1);
        return storage.get("test")
            .then(data => expect(data).toEqual({ status: "OK", data: [{ a: 1, b: 2 }]}));
    });

    it("deletes resource", () => {
        expect.assertions(2);
        storage.delete("test").then(result => expect(result).toBe(true));
        return storage.get("test").then(data => expect(data).toEqual({ status: "OK", data: [] }));
    });
});
