import { containerHeader, containerBody, containerFooter, formContainer } from "./container.js";
import { formToolBar } from "../button/toolbar.js";

function complexForm(formTitle, masterContents, detailContents, toolbar) {
    return formContainer(
        containerHeader(formTitle, toolbar),
        containerBody(...masterContents),
    );
}

export { complexForm };
