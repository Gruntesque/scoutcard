/**
 * ScoutCard
 * Transfermarkt Performance
 */

import cache from "../../cache/index.js";
import TTL from "../../cache/ttl.js";
import { getPerformance } from "./api.js";
import resolveClubs from "./clubs.js";

const PLAYED = new Set([
    "played",
    "substituted in",
    "substituted out",
    "played after extra time",
    "extra time",
    "penalty shootout"
]);

function seasonName(game) {

    return (
        game.gameInformation?.season?.display ??
        game.gameInformation?.season?.nonCyclicalName ??
        game.gameInformation?.season?.cyclicalName ??
        "-"
    );

}

function createSeason(name) {

    return {

        season: name,

        clubId: null,

        club: null,

        appearances: 0,

        starts: 0,

        minutes: 0,

        goals: 0,

        assists: 0,

        yellow: 0,

        red: 0,

        secondYellow: 0,

        goalsConceded: 0,

        cleanSheets: 0

    };

}

export async function getTransfermarktPerformance(playerId) {

    if (

        !cache.needsRefresh(

            playerId,

            "transfermarkt",

            "performance",

            TTL.PERFORMANCE

        )

    ) {

        console.log(

            "[TM] Performance cache:",

            playerId

        );

        return cache.getSource(

            playerId,

            "transfermarkt",

            "performance"

        ).data;

    }

    console.time("[TM] Performance");

    const data = await getPerformance(playerId);

    const games = data.performance ?? [];

    const seasons = new Map();

    for (const game of games) {

        const general =
            game.statistics?.generalStatistics ?? {};

        const playing =
            game.statistics?.playingTimeStatistics ?? {};

        const goals =
            game.statistics?.goalStatistics ?? {};

        const cards =
            game.statistics?.cardStatistics ?? {};

        const state =
            (general.participationState || "")
                .toLowerCase();

        if (!PLAYED.has(state)) {
            continue;
        }

        const key = seasonName(game);

        if (!seasons.has(key)) {

            seasons.set(

                key,

                createSeason(key)

            );

        }

        const row = seasons.get(key);

        row.clubId = String(
            general.primaryClubId
        );

        row.appearances++;

        if (playing.isStarting) {
            row.starts++;
        }

        row.minutes +=
            playing.playedMinutes ?? 0;

        row.goals +=
            goals.goalsScoredTotal ?? 0;

        row.assists +=
            goals.assists ?? 0;

        row.yellow +=
            cards.yellowCardGross ?? 0;

        row.red +=
            cards.redCardGross ?? 0;

        row.secondYellow +=
            cards.yellowRedCardGross ?? 0;

        row.goalsConceded +=
            goals.opponentGoalsOnThePitch ?? 0;

        if ((goals.opponentGoalsOnThePitch ?? 0) === 0) {
            row.cleanSheets++;
        }

    }

    console.timeEnd("[TM] Performance");

    console.time("[TM] Clubs");

    const rows = [...seasons.values()];

    const ids = [

        ...new Set(

            rows

                .map(r => r.clubId)

                .filter(Boolean)

        )

    ];

    const clubs = await resolveClubs(ids);

    console.timeEnd("[TM] Clubs");

    for (const row of rows) {

        row.club =

            clubs.get(row.clubId) ??

            {

                id: row.clubId,

                name: "-",

                shortName: "-",

                crest: null

            };

    }

    const performance = rows

        .sort((a, b) =>

            b.season.localeCompare(a.season)

        )

        .slice(0, 3);

    cache.saveSource(

        playerId,

        "transfermarkt",

        "performance",

        performance

    );

    return performance;

}

export default getTransfermarktPerformance;