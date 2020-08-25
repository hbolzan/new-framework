import BaseComponent from "./base.js";
import { modalContainer } from "../../views/common/modal.js";
import { toHtml } from "../../logic/hiccup.js";

function Modal(components, title, content) {
    const { document, Dom, UIkit, uuidGen } = components,
          dom = Dom(components, modalContainer(title, content)),
          modal = UIkit.modal(dom.appendToDomNode(document.getElementsByTagName("body")[0]));

    return {
        dom,
        show: modal.show,
        hide: modal.hide,
    };
};

export default Modal;
