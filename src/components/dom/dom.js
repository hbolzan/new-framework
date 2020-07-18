import { hiccupToObj, objToHtml, indexNodes } from "../../logic/hiccup.js";

function Dom({ document, uuidGen, i18n }, hiccup) {
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
        _.each(node.private, (value, name) => _.isFunction(value) ?
               value({ id: node.attrs.id, self: node },
                     { i18n, document }) :
               null);
    }

    function render(parentNodeId) {
        document.getElementById(parentNodeId).innerHTML = asHtml;
        _.each(hiccupHashMap, (node, id) => {
            setEventListeners(node);
            initNode(node);
        });
    }

    function findFirst(attrName, value) {
        return _.filter(hiccupHashMap, node => _.get(node, attrName) == value)[0];
    }

    return {
        hiccup,
        asObj,
        asHtml,
        render,
        findFirst,
    };
}

export { Dom };
