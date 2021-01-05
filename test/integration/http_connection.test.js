import { MockedFetch } from "../common/mocks.js";
import DataConnection from "../../src/components/data_aware/data_connection.js";
import HttpConnection from "../../src/components/data_aware/http_connection.js";

const host = "http://test",
      responses = {
          [`${ host }/api/test`]: {
              GET: { status: 200, body: { test: "TEST" } },
          }
      };

const context = {
    host,
    global: { fetch: MockedFetch(responses) },
    DataConnection,
};

describe("HttpConnection", () => {
    const conn = HttpConnection(context);
    it("Fetches data from resource at host defined in context", () => {
        return conn.get("/api/test")
            .then(body => expect(body).toEqual({ test: "TEST" }));
    });
});
