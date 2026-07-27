/**
 * ScoutCard
 * Transfermarkt Clubs
 */

import cache from "../../cache/index.js";
import TTL from "../../cache/ttl.js";
import { getClubs } from "./api.js";

const PROVIDER = "transfermarkt";
const RESOURCE = "club";

export async function resolveClubs(ids) {

    const clubs = new Map();

    const missing = [];

    for (const id of ids) {

        if (!id) {
            continue;
        }

        if (

            !cache.needsRefresh(

                id,

                PROVIDER,

                RESOURCE,

                TTL.PROFILE

            )

        ) {

            clubs.set(

                String(id),

                cache.getSource(

                    id,

                    PROVIDER,

                    RESOURCE

                ).data

            );

        }

        else {

            missing.push(id);

        }

    }

    if (missing.length) {

        const response = await getClubs(missing);

        for (const club of response) {

            const data = {

                id: club.id,

                name: club.name,

                shortName:

                    club.baseDetails?.shortName ??

                    club.name,

                crest:

                    club.crestUrl ??

                    null,

                countryId:

                    club.baseDetails?.countryId ??

                    null,

                url:

                    club.relativeUrl ??

                    null

            };

            cache.saveSource(

                String(club.id),

                PROVIDER,

                RESOURCE,

                data

            );

            clubs.set(

                String(club.id),

                data

            );

        }

    }

    return clubs;

}

export default resolveClubs;