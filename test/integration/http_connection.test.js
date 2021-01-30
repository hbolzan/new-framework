import "regenerator-runtime/runtime";
import fetchMock from "jest-fetch-mock";
import DataConnection from "../../src/components/data_aware/data_connection.js";
import HttpConnection from "../../src/components/data_aware/http_connection.js";

fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
});

const context = {
    host: "http://test",
    global: { fetch },
    DataConnection,
};

describe("HttpConnection", () => {
    it("Fetches data from resource at host defined in context", async () => {
        fetch.mockResponseOnce(JSON.stringify({ body: { test: "TEST" } }));
        const conn = HttpConnection(context);
        const result = await conn.get("/api/test");
        expect(result).toEqual({ body: { test: "TEST" } });
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("http://test/api/test", { method: "GET", mode: "cors" });
    });
});
