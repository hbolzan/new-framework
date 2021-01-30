import { MockedFetch } from "../common/mocks.js";
import BaseComponent from "../../src/components/common/base.js";
import DataConnection from "../../src/components/data_aware/data_connection.js";
import DataSet from "../../src/components/data_aware/data_set.js";
import DataField from "../../src/components/data_aware/data_field.js";
import HttpConnection from "../../src/components/data_aware/http_connection.js";
import WebMrpDataProvider from "../../src/components/data_aware/webmrp_data_provider.js";

const customerId = "c2756d01-28f4-4e7d-81a8-6c32b5333547",
      otherCustomerId = "a248dc42-1604-482d-b76e-cbf3e19a6669";
const searchResult = [
    { id: customerId, name: "Xyzv" },
    { id: otherCustomerId, name: "Xyzw" }
];
const getOneResult = { id: customerId, name: "First Customer" };

const host = "http://test",
      responses = {
          [`${ host }/api/data/legacy/customers/${ customerId }`]: {
              GET: {
                  status: 200,
                  body: { data: [ getOneResult ] }
              },
          },

          [`${ host }/api/data/legacy/customers?searchValue=xyz&searchFields=id,name`]: {
              GET: {
                  status: 200,
                  body: { data: searchResult },
              }
          }
      };

const context = {
    host,
    global: { fetch: MockedFetch(responses) },
    BaseComponent,
    DataSet,
    DataField,
    DataConnection,
    HttpConnection,
};

describe("WebMrpDataProvider", () => {
    const provider = WebMrpDataProvider(
        context,
        {
            searchDataset: "legacy.customers",
            searchFields: "id,name",
            fieldsDefs: [ { name: "id" }, { name: "name" } ]
        }
    );

    it("fetches one item by key from source at service", () => {
        return provider.getOne(customerId)
            .then(data => expect(data).toEqual(getOneResult));
    });

    it("fetches a list of items from source at specified service", () => {
        return provider.search("xyz")
            .then(data => expect(data).toEqual(searchResult));
    });
});
