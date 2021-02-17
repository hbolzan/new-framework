import { Input } from "../../views/input/input.js";
import { trace } from "../../common/misc.js";

const events = {
    onFocus: "onFocus",
    onBlur: "onBlur",
    onChange: "onChange",
};

function DataInput(context) {
    const { BaseComponent, dataField } = context,
          self = BaseComponent(events),
          input = Input({ ...context, dataInput: self }),
          inputAttrs = input.inputAttrs(),
          hiccup = input.hiccup;

    let oldValue;

    inputAttrs.private.onInitDom = function (node, { document }) {
        self.node = node.self;
    };

    function initDomEvents() {
        inputAttrs.onblur = e => self.events.run(events.onBlur, [self, e]);
        inputAttrs.onfocus = e => self.events.run(events.onFocus, [self, e]);
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
            self.node.value(value, df, source);
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
