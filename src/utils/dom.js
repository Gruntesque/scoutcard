/**
 * ScoutCard
 * DOM utilities
 */

export function $(selector, root = document) {

    return root.querySelector(selector);

}

export function $$(selector, root = document) {

    return [...root.querySelectorAll(selector)];

}

export function create(tag, options = {}) {

    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(options)) {

        switch (key) {

            case "class":

                element.className = value;

                break;

            case "text":

                element.textContent = value;

                break;

            case "html":

                element.innerHTML = value;

                break;

            case "style":

                Object.assign(element.style, value);

                break;

            default:

                if (key.startsWith("on") &&
                    typeof value === "function") {

                    element.addEventListener(

                        key.substring(2),

                        value

                    );

                }

                else {

                    element.setAttribute(

                        key,

                        value

                    );

                }

        }

    }

    return element;

}

export function remove(element) {

    element?.remove();

}

export function empty(element) {

    while (element.firstChild) {

        element.removeChild(

            element.firstChild

        );

    }

}

export function append(parent, ...children) {

    for (const child of children) {

        if (!child) {

            continue;

        }

        parent.appendChild(child);

    }

    return parent;

}

export function injectStyle(id, css) {

    let style = document.getElementById(id);

    if (style) {

        return style;

    }

    style = document.createElement("style");

    style.id = id;

    style.textContent = css;

    document.head.appendChild(style);

    return style;

}

export function rect(element) {

    return element.getBoundingClientRect();

}

export function viewport() {

    return {

        width: window.innerWidth,

        height: window.innerHeight

    };

}
