import { singleButton } from "../../views/button/button.js";
import { renderAttrValue } from "../../logic/hiccup.js";

function ToolButton({ document, uuidGen }, action, onToolbarEvent, attrs = {}) {
    const id = uuidGen(),
          baseStyle = { padding: "0", width: "55px", backgroundColor: "#fdfdfd", ...attrs.style },
          element = () => document.getElementById(id),
          setAttr = (name, value) => element().setAttribute(name, value),
          removeAttr = (name) => element().removeAttribute(name);

    let style = baseStyle;

    function setEnabled(enabled) {
        if (enabled) {
            removeAttr("disabled");
        } else {
            setAttr("disabled", "disabled");
        }
    }

    function hiccup() {
        return singleButton({
            attrs: Object.assign(
                {
                    ...attrs,
                    id,
                    class: ["uk-button-large"],
                    ukIcon: action.icon,
                    style,
                },
                onToolbarEvent ? { onclick: e => onToolbarEvent(e, action.action) } : {}
            )
        });
    }

    return {
        hiccup,
        setEnabled,
    };

}

export default ToolButton;
