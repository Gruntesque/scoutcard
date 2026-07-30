/**
 * ScoutCard
 * Transfermarkt Provider
 */

import searchTransfermarkt from "./search.js";
import getTransfermarktPlayer from "./player.js";
import getTransfermarktPerformance from "./performance.js";
import { getPlayerPage } from "./api.js";
import parseTransfermarkt from "./parser.js";

export async function getTransfermarktData(name){

const results =
    await searchTransfermarkt(name);

if(!results.length){

    return null;

}

const match =
    results[0];

const profile =
    await getTransfermarktPlayer(match.id);


const [
    performance,
    html
] = await Promise.all([

    getTransfermarktPerformance(match.id),

    getPlayerPage(
        profile?.relativeUrl ??
        match.relativeUrl
    )

]);


const page =
    html
        ? parseTransfermarkt(html)
        : {};


return {

    ...page,

    ...profile,

    performance,

    search: results

};

}

export default getTransfermarktData;