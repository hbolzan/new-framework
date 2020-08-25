import BaseComponent from "./base.js";
import { modalContainer } from "../../views/common/modal.js";
import { toHtml } from "../../logic/hiccup.js";

function Modal(components, title, content) {
    const { document, Dom, UIkit, uuidGen } = components,
          modal = UIkit.modal(
              Dom(components, modalContainer(title, content))
                  .appendToDomNode(document.getElementsByTagName("body")[0])
          );

    return {
        show: modal.show,
        hide: modal.hide,
    };
};

export default Modal;
