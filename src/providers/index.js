/**
 * ScoutCard
 * Providers
 */

import cache from "../cache.js";
import Sorare from "./sorare/index.js";
import getTransfermarktData from "./transfermarkt/index.js";

function cacheKey(name) {

    return name
        .trim()
        .toLowerCase();

}

export async function getPlayerData(name) {

    const key = cacheKey(name);

    if (cache.has(key)) {

        console.log(
            "[ScoutCard] Cache:",
            name
        );

        return cache.get(key);

    }

    console.log(
        "[ScoutCard] Searching:",
        name
    );

    const [

        sorareResult,

        transfermarktResult

    ] = await Promise.allSettled([

        Sorare.search(name),

        getTransfermarktData(name)

    ]);

    let sorare = null;
    let transfermarkt = null;

    if (sorareResult.status === "fulfilled") {

        sorare = sorareResult.value;

        console.log(
            "[ScoutCard] Sorare:",
            sorare
        );

    }

    else {

        console.error(
            "[ScoutCard] Sorare failed",
            sorareResult.reason
        );

    }

    if (transfermarktResult.status === "fulfilled") {

        transfermarkt = transfermarktResult.value;

        console.log(
            "[ScoutCard] Transfermarkt:",
            transfermarkt
        );

    }

    else {

        console.error(
            "[ScoutCard] Transfermarkt failed",
            transfermarktResult.reason
        );

    }

    const player = {

        sorare:

            sorare?.[0] ??

            null,

        transfermarkt

    };

    cache.set(

        key,

        player

    );

    return player;

}

export default getPlayerData;