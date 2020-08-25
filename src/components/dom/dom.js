import { hiccupToObj, objToHtml, indexNodes } from "../../logic/hiccup.js";

function Dom({ document, uuidGen, i18n }, hiccup) {
    const asObj = hiccupToObj(hiccup, uuidGen),
          hiccupHashMap = indexNodes(asObj),
          asHtml = objToHtml(asObj);

    function asDomNode() {
        const el = document.createElement("template");
        el.innerHTML = asHtml;
        return el.content.firstChild;
    }

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

    function setupNodes() {
        _.each(hiccupHashMap, (node, id) => {
            setEventListeners(node);
            initNode(node);
        });
    }

    function renderIntoDomNode(domNode) {
        domNode.innerHTML = asHtml;
        setupNodes();
    }

    function appendToDomNode(domNode) {
        const child = domNode.appendChild(asDomNode());
        setupNodes();
        return child;
    }

    function appendTo(seletorId) {
        appendToDomNode(document.getElementById(`#${ selectorId }`));
    }

    function render(parentNodeId) {
        renderIntoDomNode(document.getElementById(parentNodeId));
    }

    function findFirst(attrName, value) {
        return _.filter(hiccupHashMap, node => _.get(node, attrName) == value)[0];
    }

    return {
        hiccup,
        asObj,
        asHtml,
        appendTo,
        appendToDomNode,
        renderIntoDomNode,
        render,
        findFirst,
    };
}

export { Dom };
