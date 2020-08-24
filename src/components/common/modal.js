import BaseComponent from "./base.js";
import { containerModal } from "../../views/common/modal.js";
import { toHtml } from "../../logic/hiccup.js";

function Modal(components, title, content) {
    // let self = BaseComponent();
    const { document, Dom, UIkit, uuidGen } = components,
          modal = UIkit.modal(toHtml(containerModal(title, ["div"]), uuidGen));

    Dom(components, ["div", content])
        .renderOnDomNode(modal.$el.children[0].children[2]);

    function show() {
        modal.show();
    }

    return {
        show,
    };
};

export default Modal;
