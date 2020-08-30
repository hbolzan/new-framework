import searchContainer from "../../views/forms/search.js";

const events = {
    onSearch: "onSearch",
    onSelectRow: "onSelectRow",
};

function gridContainer(containerId) {
    return ["div", {
        id: containerId,
        class: ["ag-theme-alpine"],
        style: { height: "450px", width: "100%"}
    }];
}

function ModalSearch(components, eventHandlers={}) {
    const { i18n, uuidGen, document, DataGrid } = components,
          translate = i18n.translate,
          gridContainerId = uuidGen(),
          searchView = searchContainer(
              components,
              translate("Search by all available fields in any part of the text"),
              gridContainer(gridContainerId),
              { onSearch: searchHandler }
          ),
          modal = components.Modal(
              components,
              translate("Search"),
              searchView.hiccup
          );
    let grid;

    function searchHandler(searchValue) {
        modal.events.run(events.onSearch, [searchValue]);
    }

    function initGrid() {
        if ( _.isUndefined(grid) ) {
            grid = DataGrid(document.getElementById(gridContainerId), components);
        }
    }

    function showHandler() {
        initGrid();
        searchView.focus();
    }

    function init() {
        modal.onShow(showHandler);
        _.each(eventHandlers, (handler, event) => modal.events.on(event, handler));
    }
    init();

    return Object.assign(
        modal,

        _.reduce(events, (handlers, event) => Object.assign(
            {},
            handlers,
            { [event]: handler => modal.events.on(event, handler) }
        ), {}),

    );
}

export default ModalSearch;
