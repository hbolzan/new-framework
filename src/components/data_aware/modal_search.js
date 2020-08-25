import searchContainer from "../../views/forms/search.js";

function ModalSearch(components, onSearch) {
    const translate = components.i18n.translate,
          searchView = searchContainer(
              components,
              translate("Search by all available fields in any part of the text"),
              [],
              { onSearch }
          ),
          modal = components.Modal(
              components,
              translate("Search"),
              searchView.hiccup
          );
    modal.onShow(() => searchView.focus());
    return modal;
}

export default ModalSearch;
