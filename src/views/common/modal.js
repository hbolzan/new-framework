function modalContainer(title, content) {
    return ["div", { class: ["uk-modal-container"], ukModal: "uk-modal" },
            ["div", { class: ["uk-modal-dialog", "uk-modal-body", "uk-margin-auto-vertical"] },
             ["button", { class: ["uk-modal-close-default"], type: "close", ukClose:"uk-close" }],
             ["h2", { class: ["uk-modal-title"] }, title],
            content]];
}

export { modalContainer };
