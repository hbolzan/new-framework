import input from "../../views/input/input.js";
import { trace } from "../../common/misc.js";

const events = {
    onFocus: "onFocus",
    onBlur: "onBlur",
    onChange: "onChange",
};

function DataInput({ BaseComponent, fieldDef, dataField }) {

    const self = BaseComponent(events),
          hiccup = input(fieldDef);

    let oldValue;

    hiccup[1].private.onInitDom = function (node, { document }) {
        self.node = node.self;
    };

    function initDomEvents() {
        hiccup[1].onblur = e => self.events.run(events.onBlur, [self, e]);
        hiccup[1].onfocus = e => self.events.run(events.onFocus, [self, e]);
    }

    function initOwnEvents() {
        self.onFocus((node, e) => oldValue = e.target.value);
        self.onBlur((node, e) => {
            const newValue = e.target.value;
            if ( newValue !== oldValue ) {
                self.node.value(newValue);
                dataField.value(newValue, self);
                self.events.run(events.onChange, [self, oldValue, newValue]);
            }
        });
    }

    function handleDataFieldValueChange(df, value, source) {
        if (self.node.value && source !== self) {
            let oldValue = self.node.value();
            self.node.value(value);
            self.events.run(events.onChange, [self, oldValue, value]);
        }
    }

    function init() {
        dataField.onChange(handleDataFieldValueChange);
        initDomEvents();
        initOwnEvents();
    }

    init();

    return Object.assign(
        self,
        {
            hiccup : () => hiccup,
        }
    );
}

export default DataInput;
