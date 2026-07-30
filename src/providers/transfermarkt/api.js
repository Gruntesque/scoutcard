/**
 * ScoutCard
 * Transfermarkt API
 */

import http, { getJSON } from "../../http.js";

const API =
    "https://tmapi.transfermarkt.technology";

const WEB =
    "https://www.transfermarkt.com";

export async function getPlayer(id) {

    const json = await getJSON(

        `${API}/players?ids[]=${id}`

    );

    return json.data?.[0] ?? null;

}

export async function getCountries() {

    return await getJSON(

        `${WEB}/quickselect/countries`

    );

}

export async function getPerformance(id) {

    const json = await getJSON(

        `${API}/player/${id}/performance-game`

    );

    return json.data?.performance ?? [];

}

export async function getClubs(ids) {

    if (!ids.length) {

        return [];

    }

    const query = ids

        .map(id => `ids[]=${id}`)

        .join("&");

    const json = await getJSON(

        `${API}/clubs?${query}`

    );

    return json.data ?? [];

}

export async function getPlayerPage(relativeUrl) {

    if (!relativeUrl) {

        return null;

    }

    return await http.get(

        `${WEB}${relativeUrl}`

    );

}