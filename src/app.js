/**
 * ScoutCard
 * Application
 */


import Selection from "./selection.js";
import Tooltip from "./tooltip.js";
import resolvePlayers from "./providers/index.js";
import {
    clearDatabase
} from "./cache/storage.js";

import {
    showPlayerSelector
} from "./renderers/playerSelector.js";

import getTransfermarktPlayer from "./providers/transfermarkt/player.js";

import countryToCode from "./assets/flags.js";



export default class ScoutCard {


    constructor() {


        this.activePlayer = null;

        this.activeSelection = null;



        this.selection =

            new Selection(

                this.onSelection.bind(this),

                this.onSelectionHover.bind(this)

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



    wrapPlayer(player) {


        return {

            transfermarkt: player

        };


    }



    async onSelection(selection) {


        const name = selection.text;


        // permite selecionar novamente o mesmo jogador

        this.selection.lastSelection = "";



        if (!name) {

            return;

        }



        console.log(

            "[ScoutCard] Selection:",

            name

        );



        this.tooltip.showLoading(name);



        try {



            const result =

                await resolvePlayers(name);



            if (!result) {


                this.tooltip.showError(

                    "Jogador não encontrado"

                );


                return;


            }



            if (

                result.type === "player"

            ) {


                const player =

                    this.wrapPlayer(

                        result.data

                    );



                this.activePlayer = player;

                this.activeSelection = selection;



                this.tooltip.show(

                    player,

                    selection.x,

                    selection.y

                );



                return;


            }



            if (

                result.type === "selection"

            ) {


                await this.openSelector(

                    result.results,

                    selection

                );


            }



        }

        catch(error) {


            console.error(error);



            this.tooltip.showError(

                error.message

            );


        }


    }



    async openSelector(

        results,

        selection

    ) {


        const players = [];



        if (

            !results ||

            !results.length

        ) {


            this.tooltip.showError(

                "Nenhum jogador encontrado"

            );


            return;


        }



        for (

            const item of results

        ) {


            try {


                const player =

                    await getTransfermarktPlayer(

                        item.id

                    );



                if (

                    !player

                ) {

                    continue;

                }



                players.push({

                    ...player,

                    flag:

                        countryToCode(

                            player.nationalityName

                        )

                });



            }

            catch(error) {


                console.warn(

                    "[TM] Selector load failed:",

                    item.id

                );


            }


        }



        if (

            !players.length

        ) {


            this.tooltip.showError(

                "Nenhum jogador encontrado"

            );


            return;


        }



        showPlayerSelector(

            players,

            (player) => {



                const wrapped =

                    this.wrapPlayer(

                        player

                    );



                this.activePlayer = wrapped;

                this.activeSelection = selection;



                this.tooltip.show(

                    wrapped,

                    selection.x,

                    selection.y

                );



            }

        );


    }



    onSelectionHover(selection) {


        if (

            !this.activePlayer

        ) {


            return;


        }



        this.tooltip.show(

            this.activePlayer,

            selection.x,

            selection.y

        );


    }


}