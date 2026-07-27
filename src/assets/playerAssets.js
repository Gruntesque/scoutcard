/**
 * ScoutCard
 * Player Assets
 */

import {
    loadExternalImage
} from "../utils/image.js";

import countryToCode from "./flags.js";


export async function preparePlayerAssets(player) {


    const tm =

        player?.transfermarkt;


    if (!tm) {

        return player;

    }



    let photo =

        tm.photo || "";



    if (photo) {


        const blobPhoto =

            await loadExternalImage(

                photo

            );


        photo =

            blobPhoto || photo;


    }



    let flag = "";



   if (tm.nationalityName) {

    const code =
        countryToCode(
            tm.nationalityName
        );



        if (code) {


            flag =

                await loadExternalImage(

                    `https://flagcdn.com/20x15/${code}.png`

                );


        }


    }



    return {


        ...player,


        transfermarkt: {


            ...tm,


            photo,


            flag


        }


    };


}



export default preparePlayerAssets;