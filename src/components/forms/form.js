function formInputField(label, classAttr, placeholder="") {
    return ["div", { class: classAttr || "uk-width-1-1" },
            ["label", { class: ["uk-form-label"], for: "" }, label],
            ["input", { class: ["uk-input"], type: "text", placeholder: placeholder }]];
}

function form(...children) {
    return ["form", ...children];
    return ["form", { class: "uk-grid-small", ukGrid: "uk-grid" }, ...children];
}

export { formInputField, form };
