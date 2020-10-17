import { Dom } from "./dom.js";

function ComplexFormDom(context, parentNodeId) {

    return {
        render: built => built.then(form => Dom(context, form)).then(dom => dom.render(parentNodeId)),
    };
}

export default ComplexFormDom;
