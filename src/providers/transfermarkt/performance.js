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



function seasonSortValue(season) {

    if (!season) {
        return 0;
    }

    if (/^\d{4}$/.test(season)) {
        return Number(season);
    }

    const match = season.match(/^(\d{2})\/(\d{2})$/);

    if (match) {
        return 2000 + Number(match[1]);
    }

    return 0;

}



function createSeason(name, clubId, order) {

    return {
        season: name,
        seasonSort: seasonSortValue(name),
        clubId,
        club: null,
        order,
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



function getClubId(game) {

    return (
        game.clubsInformation?.club?.clubId ??
        game.clubsInformation?.club?.id ??
        game.gameInformation?.clubId ??
        null
    );

}



function aggregatePerformance(games) {

    const seasons = new Map();

    let order = 0;


    for (const game of games) {


        if (game.gameInformation?.isNationalGame) {
            continue;
        }


        const general =
            game.statistics?.generalStatistics ?? {};


        const playing =
            game.statistics?.playingTimeStatistics ?? {};


        const goals =
            game.statistics?.goalStatistics ?? {};


        const cards =
            game.statistics?.cardStatistics ?? {};


        const state =
            (
                general.participationState ?? ""
            ).toLowerCase();


        if (
            state &&
            !PLAYED.has(state)
        ) {
            continue;
        }


        const season =
            seasonName(game);


        const clubId =
            getClubId(game);


        if (!clubId) {
            continue;
        }


        const key =
            `${season}-${clubId}`;


        if (!seasons.has(key)) {

            seasons.set(
                key,
                createSeason(
                    season,
                    clubId,
                    order++
                )
            );

        }


        const row =
            seasons.get(key);


        row.appearances += 1;


        if (playing.isStarting) {
            row.starts++;
        }


        const playedMinutes =
            Number(
                playing.playedMinutes ?? 0
            );


        row.minutes += playedMinutes;


        row.goals +=
            Number(
                goals.goalsScoredTotal ?? 0
            );


        row.assists +=
            Number(
                goals.assists ?? 0
            );


        row.goalsConceded +=
            Number(
                goals.opponentGoalsOnThePitch ?? 0
            );


        if (
            playedMinutes > 0 &&
            Number(
                goals.opponentGoalsOnThePitch ?? 0
            ) === 0
        ) {

            row.cleanSheets++;

        }


        row.yellow +=
            Number(
                cards.yellowCardGross ?? 0
            );


        row.red +=
            Number(
                cards.redCardGross ?? 0
            );


        row.secondYellow +=
            Number(
                cards.yellowRedCardGross ?? 0
            );

    }


    const performance =

        Array.from(
            seasons.values()
        )

        .sort((a, b) => {

            if (
                b.seasonSort !== a.seasonSort
            ) {

                return (
                    b.seasonSort -
                    a.seasonSort
                );

            }


            return (
                a.order -
                b.order
            );

        });


    const latestSeason =
        performance[0]?.seasonSort ?? 0;


    const cutoffSeason =
        latestSeason - 3;


    return performance.filter(

        row =>
            row.seasonSort >= cutoffSeason

    );

}



export async function getTransfermarktPerformance(id) {


    if (
        !cache.needsRefresh(
            id,
            "transfermarkt",
            "performance",
            TTL.PLAYER
        )
    ) {

        return cache.getSource(
            id,
            "transfermarkt",
            "performance"
        ).data;

    }



    const games =
        await getPerformance(id);



    const performance =
        aggregatePerformance(games);



    const clubs =
        await resolveClubs(
            [
                ...new Set(
                    performance.map(
                        row => row.clubId
                    )
                )
            ]
        );



    for (const row of performance) {

        row.club =
            clubs.get(
                String(row.clubId)
            )
            ??
            {
                id: row.clubId,
                name: "-",
                shortName: "-"
            };

    }



    cache.saveSource(
        id,
        "transfermarkt",
        "performance",
        performance
    );



    return performance;

}



export default getTransfermarktPerformance;