/**
 * ScoutCard
 * Transfermarkt Provider
 */

import searchTransfermarkt from "./search.js";
import getTransfermarktPlayer from "./player.js";
import getTransfermarktPerformance from "./performance.js";

export async function getTransfermarktData(name) {

    console.time("[TM] Total");

    const results = await searchTransfermarkt(name);

    if (!results.length) {

        console.timeEnd("[TM] Total");

        return null;

    }

    const match = results[0];

    const [

        profile,

        performance

    ] = await Promise.all([

        getTransfermarktPlayer(match.id),

        getTransfermarktPerformance(match.id)

    ]);

    console.timeEnd("[TM] Total");

    return {

        ...profile,

        performance,

        search: results

    };

}

export default getTransfermarktData;