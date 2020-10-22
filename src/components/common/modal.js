import { modalContainer } from "../../views/common/modal.js";

const events = {
    onShow: "onShow",
    onHide: "onHide",
};

function Modal(context, title, content, onModalShow) {
    let initialized = false,
        self = context.BaseComponent();
    const { document, Dom, UIkit, uuidGen } = context,
          dom = Dom(context, modalContainer(title, content)),
          modal = UIkit.modal(
              dom.appendToDomNode(document.getElementsByTagName("body")[0]),
              { bgClose: false }
          ),
          hide = modal.hide;

    modal.hide = () => {
        self.events.run(events.onHide, [self]);
        hide();
    };

    function show(self) {
        modal.show();
        self.events.run(events.onShow, [self]);
    }

    return Object.assign(
        self,

        _.reduce(events, (handlers, event) => Object.assign(
            {},
            handlers,
            { [event]: handler => self.events.on(event, handler) }
        ), {}),

        {
            dom,
            show: () => show(self),
            hide: modal.hide,
        }
    );
};

export default Modal;
