import input from "../input/input.js";
import { singleButton } from "../button/button.js";

function containerHeader({ document, i18n }, inputId, searchTitle, eventHandlers={}) {
    const onSearch = eventHandlers.onSearch,
          value = () => document.getElementById(inputId).value,
          clickHandler = e => onSearch(value()),
          keyPressHandler = e => e.code == "Enter" ? onSearch(value()) : null;

    function withSearchEvent(attrs, event, handler) {
        return Object.assign(
            {},
            attrs,
            onSearch ? { [event]: handler } : {}
        );
    }

    return ["div", { class: ["uk-card-header"], style: { padding: "10px", zIndex: 980 } },
            ["div", { class: ["container"] },
             ["div", { class: "uk-width-1-1"},
              ["label", { class: ["uk-form-label"]  }, searchTitle]],
             ["div", { ukGrid: "uk-grid" },
              ["div", { class: ["uk-width-expand@m"]},
               input({
                   attrs: withSearchEvent({ id: inputId }, "onkeypress", keyPressHandler),
                   name: "search", label: searchTitle,
                   "visible": true
               })],
              ["div", { class: ["uk-width-auto@m"]},
               singleButton({
                   label: i18n.translate("Search"),
                   type: "primary",
                   attrs: withSearchEvent({}, "onclick", clickHandler)
               })]]]];
}

function containerBody(content=[]) {
    return ["div", { class: ["uk-card-body"], style: { padding: "10px"} }, content];
}

function searchContainer(context, searchTitle, content, eventHandlers) {
    const inputId = context.uuidGen(),
          focus = () => document.getElementById(inputId).select();

    return {
        hiccup: ["div", { class: ["uk-card-default", "uk-width-1", "uk-card-hover"] },
                 containerHeader(context, inputId, searchTitle, eventHandlers),
                 containerBody(content)],
        focus,
    };
}

export default searchContainer;
