function ComplexFormDom(context, parentNodeId) {

    return {
        render: built => built.then(form => context.Dom(context, form)).then(dom => dom.render(parentNodeId)),
    };
}

export default ComplexFormDom;
