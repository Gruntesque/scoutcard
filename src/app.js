/**
 * ScoutCard
 * Application
 */

import Selection from "./selection.js";
import Tooltip from "./tooltip.js";
import resolvePlayers from "./providers/index.js";
import { clearDatabase } from "./cache/storage.js";


export default class ScoutCard {

    constructor() {

        this.selection =
            new Selection(

                this.onSelection.bind(this)

            );


        this.tooltip =
            new Tooltip();

    }


    start() {

        console.log(

            "ScoutCard"

        );


        console.log(

            "Version: 0.1.0"

        );


        console.log(

            "Initialized"

        );


        this.selection.start();

    }


    clearCache() {

        clearDatabase();


        console.log(

            "[ScoutCard] Cache cleared"

        );

    }


    async onSelection(selection) {

        const name =
            selection.text;


        if (!name) {

            return;

        }


        console.log(

            "[ScoutCard] Selection:",

            name

        );


        this.tooltip.showLoading(name);


        try {

            const player =
                await resolvePlayers(name);


            this.tooltip.show(

                player,

                selection.x,

                selection.y

            );


        }

        catch(error) {

            console.error(error);


            this.tooltip.showError(

                error.message

            );

        }

    }

}