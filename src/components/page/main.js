function topNavLeftItems(content) {
    // TODO: improve this
    return content ? ["ul", { class: ["uk-navbar-nav", "uk-visible@m"] }, _.map(content)] : [];
}

function topNavRightItems(content) {
    // TODO: improve this
    return content ? ["ul", { class: ["uk-navbar-nav", "uk-visible@m"] }, _.map(content)] : [];
}

function topNavLeft({ src, url }, content) {
    return ["div", { class: ["uk-navbar-left"]},
            ["div", { class: ["uk-navbar-item", "uk-hidden@m"]},
             ["a", { class: ["uk-logo"], href: url || "#" },
              ["img", { src: src, alt: "" }]],
             ...topNavLeftItems(content)]];
}

function topNavRight(content) {
    return ["div", { class: ["uk-navbar-right"]}, ...topNavRightItems(content)];
}

function topNav(logo, contentLeft, contentRight) {
    return ["nav", { class: ["uk-navbar", "uk-light"], dataUkNavbar: { mode: "click", duration: 250 } },
            topNavLeft(logo, contentLeft),
            topNavRight(contentRight)];
}

function pageHeader(logo, itemsLeft, itemsRight) {
    return ["header", { class: ["uk-position-fixed"] },
            ["div", { class: ["uk-container", "uk-container-expand", "uk-background-primary"] },
             topNav(logo, itemsLeft, itemsRight)]];
}

function leftBarLogo({ src, url }) {
    return ["div", { class: ["left-logo", "uk-flex", "uk-flex-middle"] },
            ["img", { class: "cutom-logo", src: src }]];
}

function leftBar(logo, content) {
    return ["div", { class: ["left-content-box", "content-box-dark"] },
            leftBarLogo(logo)];
}

function mainContent(content) {
    return ["div", { dataUkHeightViewport: { expand: true } },
            ["div", { class: ["uk-container", "uk-container-expand"] },
             ...content]];
}

export { pageHeader, leftBar, mainContent };
