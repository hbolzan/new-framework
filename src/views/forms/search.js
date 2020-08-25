import input from "../input/input.js";
import { singleButton } from "../button/button.js";

function containerHeader({ uuidGen, document }, searchTitle, eventHandlers={}) {
    const inputId = uuidGen(),
          searchHandler = onSearch => e => onSearch(document.getElementById(inputId).value);


    function withSearchEvent(attrs, { onSearch }) {
        return Object.assign(
            {},
            attrs,

            onSearch ? { attrs: { onclick: searchHandler(onSearch) } } : {}
        );
    }

    return ["div", { class: ["uk-card-header"], style: { padding: "10px", zIndex: 980 } },
            ["div", { class: ["container"] },
             ["div", { class: "uk-width-1-1"},
              ["label", { class: ["uk-form-label"]  }, searchTitle]],
             ["div", { ukGrid: "uk-grid" },
              ["div", { class: ["uk-width-expand@m"]},
               input({ id: inputId, name: "search", label: searchTitle, "visible": true })],
              ["div", { class: ["uk-width-auto@m"]},
               singleButton(withSearchEvent({ label: "Search", type: "primary" }, eventHandlers))]]]];
}

function containerBody(content=[]) {
    return ["div", { class: ["uk-card-body"] }, content];
}

function searchContainer(components, searchTitle, content, eventHandlers) {
    return ["div", { class: ["uk-card-default", "uk-width-1", "uk-card-hover"] },
            containerHeader(components, searchTitle, eventHandlers),
            containerBody(content)];
}

export default searchContainer;
