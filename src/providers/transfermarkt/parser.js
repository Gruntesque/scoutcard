/**
 * ScoutCard
 * Transfermarkt Parser
 */

import parseProfile from "./profile.js";
import parseMarketValue from "./marketValue.js";

export function parseTransfermarkt(html) {

    const profile = parseProfile(html);

    const market = parseMarketValue(html);

    return {

        id: null,

        url: null,

        age: profile.age,

        height: profile.height,

        foot: profile.foot,

        position: profile.position,

        citizenship: profile.citizenship,

        contractExpires: profile.contractExpires,

        marketValue: market.value,

        marketValueUpdated: market.lastUpdate

    };

}

export default parseTransfermarkt;