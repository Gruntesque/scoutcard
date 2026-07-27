/**
 * ScoutCard
 * Providers Resolver
 */


import {

    getTransfermarktData

} from "./transfermarkt/index.js";


import cache from "../cache.js";



export async function resolvePlayers(

    name

) {


    const key =

        name

            .toLowerCase()

            .trim();



    const cached =

        cache.get(

            key

        );



    if (

        cached

    ) {

        return cached;

    }



    const player =

        await getTransfermarktData(

            name

        );



    if (

        !player

    ) {

        return null;

    }



    const result = {

        type:

            "player",

        data:

            player

    };



    cache.set(

        key,

        result

    );



    return result;


}



export default resolvePlayers;