/**
 * ScoutCard
 * Text Selection
 */

import { CONFIG } from "./config.js";
import { looksLikePlayerName } from "./utils/text.js";

export class SelectionManager {

    constructor(callback) {

        this.callback = callback;

        this.timer = null;

        this.lastSelection = "";

        this.enabled = false;

        this.onMouseUp = this.onMouseUp.bind(this);

        this.onScroll = this.onScroll.bind(this);

        this.onKeyDown = this.onKeyDown.bind(this);

    }

    start() {

        if (this.enabled) {

            return;

        }

        this.enabled = true;

        document.addEventListener(

            "mouseup",

            this.onMouseUp,

            true

        );

        document.addEventListener(

            "keydown",

            this.onKeyDown,

            true

        );

        window.addEventListener(

            "scroll",

            this.onScroll,

            true

        );

    }

    stop() {

        if (!this.enabled) {

            return;

        }

        this.enabled = false;

        document.removeEventListener(

            "mouseup",

            this.onMouseUp,

            true

        );

        document.removeEventListener(

            "keydown",

            this.onKeyDown,

            true

        );

        window.removeEventListener(

            "scroll",

            this.onScroll,

            true

        );

    }

    getSelection() {

        const text = window
            .getSelection()
            ?.toString()
            ?.replace(/\s+/g, " ")
            ?.trim();

        if (!text) {

            return "";

        }

        if (text.length < CONFIG.minSelectionLength) {

            return "";

        }

        if (text.length > CONFIG.maxSelectionLength) {

            return "";

        }

        return text;

    }

    clear() {

        this.lastSelection = "";

    }

    onScroll() {

        this.clear();

    }

    onKeyDown(event) {

        if (event.key === "Escape") {

            this.clear();

        }

    }

    onMouseUp(event) {

        clearTimeout(this.timer);

        this.timer = setTimeout(() => {

            const text = this.getSelection();

            if (!text) {

                return;

            }

            if (!looksLikePlayerName(text)) {

                return;

            }

            if (text === this.lastSelection) {

                return;

            }

            this.lastSelection = text;

            this.callback({

                text,

                x: event.clientX,

                y: event.clientY,

                target: event.target

            });

        }, CONFIG.selectionDelay);

    }

}

export default SelectionManager;
