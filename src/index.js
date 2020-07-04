import "uikit/dist/css/uikit.css";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Icons from "uikit/dist/js/uikit-icons";
import UIkit from "uikit";

import { complexForm } from "./components/forms/complex.js";
import { formInputField, form } from "./components/forms/form.js";
import { htmlToElement } from "./common/dom.js";
import { toHtml } from "./logic/hiccup.js";

UIkit.use(Icons);

let input = formInputField("ID", "1-6");
let input2 = formInputField("CPF", "1-3");


let div = ["div", { class: ["uk-grid-small", "uk-margin-top"], ukGrid: "uk-grid" },
           ["div", { class: ["uk-width-1-6"], style: { height: "35px",  border: "solid 1px" } }],
           ["div", { class: ["uk-width-expand"], style: { height: "35px",  border: "solid 1px" } }],
           ["div", { class: ["uk-width-1-4"], style: { height: "35px",  border: "solid 1px" } }],
           ["div", { class: ["uk-width-expand"], style: { height: "35px",  border: "solid 1px" } }],
           ["div", { class: ["uk-width-expand"], style: { height: "35px",  border: "solid 1px" } }],
           ["div", { class: ["uk-width-expand"], style: { height: "35px",  border: "solid 1px" } }],
           ["div", { class: ["uk-width-expand"], style: { height: "35px",  border: "solid 1px" } }],
           ["div", { class: ["uk-width-expand"], style: { height: "35px",  border: "solid 1px" } }],
          ];

document.querySelector("#app-body")
    .append(htmlToElement(document, toHtml(div)));

/*
document.querySelector("#app-body")
    .append(htmlToElement(document, toHtml(
        complexForm(
            "Cadastro de clientes",
            form(input, input2)
        )
    )));

*/

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
