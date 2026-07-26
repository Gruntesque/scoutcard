/**
 * ScoutCard
 * Sorare Provider
 */

import { API } from "../config.js";

const SEARCH_URL = API.sorare.search;

function club(player) {

    return player.active_club?.name ||

        player.activeClub?.name ||

        "-";

}

function position(player) {

    const value =

        player.position ||

        player.positions?.[0] ||

        "-";

    switch (value) {

        case "Goalkeeper":
            return "GK";

        case "Defender":
            return "DEF";

        case "Midfielder":
            return "MID";

        case "Forward":
            return "FWD";

        default:
            return value;

    }

}

function last10(player) {

    return player.status?.last_ten_played_so5_average_score ?? null;

}

function buildPlayer(player) {

    return {

        id: player.objectID,

        source: "sorare",

        name: player.display_name,

        slug: player.slug,

        avatar: player.avatarUrl,

        nationality: player.country?.code || null,

        club: club(player),

        position: position(player),

        l10: last10(player),

        raw: player

    };

}

export async function search(name, limit = 10) {

    const response = await fetch(SEARCH_URL, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            requests: [

                {

                    indexName: "Player",

                    params:

                        "allowTyposOnNumericTokens=false" +

                        "&filters=sport:football" +

                        "&hitsPerPage=" + limit +

                        "&query=" +

                        encodeURIComponent(name)

                }

            ]

        })

    });

    if (!response.ok) {

        throw new Error(

            "Sorare request failed."

        );

    }

    const json = await response.json();

    const hits =

        json.results?.[0]?.hits ||

        [];

    return hits.map(buildPlayer);

}

export default {

    name: "Sorare",

    search

};
