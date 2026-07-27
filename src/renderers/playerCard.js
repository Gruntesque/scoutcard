/**
 * ScoutCard
 * Player Card Renderer
 */

import renderPlayerHeader from "./playerHeader.js";
import renderPlayerInfo from "./playerInfo.js";
import renderPerformanceTable from "./performanceTable.js";

export default function renderPlayerCard(player) {

    return `

${renderPlayerHeader(player)}

<hr>

${renderPlayerInfo(player)}

<hr>

${renderPerformanceTable(player)}

`;

}