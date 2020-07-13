function inputText({ value, placeholder }) {
    return ["input", { class: ["uk-input"], type: "text", value: value || "", placeholder: placeholder || "" }];
}

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

function inputSelect(field) {
    let lookupKey = field["lookup-key"],
        lookupResult = field["lookup-result"];
    return ["select", { class: ["uk-select"] },
            selectEmptyOption(),
            ..._.map(field.options, option => selectOption(option, field.value, lookupKey, lookupResult))];
}

const inputByType = {
    "data/char": inputText,
    "data/integer": inputText,
    "lookup/char": inputSelect,
    "lookup/integer": inputSelect,
    default: inputText
};

function formInputField(field) {
    let fieldFn = inputByType[`${ field["field-kind"] }/${ field["data-type"] }`] || inputByType.default;
    return ["div", { class: field.class || "uk-width-1-1" },
            ["label", { class: ["uk-form-label"], for: "" }, field.label],
            fieldFn(field)];
}

function form(...children) {
    return ["form", ...children];
    return ["form", { class: "uk-grid-small", ukGrid: "uk-grid" }, ...children];
}

export { formInputField, form };
