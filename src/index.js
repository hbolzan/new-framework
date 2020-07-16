import "uikit/dist/css/uikit.css";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "js-datepicker/dist/datepicker.min.css";
import "./css/dashboard.css";
import Icons from "uikit/dist/js/uikit-icons";
import UIkit from "uikit";

import { toHtml, hiccupToObj, objToHtml } from "./logic/hiccup.js";
import { complexForm } from "./views/forms/complex.js";
import { formInputField, form } from "./views/forms/form.js";
import { smartFields } from "./views/forms/smart_fields.js";
import { pageHeader, leftBar, mainContent } from "./views/page/main.js";
import { Dom } from "./components/dom.js";

import { clientesDefinitions } from "./data/form_sample.js";
import { v4 as uuidv4 } from "uuid";

import datepicker from "js-datepicker";

UIkit.use(Icons);

let fields = smartFields(clientesDefinitions),
    clientes = complexForm("Cadastro de clientes", form(...fields)),
    pageHiccup = ["section",
                  pageHeader({ src: "", url: "#" }),
                  leftBar({ src: "", url: "#" }),
                  mainContent(clientes)],
    pageDom = Dom(document, uuidv4, pageHiccup);

// pageDom.render("app-body");

// let buttonHiccup = ["button", { onclick: x => alert(x) }, "Click Me!!"],
//     buttonDom = Dom(document, uuidv4, buttonHiccup);
// buttonDom.render("app-body");

const inputFormatter = (input, date, instance) => {
    input.value = date.toLocaleDateString("pt-BR");
};
const datePickerOptions = {
    formatter: inputFormatter,
    position: "br",
    customDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    customMonths: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    customOverlayMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Ou", "Nov", "Dez"],
    overlayButton: "Confirmar",
    overlayPlaceholder: "Digite o ano",
    showAllDates: true,
    respectDisabledReadOnly: true,
};

let inputHiccup = ["input",
                   {
                       class: ["uk-input"],
                       type: "text",
                       private: { init: ({ id }) => datepicker(`#${ id }`, datePickerOptions) }
                   }],
    inputDom = Dom(document, uuidv4, inputHiccup);
inputDom.render("app-body");

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
