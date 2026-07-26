/**
 * ScoutCard
 * Main application
 */

import { Cache } from "./cache.js";
import { RequestQueue } from "./queue.js";
import { Tooltip } from "./tooltip.js";
import { SelectionManager } from "./selection.js";
import { searchPlayer } from "./providers/index.js";

export class ScoutCard {

    constructor() {

        this.cache = new Cache();

        this.queue = new RequestQueue();

        this.tooltip = new Tooltip();

        this.selection = new SelectionManager(

            this.handleSelection.bind(this)

        );

    }

    start() {

        console.log("[ScoutCard] Started.");

        this.selection.start();

    }

    stop() {

        this.selection.stop();

        this.tooltip.hide();

        console.log("[ScoutCard] Stopped.");

    }

    async handleSelection(selection) {

        const key = selection.text.toLowerCase();

        let players = this.cache.get(key);

        if (!players) {

            players = await this.queue.add(() =>

                searchPlayer(selection.text)

            );

            this.cache.set(

                key,

                players

            );

        }

        if (!players.length) {

            this.tooltip.setHTML(`

                <b>${selection.text}</b><br><br>

                No player found.

            `);

            this.tooltip.show(

                selection.x,

                selection.y

            );

            return;

        }

        const player = players[0];

        this.tooltip.setHTML(

            this.renderPlayer(player)

        );

        this.tooltip.show(

            selection.x,

            selection.y

        );

    }

    renderPlayer(player) {

        return `

<div style="display:flex;gap:12px;align-items:center;">

    <img
        src="${player.avatar || ""}"
        style="
            width:56px;
            height:56px;
            border-radius:50%;
            object-fit:cover;
            background:#333;
        "
    >

    <div>

        <div style="font-size:16px;font-weight:700;">

            ${player.name}

        </div>

        <div>

            ${player.club || "-"}

        </div>

        <div>

            ${player.position || "-"}

        </div>

        <div>

            L10: ${player.l10 ?? "-"}

        </div>

    </div>

</div>

`;

    }

}

export default ScoutCard;
