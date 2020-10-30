import { singleButton } from "../../views/button/button.js";
import { renderAttrValue } from "../../logic/hiccup.js";

function ToolButton({ document, uuidGen }, action, onToolbarEvent, attrs = {}) {
    const id = uuidGen(),
          baseStyle = { padding: "0", width: "55px", backgroundColor: "#fdfdfd" },
          style = { ...baseStyle, ...attrs.style },
          disabledStyle = { ...baseStyle, cursor: "not-allowed" },
          renderedBaseStyle = renderAttrValue(baseStyle),
          renderedDisabledStyle = renderAttrValue(disabledStyle),
          renderedStyle = renderAttrValue(style),
          element = () => document.getElementById(id),
          setAttr = (name, value) => element().setAttribute(name, value),
          removeAttr = (name) => element().removeAttribute(name),
          setEnabled = (enabled) => enabled ? enable() : disable();

    function enable() {
        removeAttr("disabled");
        setAttr("style", renderedStyle);
    }

    function disable() {
        setAttr("disabled", "disabled");
        setAttr("style", renderedDisabledStyle);
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
        enable,
        disable,
    };

}

export default ToolButton;
