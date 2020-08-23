import { Dom } from "./dom.js";

function ComplexFormDom(components, parentNodeId) {

    return {
        render: built => built.then(form => Dom(components, form)).then(dom => dom.render(parentNodeId)),
    };
}

export default ComplexFormDom;
