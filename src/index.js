import "uikit/dist/css/uikit.css";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "js-datepicker/dist/datepicker.min.css";
import "./css/dashboard.css";
import Icons from "uikit/dist/js/uikit-icons";
import UIkit from "uikit";

import { toHtml, hiccupToObj, objToHtml } from "./logic/hiccup.js";
import { complexForm } from "./views/forms/complex.js";
import { form } from "./views/forms/form.js";
import { smartFields } from "./views/forms/smart_fields.js";
import { pageHeader, leftBar, mainContent } from "./views/page/main.js";
import { Dom } from "./components/dom/dom.js";
import I18n from "./components/i18n/i18n.js";

import { clientesDefinitions } from "./data/form_sample.js";
import { v4 as uuidv4 } from "uuid";

UIkit.use(Icons);

function pageDom() {
    const components = {
        document,
        uuidGen: uuidv4,
        i18n: I18n("pt-BR"),
    };

    let fields = smartFields(clientesDefinitions),
        clientes = complexForm("Cadastro de clientes", form(...fields)),
        pageHiccup = ["section",
                      pageHeader({ src: "", url: "#" }),
                      leftBar({ src: "", url: "#" }),
                      mainContent(clientes)];
    return Dom(components, pageHiccup);
}

let dom = pageDom();
dom.render("app-body");
let idField = dom.findFirst("attrs.name", "id");
idField.value(12345.67);
dom.findFirst("attrs.name", "dados_adicionais").value("Teste de campo Memo");
dom.findFirst("attrs.name", "tipo_de_pessoa").value("J");

/*

import {Grid} from 'ag-grid-community';

var columnDefs = [
    {headerName: "Make", field: "make"},
    {headerName: "Model", field: "model"},
    {headerName: "Price", field: "price"}
];

// specify the data
var rowData = [
    {make: "Toyota", model: "Celica", price: 35000},
    {make: "Ford", model: "Mondeo", price: 32000},
    {make: "Porsche", model: "Boxter", price: 72000}
];

// let the grid know which columns and what data to use
var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData
};

var eGridDiv = document.querySelector('#grid-container');

new Grid(eGridDiv, gridOptions);

*/
