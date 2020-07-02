function htmlToElement(document, html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

function addChildren(parent, children) {
    _.each(children, child => parent.append(child));
    return parent;
}

export { htmlToElement };
