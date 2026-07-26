/**
 * ScoutCard
 * Transfermarkt Search
 */

import http from "../../http.js";

const SEARCH_URL =
    "https://www.transfermarkt.com/schnellsuche/ergebnis/schnellsuche";

function stripAccents(text) {

    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}

function normalize(text) {

    return stripAccents(text)
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}

function score(query, candidate) {

    const q = normalize(query);
    const c = normalize(candidate);

    if (q === c) {
        return 1000;
    }

    if (c.startsWith(q)) {
        return 900;
    }

    if (c.includes(q)) {
        return 800;
    }

    const qWords = q.split(" ");
    const cWords = c.split(" ");

    let value = 0;

    for (const word of qWords) {

        if (cWords.includes(word)) {
            value += 100;
        }

    }

    return value;

}

export async function searchTransfermarkt(name) {

    const url =
        `${SEARCH_URL}?query=${encodeURIComponent(name)}`;

    const html = await http.get(url);

    const doc = new DOMParser().parseFromString(
        html,
        "text/html"
    );

    const links = [

        ...doc.querySelectorAll(
            'a[href*="/profil/spieler/"]'
        )

    ];

    const players = [];

    const seen = new Set();

    for (const link of links) {

        const href = link.getAttribute("href");

        if (!href || seen.has(href)) {
            continue;
        }

        seen.add(href);

        const match = href.match(/spieler\/(\d+)/);

        if (!match) {
            continue;
        }

        players.push({

            id: Number(match[1]),

            name: link.textContent.trim(),

            url: new URL(
                href,
                "https://www.transfermarkt.com"
            ).href

        });

    }

    players.sort((a, b) =>

        score(name, b.name) -
        score(name, a.name)

    );

    return players;

}

export default searchTransfermarkt;