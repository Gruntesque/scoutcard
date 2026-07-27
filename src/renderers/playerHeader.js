/**
 * ScoutCard
 * Player Header Renderer
 */

import bootIcon from "../assets/boot.js";


function formatFoot(foot) {

    if (!foot) {

        return "-";

    }


    switch (foot.toLowerCase()) {

        case "direito":
        case "right":
            return "right";

        case "esquerdo":
        case "left":
            return "left";

        case "ambidestro":
        case "both":
            return "both";

        default:
            return foot;

    }

}



function formatMarketValue(value) {

    if (!value) {

        return "-";

    }


    return value

        .replace(",", ".")

        .replace(/m$/, "M");

}



function isCaptain(player) {

    const tm =
        player?.transfermarkt;


    return Boolean(

        tm?.isCaptain ||

        tm?.currentClub?.isCaptain ||

        tm?.raw?.clubAssignments?.some(

            club =>

                club.type === "current" &&

                club.isCaptain

        )

    );

}



function captainIcon(player) {


    if (!isCaptain(player)) {

        return "";

    }



    return `

<img

class="scoutcard-captain"

src="https://tmsi.akamaized.net/icons/captain_1_minified.png"

title="Captain"

>

`;

}



function nationalityFlag(tm) {


    if (!tm?.flag) {

        return "";

    }


    return `

<img

class="scoutcard-flag"

src="${tm.flag}"

title="${tm.nationalityName || ""}"

>

`;

}



function nationalities(tm) {


    return (

        nationalityFlag(

            tm

        )

    );

}



function currentClub(tm) {


    return (

        tm.performance?.[0]?.club?.shortName ||

        tm.currentClub?.name ||

        "-"

    );

}



function positions(tm) {


    return (tm.positions || [])

        .map(

            position => position.shortName

        )

        .filter(Boolean)

        .join(" • ");

}



export default function renderPlayerHeader(player) {


    const tm =
        player?.transfermarkt;



    if (!tm) {

        return "";

    }



    return `


<div class="scoutcard-header">


<div class="scoutcard-photo">

<img

src="${tm.photo || ""}"

>

</div>



<div class="scoutcard-main">


<div class="scoutcard-name">

${nationalities(tm)}

${tm.name}

${captainIcon(player)}

</div>



<div class="scoutcard-club">

${currentClub(tm)}

</div>



<div class="scoutcard-position">

${positions(tm)}

</div>



<div class="scoutcard-details">


${tm.age || "-"}

years

•

${tm.height || "-"}

m

•

<img

class="scoutcard-foot"

src="${bootIcon}"

title="Preferred foot"

>

${formatFoot(tm.foot)}



</div>



<div class="scoutcard-market">

${formatMarketValue(tm.marketValue)}

•

Contract:

${tm.contractUntil || "-"}

</div>



</div>


</div>



<style>


@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');



.scoutcard-header {

display:flex;

gap:16px;

align-items:flex-start;

font-family:Roboto, Arial, sans-serif;

}



.scoutcard-header * {

font-family:Roboto, Arial, sans-serif;

}



.scoutcard-photo img {

width:150px;

height:150px;

object-fit:cover;

border-radius:10px;

}



.scoutcard-main {

flex:1;

}



.scoutcard-name {

font-size:24px;

font-weight:700;

line-height:1.1;

display:flex;

align-items:center;

gap:6px;

}



.scoutcard-flag {

width:20px;

height:15px;

object-fit:cover;

}



.scoutcard-club {

font-size:18px;

font-weight:600;

margin-top:4px;

}



.scoutcard-position {

font-size:18px;

font-weight:500;

margin-top:4px;

}



.scoutcard-details {

font-size:18px;

margin-top:4px;

display:flex;

align-items:center;

gap:6px;

}



.scoutcard-foot {

width:22px;

height:22px;

object-fit:contain;

}



.scoutcard-market {

font-size:18px;

margin-top:4px;

}



.scoutcard-captain {

width:18px;

height:18px;

object-fit:contain;

}



</style>


`;

}