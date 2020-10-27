import input from "../../views/input/input.js";
import { trace } from "../../common/misc.js";

function DataInput({ BaseComponent, fieldDef, dataField }) {

    const self = BaseComponent(),
          hiccup = input(fieldDef);

    hiccup[1].private.onInitDom = function (node, { document }) {
        self.node = node.self;
    };

    function handleDataChange(df, value) {
        if (self.node.value) {
            self.node.value(value);
        }
    }

    dataField.onChange(handleDataChange);

    return Object.assign(
        self,
        {
            hiccup : () => hiccup,
        }
    );
}

export default DataInput;
