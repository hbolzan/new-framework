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

    let grid, selected, dismissed, previousSelectedNode;

    const { i18n, uuidGen, document, DataGrid } = context,
          translate = i18n.translate,
          gridContainerId = uuidGen(),
          searchView = searchContainer(
              { onDismiss: dismissHandler, onSelect: select, ...context },
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

    function dismiss() {
        if (previousSelectedNode && ! dismissed) {
            previousSelectedNode.setSelected(true, true);
            dismissed = true;
        }
    }

    function dismissHandler() {
        dismiss();
        modal.hide();
    }

    function select() {
        const selectedNode = grid.gridOptions.api.getSelectedNodes()[0];
        if (selectedNode) {
            selected = true;
            modal.events.run(events.onSelectRow, [selectedNode]);
            modal.hide();
        }
    }

    function selectRowHandler(event) {
        event.node.setSelected(true, true);
        select();
    }

    function cellFocusedHandler(e) {
        e.api.getDisplayedRowAtIndex(e.rowIndex).setSelected(true, true);
    }

    function cellKeyDownHandler(e) {
        if ("Enter" == e.event.key) {
            modal.events.run(events.onSelectRow, [e.node]);
            modal.hide();
        }
    }

    function initGrid() {
        if ( _.isUndefined(grid) ) {
            grid = DataGrid(document.getElementById(gridContainerId), context);
            grid.onRowDoubleClicked(selectRowHandler);
            grid.onCellFocused(cellFocusedHandler);
            grid.onCellKeyDown(cellKeyDownHandler);
        }
    }

    function showHandler() {
        selected = false;
        dismissed = false;
        initGrid();
        previousSelectedNode = grid.gridOptions.api.getSelectedNodes()[0];
        searchView.focus();
    }

    function hideHandler() {
        if ( ! selected ) {
            dismiss();
        }
    }

    function init() {
        modal.onShow(showHandler);
        modal.onHide(hideHandler);
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
