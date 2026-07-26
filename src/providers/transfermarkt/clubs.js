/**
 * ScoutCard
 * Transfermarkt Clubs
 */

import { getClubs } from "./api.js";

const cache = new Map();

export async function resolveClubs(ids) {

    const missing = ids.filter(

        id => id && !cache.has(String(id))

    );

    if (missing.length) {

        const clubs = await getClubs(missing);

        for (const club of clubs) {

            cache.set(

                String(club.id),

                {

                    id: club.id,

                    name: club.name,

                    shortName:

                        club.baseDetails?.shortName ||

                        club.name,

                    crest:

                        club.crestUrl ||

                        null,

                    countryId:

                        club.baseDetails?.countryId ||

                        null,

                    url:

                        club.relativeUrl ||

                        null

                }

            );

        }

    }

    return cache;

}

export default resolveClubs;