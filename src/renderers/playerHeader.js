/**
 * ScoutCard
 * Player Header Renderer
 */

import styles from "./playerHeaderStyles.js";
import playerHeaderPhoto from "./playerHeaderPhoto.js";
import { injuryBlock, loanBlock } from "./playerHeaderAlerts.js";
import {
    captainIcon,
    nationalities,
    currentClub,
    positions,
    sorareSearchLink,
    playerDetails,
    marketBlock
} from "./playerHeaderSections.js";

export default function renderPlayerHeader(player) {

    const tm =
        player?.transfermarkt;

    if (!tm) {

        return "";

    }

    return `

<div class="scoutcard-header">

${playerHeaderPhoto(tm)}


<div class="scoutcard-main">


<div class="scoutcard-name">

${nationalities(tm)}

<a
class="scoutcard-sorare-link"
href="${sorareSearchLink(tm.name)}"
target="_blank"
>
${tm.name}
</a>

${captainIcon(player)}

</div>


<div class="scoutcard-club">

${currentClub(tm)}

</div>


<div class="scoutcard-position">

${positions(tm)}

</div>


${playerDetails(tm)}


${marketBlock(tm)}


${injuryBlock(tm)}


${loanBlock(tm)}


</div>

</div>


<style>

${styles}

</style>

`;

}
