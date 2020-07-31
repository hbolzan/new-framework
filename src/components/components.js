import Icons from "uikit/dist/js/uikit-icons";
import UIkit from "uikit";
import pageDom from "./dom/main_page.js";
import ComplexFormDom from "./dom/complex_form.js";
import I18n from "./i18n/i18n.js";
import HttpConnection from "./data_aware/http_connection.js";
import { v4 as uuidv4 } from "uuid";

UIkit.use(Icons);

const host = () => "http://127.0.0.1:8000",
      complexFormsResource = () => "/api/query/persistent/complex-tables/?middleware=complex_forms&depth=1&id=";

const baseComponents = {
    document,
    UIkit,
    HttpConnection,
    uuidGen: uuidv4,
    i18n: I18n("pt-BR"),
    formsConnection: HttpConnection({ host: `${ host() }${ complexFormsResource() }` }),
};

const components = Object.assign(
    baseComponents,
    {
        pageDom: mainContainerId => pageDom(baseComponents, mainContainerId),
        ComplexForm: (...params) => ComplexFormDom(baseComponents, ...params),
    }
);

export default components;
