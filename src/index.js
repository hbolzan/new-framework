import "uikit/dist/css/uikit.css";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "js-datepicker/dist/datepicker.min.css";
import "./css/dashboard.css";
import components from "./components/components.js";

components.PageDom(components, "insertion-point").render("app-body");
components.ComplexForm(components, "CAD_FORNECEDORES", "insertion-point").render();

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
