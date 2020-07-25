import "uikit/dist/css/uikit.css";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "js-datepicker/dist/datepicker.min.css";
import "./css/dashboard.css";
import Icons from "uikit/dist/js/uikit-icons";
import UIkit from "uikit";

import pageDom from "./components/dom/main_page.js";
import ComplexFormDom from "./components/dom/complex_form.js";
import I18n from "./components/i18n/i18n.js";
import HttpConnection from "./components/data_aware/http_connection.js";
import { v4 as uuidv4 } from "uuid";

UIkit.use(Icons);

const components = {
    document,
    uuidGen: uuidv4,
    i18n: I18n("pt-BR"),
    UIkit,
    formsConnection: HttpConnection({
        host: "http://127.0.0.1:8000/api/query/persistent/complex-tables/?middleware=complex_forms&depth=1&id="
    }),
};

pageDom(components, "insertion-point").render("app-body");
ComplexFormDom(components, "CAD_FORNECEDORES", "insertion-point").render();

// let idField = dom.findFirst("attrs.name", "id");
// idField.value(12345.67);
// dom.findFirst("attrs.name", "dados_adicionais").value("Teste de campo Memo");
// dom.findFirst("attrs.name", "tipo_de_pessoa").value("J");

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
