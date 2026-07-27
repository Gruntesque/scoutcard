/**
 * ScoutCard
 * Performance Table Renderer
 */


function isGoalkeeper(player) {

    return (

        player?.transfermarkt?.positionGroup ===
        "GOALKEEPER"

    );

}



function renderHeaders(goalkeeper) {


    if (goalkeeper) {

        return `

<th>Season</th>
<th>Club</th>
<th>Apps</th>
<th>Min</th>
<th>GC</th>
<th>CS</th>

`;

    }


    return `

<th>Season</th>
<th>Club</th>
<th>Apps</th>
<th>Min</th>
<th>G</th>
<th>A</th>

`;

}



function renderGoalkeeperRow(row) {


    return `

<tr>

<td>${row.season ?? "-"}</td>

<td>${row.club?.shortName ?? "-"}</td>

<td>${row.appearances ?? "-"}</td>

<td>${row.minutes ?? "-"}</td>

<td>${row.goalsConceded ?? "-"}</td>

<td>${row.cleanSheets ?? "-"}</td>

</tr>

`;

}



function renderOutfieldRow(row) {


    return `

<tr>

<td>${row.season ?? "-"}</td>

<td>${row.club?.shortName ?? "-"}</td>

<td>${row.appearances ?? "-"}</td>

<td>${row.minutes ?? "-"}</td>

<td>${row.goals ?? "-"}</td>

<td>${row.assists ?? "-"}</td>

</tr>

`;

}



export default function renderPerformanceTable(player) {


    const goalkeeper =
        isGoalkeeper(player);


    const rows =
        player?.transfermarkt?.performance ?? [];



    return `


<table class="scoutcard-performance">


<thead>

<tr>

${renderHeaders(goalkeeper)}

</tr>

</thead>


<tbody>


${rows.map(row =>

    goalkeeper

        ? renderGoalkeeperRow(row)

        : renderOutfieldRow(row)

).join("")}


</tbody>


</table>



<style>


.scoutcard-performance {

width:100%;

border-collapse:collapse;

font-size:13px;

font-family:inherit !important;

}



.scoutcard-performance th,
.scoutcard-performance td {

padding:6px 8px;

border:0 !important;

background:transparent;

color:#ffffff;

font-family:inherit !important;

}



.scoutcard-performance th {

font-weight:700;

}



.scoutcard-performance tr {

border:0 !important;

}



.scoutcard-performance th:nth-child(n+3),
.scoutcard-performance td:nth-child(n+3) {

text-align:center;

}



</style>


`;

}