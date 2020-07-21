import { initValueGetterSetter } from "./base.js";

const attrs = field => {
    return {
        name: field.name,
        class: ["uk-textarea"],
        rows: 5,
        private: { field, initValueGetterSetter },
    };
};

const textArea = field => ["textarea", attrs(field)];

export default textArea;
