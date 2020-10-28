import { singleButton } from "../../views/button/button.js";
import { renderAttrValue } from "../../logic/hiccup.js";

function ToolButton({ document, uuidGen }, action, onToolbarEvent, attrs = {}) {
    const id = uuidGen(),
          baseStyle = { padding: "0", width: "55px", backgroundColor: "#fdfdfd" },
          setAttr = (name, value) => document.getElementById(id).setAttribute(name, value),
          removeAttr = (name) => document.getElementById(id).removeAttribute(name);

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
                    class: ["uk-button-large"],
                    ukIcon: action.icon,
                    style,
                },
                { ...attrs, id },
                onToolbarEvent ? { onclick: e => onToolbarEvent(e, action.action)} : {}
            )
        });
    }

    return {
        hiccup,
        setEnabled,
    };

}

export default ToolButton;
