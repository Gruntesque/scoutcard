/**
 * ScoutCard
 * Providers
 */

import Sorare from "./sorare.js";
import getTransfermarktData from "./transfermarkt/index.js";

export async function getPlayerData(name) {

    console.log("[ScoutCard] Searching:", name);

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

    return {

        sorare:

            sorare?.[0] ??

            null,

        transfermarkt

    };

}

export default getPlayerData;