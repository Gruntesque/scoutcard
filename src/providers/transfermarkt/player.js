/**
 * ScoutCard
 * Transfermarkt Player
 */

import cache from "../../cache/index.js";
import TTL from "../../cache/ttl.js";
import { getPlayer, getCountries } from "./api.js";
import resolveClubs from "./clubs.js";

let countriesCache = null;

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
    if (!details?.current?.compact) return null;

    const compact = details.current.compact;

    return `${compact.prefix}${compact.content}${compact.suffix}`;
}

function getNationalities(player) {
    const ids =
        player?.nationalityDetails?.nationalities;

    if (!ids) return [];

    return [
        ids.nationalityId,
        ids.secondNationalityId
    ].filter(Boolean);
}

async function getCountryMap() {
    if (countriesCache) return countriesCache;

    const countries = await getCountries();

    countriesCache = {};

    countries.forEach(country => {
        countriesCache[country.id] = country.name;
    });

    return countriesCache;
}

async function getNationalityName(player) {
    const nationalities = getNationalities(player);

    if (!nationalities.length) return null;

    const countries = await getCountryMap();

    return countries[nationalities[0]] ?? null;
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

function getCurrentClubAssignment(player) {
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
        getCurrentClubAssignment(player);

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

    if (!team) return null;

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
        return cache.getSource(
            id,
            "transfermarkt",
            "profile"
        ).data;
    }

    const player = await getPlayer(id);
    const attributes = player.attributes ?? {};

    const assignment =
        getCurrentClubAssignment(player);

    const clubs =
        await resolveClubs([
            assignment?.clubId
        ]);

    const currentClub =
        clubs.get(
            String(assignment?.clubId)
        ) ?? null;

    const ribbonType =
        player.ribbon?.ribbonType ?? null;

    const profile = {
        id:
            Number(player.id),

        name:
            player.name,

        shortName:
            player.shortName,

        url:
            `https://www.transfermarkt.com${player.relativeUrl}`,

        relativeUrl:
            player.relativeUrl,

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

        nationalityName:
            await getNationalityName(player),

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

        currentClub,

        ribbonType,

        loan:
            ribbonType === "ON_LOAN",

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