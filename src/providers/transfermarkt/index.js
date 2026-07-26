/**
 * ScoutCard
 * Transfermarkt Provider
 */

import searchTransfermarkt from "./search.js";
import getTransfermarktPlayer from "./player.js";
import getTransfermarktPerformance from "./performance.js";

export async function getTransfermarktData(name) {

    console.time("[TM] Total");

    console.time("[TM] Search");

    const results = await searchTransfermarkt(name);

    console.timeEnd("[TM] Search");

    if (!results.length) {

        console.timeEnd("[TM] Total");

        return null;

    }

    const match = results[0];

    console.time("[TM] Player + Performance");

    const [

        player,

        performance

    ] = await Promise.all([

        getTransfermarktPlayer(match.id),

        getTransfermarktPerformance(match.id)

    ]);

    console.timeEnd("[TM] Player + Performance");

    console.timeEnd("[TM] Total");

    return {

        ...player,

        performance,

        search: results

    };

}

export default getTransfermarktData;