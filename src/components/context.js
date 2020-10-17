import Icons from "uikit/dist/js/uikit-icons";
import UIkit from "uikit";
import Dom from "./dom/dom.js";
import PageDom from "./dom/main_page.js";
import BaseComponent from "./common/base.js";
import Modal from "./common/modal.js";
import ModalSearch from "./data_aware/modal_search.js";
import ComplexFormDom from "./dom/complex_form.js";
import ComplexForm from "./data_aware/complex_form.js";
import DataField from "./data_aware/data_field.js";
import DataGrid from "./data_aware/data_grid.js";
import I18n from "./i18n/i18n.js";
import HttpConnection from "./data_aware/http_connection.js";
import DSqlToRestProvider from "./data_aware/dsqltorest_provider.js";
import { Grid } from 'ag-grid-community';
import { providerTypes } from "./data_aware/dsqltorest_provider.js";
import { v4 as uuidv4 } from "uuid";

UIkit.use(Icons);

const host = "http://127.0.0.1:8000";

// TODO: add provider as a plugin so code doesn't need to change to set a different provider
const DataProvider = DSqlToRestProvider,
      ComplexFormProvider = (context, params={}) => DataProvider(
          context,
          providerTypes.complexForm,
          params
      ),
      PersistentQueryProvider = (context, params={}) => DataProvider(
          context,
          providerTypes.persistentQuery,
          params
      );

const context = {
    document: window.document,
    host,
    i18n: I18n("pt-BR"),
    uuidGen: uuidv4,

    UIkit,
    BaseComponent,
    Modal,
    ModalSearch,
    Dom,
    Grid,
    HttpConnection,
    DataField,
    DataGrid,
    DataProvider,
    ComplexFormProvider,
    PersistentQueryProvider,
    ComplexFormDom,
    PageDom,
    ComplexForm,
};

export default context;
