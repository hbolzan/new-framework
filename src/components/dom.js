import { hiccupToObj, objToHtml, indexNodes } from "../logic/hiccup.js";

function Dom(document, uuidGen, hiccup) {
    const asObj = hiccupToObj(hiccup, uuidGen),
          hiccupHashMap = indexNodes(asObj),
          asHtml = objToHtml(asObj);

    function setEventListeners(hiccupObj) {
        _.each(
            hiccupObj.events,
            (fn, event) => document
                .getElementById(hiccupObj.attrs.id)
                .addEventListener(event.replace("on", ""), fn, false)
        );
    }

    function initNode(node) {
        if ( node.private.init ) {
            node.private.init({
                id: node.attrs.id,
                self: node,
                document: document,
            });
        }
    }

    function render(parentNodeId) {
        document.getElementById(parentNodeId).innerHTML = asHtml;
        _.each(hiccupHashMap, (node, id) => {
            setEventListeners(node);
            initNode(node);
        });
    }

    return {
        hiccup,
        asObj,
        asHtml,
        render,
    };
}

export { Dom };
