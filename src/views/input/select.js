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

function select(field) {
    let lookupKey = field["lookup-key"],
        lookupResult = field["lookup-result"];
    return ["select", { class: ["uk-select"] },
            selectEmptyOption(),
            ..._.map(field.options, option => selectOption(option, field.value, lookupKey, lookupResult))];
}

export default select;
