/**
 * ScoutCard
 * Transfermarkt Player
 */

import { getPlayer } from "./api.js";

function formatMarketValue(details) {

    if (!details || !details.current || !details.current.compact) {
        return null;
    }

    const compact = details.current.compact;

    return `${compact.prefix}${compact.content}${compact.suffix}`;

}

function getNationalities(player) {

    const ids = player?.nationalityDetails?.nationalities;

    if (!ids) {
        return [];
    }

    return [

        ids.nationalityId,

        ids.secondNationalityId

    ].filter(Boolean);

}

function getPositions(attributes) {

    const positions = [];

    if (attributes.position) {
        positions.push(attributes.position);
    }

    if (attributes.firstSidePosition) {
        positions.push(attributes.firstSidePosition);
    }

    if (attributes.secondSidePosition) {
        positions.push(attributes.secondSidePosition);
    }

    return positions;

}

export async function getTransfermarktPlayer(id) {

    const player = await getPlayer(id);

    const attributes = player.attributes ?? {};

    return {

        id: Number(player.id),

        name: player.name,

        shortName: player.shortName,

        url: `https://www.transfermarkt.com${player.relativeUrl}`,

        photo: player.portraitUrl,

        age: player.lifeDates?.age ?? null,

        birthDate: player.lifeDates?.dateOfBirth ?? null,

        height: attributes.height ?? null,

        foot: attributes.preferredFoot?.name ?? null,

        contractUntil: attributes.contractUntil ?? null,

        marketValue: formatMarketValue(
            player.marketValueDetails
        ),

        marketValueValue:
            player.marketValueDetails?.current?.value ?? null,

        marketValueUpdated:
            player.marketValueDetails?.current?.determined ?? null,

        highestMarketValue:
            player.marketValueDetails?.highest?.value ?? null,

        nationalities: getNationalities(player),

        positions: getPositions(attributes),

        currentClub:

            player.clubAssignments?.find(

                club => club.type === "current"

            ) ?? null,

        raw: player

    };

}

export default getTransfermarktPlayer;