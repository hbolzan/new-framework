import { pageHeader, leftBar, mainContent } from "../../views/page/main.js";

function PageDom(context, mainContainerId) {
    let pageHiccup = ["section",
                      pageHeader({ src: "", url: "#" }),
                      leftBar({ src: "", url: "#" }),
                      mainContent([], mainContainerId)];
    return context.Dom(context, pageHiccup);
}

export default PageDom;
