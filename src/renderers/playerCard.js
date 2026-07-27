/**
 * ScoutCard
 * Player Card Renderer
 */

import renderPlayerHeader from "./playerHeader.js";
import renderPlayerInfo from "./playerInfo.js";
import renderPerformanceTable from "./performanceTable.js";


export default function renderPlayerCard(player) {

    return `

<div class="scoutcard">

${renderPlayerHeader(player)}

${renderPlayerInfo(player)}

${renderPerformanceTable(player)}

</div>


<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');


.scoutcard,
.scoutcard * {

font-family:Roboto, Arial, sans-serif !important;

}


</style>


`;

}