import BaseComponent from "./base.js";
import { modalContainer } from "../../views/common/modal.js";
import { toHtml } from "../../logic/hiccup.js";

function Modal(components, title, content) {
    // let self = BaseComponent();
    const { document, Dom, UIkit, uuidGen } = components,
          modal = UIkit.modal(toHtml(modalContainer(title, ["div"]), uuidGen));

    Dom(components, content)
        .renderOnDomNode(modal.$el.firstChild.lastChild);

    return {
        show: () => modal.show(),
    };
};

export default Modal;
