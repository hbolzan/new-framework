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

function ModalSearch(context, eventHandlers={}) {

    let grid;

    const { i18n, uuidGen, document, DataGrid } = context,
          translate = i18n.translate,
          gridContainerId = uuidGen(),
          searchView = searchContainer(
              { onDismiss: dismissHandler, onSelect: selectHandler, ...context },
              translate("Search by all available fields in any part of the text"),
              gridContainer(gridContainerId),
              { onSearch: searchHandler }
          ),
          modal = context.Modal(
              context,
              translate("Search"),
              searchView.hiccup
          );

    function searchHandler(searchValue) {
        modal.events.run(events.onSearch, [searchValue]);
    }

    function dismissHandler() {
        modal.hide();
    }

    function selectHandler() {
        const selectedNode = grid.gridOptions.api.getSelectedNodes()[0];
        if (selectedNode) {
            modal.events.run(events.onSelectRow, [selectedNode]);
            modal.hide();
        }
    }

    function selectRowHandler(event) {
        event.node.setSelected(true, true);
        modal.events.run(events.onSelectRow, [event.node]);
        modal.hide();
    }

    function initGrid() {
        if ( _.isUndefined(grid) ) {
            grid = DataGrid(document.getElementById(gridContainerId), context);
            grid.onRowDoubleClicked(selectRowHandler);
            grid.onRowClicked(e => e.node.setSelected(true, true));
            console.log(grid);
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
