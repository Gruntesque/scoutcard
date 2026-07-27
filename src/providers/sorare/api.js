/**
 * ScoutCard
 * Sorare API
 */

import { API } from "../../config.js";
import http from "../../http.js";

export async function searchPlayers(query) {

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


    console.dir(

        hits[0],

        {

            depth: null

        }

    );


    return hits;

}

export default {

    searchPlayers

};