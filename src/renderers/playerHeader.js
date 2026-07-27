/**
 * ScoutCard
 * Player Header Renderer
 */


function formatFoot(foot) {

    if (!foot) {

        return "-";

    }


    switch (foot.toLowerCase()) {

        case "direito":
            return "right";

        case "esquerdo":
            return "left";

        case "ambidestro":
        case "both":
            return "both";

        default:
            return foot;

    }

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

${tm.name}

${captainIcon(player)}

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

${formatFoot(tm.foot)}

</div>



<div class="scoutcard-market">

${tm.marketValue || "-"}

•

Contract:

${tm.contractUntil || "-"}

</div>



</div>


</div>



<style>


.scoutcard-header {

display:flex;

gap:16px;

align-items:flex-start;

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



.scoutcard-captain {

width:18px;

height:18px;

object-fit:contain;

}



.scoutcard-position {

font-size:18px;

font-weight:500;

margin-top:4px;

}



.scoutcard-details {

font-size:18px;

margin-top:4px;

}



.scoutcard-market {

font-size:18px;

margin-top:4px;

}



</style>


`;

}