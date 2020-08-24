import { formContainer, containerHeader, containerFooter } from "./container.js";

function searchContainer(i18n, insertionPointId) {
    return formContainer(
        containerHeader(i18n.translate("Search")),
        ["div", { id: insertionPointId, class: ["uk-card-body"] }],
    );
}
