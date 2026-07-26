/**
 * ScoutCard
 * Sorare provider
 */

import { API } from "../config.js";
import http from "../http.js";
import Player from "../models/player.js";

async function search(query) {

    const json = await http.postJSON(

        API.sorare.search,

        JSON.stringify({

            requests: [

                {

                    indexName: "Player",

                    params:

                        "allowTyposOnNumericTokens=false" +

                        "&filters=sport:football" +

                        "&hitsPerPage=10" +

                        "&query=" +

                        encodeURIComponent(query)

                }

            ]

        }),

        {

            headers: {

                "Content-Type": "application/json"

            }

        }

    );

    const hits =

        json.results?.[0]?.hits ?? [];

    return hits.map(

        hit => Player.fromSorare(hit)

    );

}

const Sorare = {

    name: "Sorare",

    search

};

export default Sorare;