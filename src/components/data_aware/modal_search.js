import searchContainer from "../../views/forms/search.js";

function gridContainer(containerId) {
    return ["div", {
        id: containerId,
        class: ["ag-theme-alpine"],
        style: { height: "450px", width: "100%"}
    }];
}

function ModalSearch(components, onSearch) {
    const { i18n, uuidGen, document, DataGrid } = components,
          translate = i18n.translate,
          gridContainerId = uuidGen(),
          searchView = searchContainer(
              components,
              translate("Search by all available fields in any part of the text"),
              gridContainer(gridContainerId),
              { onSearch }
          ),
          modal = components.Modal(
              components,
              translate("Search"),
              searchView.hiccup
          );

    let grid;

    function showHandler() {
        if ( _.isUndefined(grid) ) {
            grid = DataGrid(document.getElementById(gridContainerId), components);
        }
        searchView.focus();
    }

    modal.onShow(showHandler);
    return modal;
}

export default ModalSearch;
