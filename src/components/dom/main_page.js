import { Dom } from "./dom.js";
import { pageHeader, leftBar, mainContent } from "../../views/page/main.js";

function pageDom(context, mainContainerId) {
    let pageHiccup = ["section",
                      pageHeader({ src: "", url: "#" }),
                      leftBar({ src: "", url: "#" }),
                      mainContent([], mainContainerId)];
    return Dom(context, pageHiccup);
}

export default pageDom;
