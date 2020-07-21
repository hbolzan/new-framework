import { initValueGetterSetter } from "./base.js";

function selectEmptyOption() {
    return ["option", { value: "" }, " -- selecione --"];
}

function selectOption(option, value, lookupKey, lookupResult) {
    let attrs = _.assign(
        { value: option[lookupKey] },
        value == option[lookupKey] ? { selected: "selected"} : option[lookupResult]
    );
    return ["option", attrs, option[lookupResult]];
}

const attrs = field => {
    return {
        name: field.name,
        class: ["uk-select"],
        private: { field, initValueGetterSetter },
    };
};

function select(field) {
    let lookupKey = field["lookup-key"],
        lookupResult = field["lookup-result"];
    return ["select", attrs(field),
            selectEmptyOption(),
            ..._.map(field.options, option => selectOption(option, field.value, lookupKey, lookupResult))];
}

export default select;
