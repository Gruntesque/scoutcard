/**
 * ScoutCard
 * Sorare Search
 */

import { searchPlayers } from "./api.js";
import parsePlayer from "./parser.js";

export async function search(query) {

    const hits = await searchPlayers(query);

    console.dir(

        hits[0],

        {

            depth: null

        }

    );

    return hits.map(

        parsePlayer

    );

}

export default search;