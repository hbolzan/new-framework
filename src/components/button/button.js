import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { singleButtonHtml } from "./button_templates.js";
import { htmlToElement } from "../../common/render.js";

UIkit.use(Icons);

// UIkit.notification("I am a great example!!");

const singleButton = (document, label, classes) => htmlToElement(document, singleButtonHtml(label, classes));

export { singleButton };

