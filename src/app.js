/**
 * ScoutCard
 * Main application
 */

import Tooltip from "./tooltip.js";
import getPlayerData from "./providers/index.js";

export default class ScoutCard {

    constructor() {

        this.tooltip = new Tooltip();

        this.currentSelection = "";

        this.timer = null;

        this.requestId = 0;

    }

    start() {

        document.addEventListener(

            "mouseup",

            () => this.onSelection(),

            true

        );

    }

    onSelection() {

        clearTimeout(this.timer);

        this.timer = setTimeout(

            () => this.loadSelection(),

            150

        );

    }

    async loadSelection() {

        const text = window
            .getSelection()
            .toString()
            .trim();

        if (text.length < 3) {

            this.tooltip.hide();

            return;

        }

        if (text === this.currentSelection) {
            return;
        }

        this.currentSelection = text;

        const requestId = ++this.requestId;

        console.log("");

        console.log("==============================");

        console.log("[ScoutCard] Selection:", text);

        console.time("[ScoutCard] Total");

        this.tooltip.showLoading(text);

        try {

            console.time("[ScoutCard] Providers");

            const player = await getPlayerData(text);

            console.timeEnd("[ScoutCard] Providers");

            if (requestId !== this.requestId) {

                console.log(
                    "[ScoutCard] Ignoring stale request."
                );

                return;

            }

            console.time("[ScoutCard] Render");

            this.tooltip.show(player);

            console.timeEnd("[ScoutCard] Render");

        }

        catch (error) {

            console.error(error);

            this.tooltip.showError(error.message);

        }

        finally {

            console.timeEnd("[ScoutCard] Total");

        }

    }

}