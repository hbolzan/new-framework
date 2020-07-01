import { renderClassAttr } from "../../common/render.js";

function singleButtonHtml(label, classes) {
    let classesStr = renderClassAttr("uk-button uk-button-default", classes);
    return `<button class="${classesStr}">${label}</button>`;
}

export { singleButtonHtml };
