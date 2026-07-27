/**
 * ScoutCard
 * Transfermarkt Player
 */

import cache from "../../cache/index.js";
import TTL from "../../cache/ttl.js";
import { getPlayer } from "./api.js";


const POSITION_MAP = {

    1: "GK",

    2: "CB",

    3: "LB",

    4: "RB",

    5: "DM",

    6: "CM",

    7: "CM",

    8: "LM",

    9: "RM",

    10: "AM",

    11: "LW",

    12: "RW",

    13: "SS",

    14: "CF",

    15: "ST"

};


function formatMarketValue(details) {

    if (!details?.current?.compact) {

        return null;

    }


    const compact =
        details.current.compact;


    return `${compact.prefix}${compact.content}${compact.suffix}`;

}


function getNationalities(player) {

    const ids =
        player?.nationalityDetails?.nationalities;


    if (!ids) {

        return [];

    }


    return [

        ids.nationalityId,

        ids.secondNationalityId

    ].filter(Boolean);

}


function getPositions(attributes) {

    return [

        attributes.position,

        attributes.firstSidePosition,

        attributes.secondSidePosition

    ]

    .filter(Boolean)

    .map(position => ({

        id:
            position.id ?? null,


        name:
            POSITION_MAP[position.id] ??
            position.name ??
            "",


        shortName:
            POSITION_MAP[position.id] ??
            position.shortName ??
            ""

    }));

}


function getCurrentClub(player) {

    return (

        player.currentClub ??

        player.clubAssignments?.find(

            club => club.type === "current"

        ) ??

        null

    );

}


function getCaptainStatus(player) {

    const currentClub =
        getCurrentClub(player);


    return Boolean(

        currentClub?.isCaptain ||

        player?.clubAssignments?.some(

            club =>

                club.type === "current" &&

                club.isCaptain

        )

    );

}


function getNationalTeam(player) {

    const team =

        player?.nationalTeam ??

        player?.nationalTeamStatistics ??

        player?.internationalStatistics ??

        null;


    if (!team) {

        return null;

    }


    return {

        caps:
            team.caps ??
            team.appearances ??
            team.matches ??
            null,


        goals:
            team.goals ??
            team.goalsScored ??
            null,


        assists:
            team.assists ??
            null,


        goalsConceded:
            team.goalsConceded ??
            null,


        cleanSheets:
            team.cleanSheets ??
            null

    };

}


export async function getTransfermarktPlayer(id) {


    if (

        !cache.needsRefresh(

            id,

            "transfermarkt",

            "profile",

            TTL.PLAYER

        )

    ) {


        console.log(

            "[TM] Profile cache:",

            id

        );


        return cache.getSource(

            id,

            "transfermarkt",

            "profile"

        ).data;

    }



    const player =
        await getPlayer(id);



    const attributes =
        player.attributes ?? {};



    const profile = {


        id:
            Number(player.id),


        name:
            player.name,


        shortName:
            player.shortName,


        url:
            `https://www.transfermarkt.com${player.relativeUrl}`,


        photo:
            player.portraitUrl,


        age:
            player.lifeDates?.age ?? null,


        birthDate:
            player.lifeDates?.dateOfBirth ?? null,


        height:
            attributes.height ?? null,


        foot:
            attributes.preferredFoot?.name ?? null,


        contractUntil:
            attributes.contractUntil ?? null,


        marketValue:
            formatMarketValue(

                player.marketValueDetails

            ),


        marketValueValue:
            player.marketValueDetails?.current?.value ?? null,


        marketValueUpdated:
            player.marketValueDetails?.current?.determined ?? null,


        highestMarketValue:
            player.marketValueDetails?.highest?.value ?? null,


        nationalities:
            getNationalities(player),


        isCaptain:
            getCaptainStatus(player),


        nationalTeam:
            getNationalTeam(player),


        positionGroup:
            attributes.positionGroup ?? null,


        positionGroupName:
            attributes.positionGroupName ?? null,


        positions:
            getPositions(attributes),


        currentClub:
            getCurrentClub(player),


        raw:
            player

    };



    cache.saveSource(

        id,

        "transfermarkt",

        "profile",

        profile

    );


    return profile;

}


export default getTransfermarktPlayer;