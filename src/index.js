import "uikit/dist/css/uikit.css";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "./css/dashboard.css";
import Icons from "uikit/dist/js/uikit-icons";
import UIkit from "uikit";

import { complexForm } from "./components/forms/complex.js";
import { formInputField, form } from "./components/forms/form.js";
import { smartFields } from "./components/forms/smart_fields.js";
import { pageHeader, leftBar, mainContent } from "./components/page/main.js";
import { htmlToElement } from "./common/dom.js";
import { toHtml } from "./logic/hiccup.js";

import { clientesDefinitions } from "./data/form_sample.js";

UIkit.use(Icons);

let input = formInputField("ID", "uk-width-1-6"),
    input2 = formInputField("CPF", "uk-width-1-3"),
    fields = smartFields(clientesDefinitions),
    clientes = complexForm("Cadastro de clientes", form(...fields)),
    page = ["section",
            pageHeader({ src: "", url: "#" }),
            leftBar({ src: "", url: "#" }),
            mainContent(clientes)];

document.querySelector("#app-body")
    .append(htmlToElement(document, toHtml(page)));


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
