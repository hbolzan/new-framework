import Icons from "uikit/dist/js/uikit-icons";
import UIkit from "uikit";
import pageDom from "./dom/main_page.js";
import ComplexFormDom from "./dom/complex_form.js";
import ComplexForm from "./data_aware/complex_form.js";
import DataField from "./data_aware/data_field.js";
import I18n from "./i18n/i18n.js";
import HttpConnection from "./data_aware/http_connection.js";
import DSqlToRestProvider from "./data_aware/dsqltorest_provider.js";
import { providerTypes } from "./data_aware/dsqltorest_provider.js";
import { v4 as uuidv4 } from "uuid";

UIkit.use(Icons);

const host = "http://127.0.0.1:8000";

// TODO: add provider as a plugin so code doesn't need to change to set a different provider
const DataProvider = DSqlToRestProvider,
      ComplexFormProvider = components => DataProvider(components, providerTypes.complexForm),
      PersistentQueryProvider = components => DataProvider(components, providerTypes.persistentQuery);

const components = {
    document,
    host,
    i18n: I18n("pt-BR"),
    uuidGen: uuidv4,

    UIkit,
    HttpConnection,
    DataField,
    DataProvider,
    ComplexFormProvider,
    PersistentQueryProvider,

    PageDom: (components, mainContainerId) => pageDom(components, mainContainerId),
    ComplexFormDom: (components, ...params) => ComplexFormDom(components, ...params),
    ComplexForm: (components, complexId, parentNodeId) => ComplexForm(components, complexId, parentNodeId),
};

export default components;
