/**
 * ScoutCard
 * Cache TTL
 */

const MINUTE = 60 * 1000;

export const TTL = {

    PLAYER:
        90,

    PROFILE:
        0,

    PERFORMANCE:
        0,

    SORARE:
        0

};


export function isExpired(updated, ttl) {

    if (!updated) {

        return true;

    }


    if (ttl === 0) {

        return true;

    }


    return Date.now() - updated > ttl;

}


export default TTL;