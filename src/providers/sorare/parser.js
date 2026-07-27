/**
 * ScoutCard
 * Sorare Parser
 */

import Player from "../../models/player.js";

export function parsePlayer(hit) {

    const player = Player.fromSorare(hit);

    player.raw ??= {};

    player.raw.sorare = hit;

    return player;

}

export default parsePlayer;