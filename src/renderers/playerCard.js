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


<div class="scoutcard-header-wrapper">

${renderPlayerHeader(player)}

</div>



<div class="scoutcard-divider"></div>



${renderPlayerInfo(player)}



${renderPerformanceTable(player)}



</div>



<style>


@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');



.scoutcard,
.scoutcard * {

font-family:Roboto, Arial, sans-serif !important;

}



.scoutcard-divider {

width:100%;

height:1px;

background:rgba(255,255,255,0.25);

margin:16px 0;

}



</style>


`;

}