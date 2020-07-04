function titleBar(title) {
    return [
        "div",
        {
            class: ["uk-background-primary", "uk-light", "uk-panel"],
            style: { padding: "3px 9px", margin: "0 0 3px 2px" }
        },
        ["p", { class: "uk-h5" }, title]
    ];
}

function containerHeader(formTitle, ...children) {
    return ["div", { class: ["uk-card-header"], style: { padding: "10px" } },
            ["div", { class: ["container"], style: { height: "60px" } },
             titleBar(formTitle),
             ...children]];
}

function containerBody(...children) {
    return ["div", { class: ["uk-card-body"] }, ..._.filter(children)];
}

function containerFooter(...children) {
    return ["div", { class: ["grid-container"], style: { padding: "0" } }, ...children];
}

function formContainer(...children) {
    return ["div", { class: ["uk-card-default", "uk-width-1"] }, ...children];
}

export { containerHeader, containerBody, containerFooter, formContainer };
