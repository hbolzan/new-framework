import _ from "lodash";

function htmlToElement(document, html) {
    let template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

const renderClassAttr = (mandatory, other) => _.filter(_.concat(mandatory, other)).join(" ");

export { htmlToElement, renderClassAttr };
