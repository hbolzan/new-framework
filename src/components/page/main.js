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
            topNavLeft(logo, contentLeft)];
}

function leftSideBar() {
}

function pageHeader() {
}
