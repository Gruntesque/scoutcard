/**
 * ScoutCard
 * Tooltip
 */

function isGoalkeeper(player) {

    const tm = player?.transfermarkt;

    if (!tm) {
        return false;
    }

    return tm.positions?.some(position => {

        const name = (
            position.name ||
            position.shortName ||
            ""
        ).toLowerCase();

        return (
            name.includes("goalkeeper") ||
            name.includes("keeper") ||
            name === "gk" ||
            name === "gol"
        );

    });

}

function renderPerformance(player) {

    const tm = player?.transfermarkt;

    const rows = tm?.performance ?? [];

    const goalkeeper = isGoalkeeper(player);

    const headers = goalkeeper
        ? `
            <th>Temp.</th>
            <th>Clube</th>
            <th>J</th>
            <th>Min</th>
            <th>GS</th>
            <th>SG</th>
        `
        : `
            <th>Temp.</th>
            <th>Clube</th>
            <th>J</th>
            <th>Min</th>
            <th>G</th>
            <th>A</th>
        `;

    const body = rows.map(row => {

        if (goalkeeper) {

            return `
<tr>
<td>${row.season}</td>
<td>${row.club?.shortName ?? "-"}</td>
<td align="center">${row.appearances}</td>
<td align="center">${row.minutes}</td>
<td align="center">${row.goalsConceded}</td>
<td align="center">${row.cleanSheets}</td>
</tr>
`;

        }

        return `
<tr>
<td>${row.season}</td>
<td>${row.club?.shortName ?? "-"}</td>
<td align="center">${row.appearances}</td>
<td align="center">${row.minutes}</td>
<td align="center">${row.goals}</td>
<td align="center">${row.assists}</td>
</tr>
`;

    }).join("");

    return `
<table style="width:100%;font-size:12px;">
<thead>
<tr>
${headers}
</tr>
</thead>
<tbody>
${body}
</tbody>
</table>
`;

}

export default class Tooltip {

    constructor() {

        this.element = document.createElement("div");

        this.element.id = "scoutcard-tooltip";

        Object.assign(this.element.style, {

            position: "fixed",

            top: "20px",

            right: "20px",

            zIndex: 999999,

            width: "620px",

            maxWidth: "90vw",

            background: "#1f2937",

            color: "#fff",

            borderRadius: "8px",

            padding: "12px 14px",

            fontFamily: "Arial, sans-serif",

            fontSize: "13px",

            lineHeight: "1.4",

            boxShadow: "0 8px 24px rgba(0,0,0,.35)",

            display: "none"

        });

        document.body.appendChild(this.element);

    }

    hide() {

        this.element.style.display = "none";

    }

    showLoading(name) {

        this.element.style.display = "block";

        this.element.innerHTML = `
<strong>${name}</strong><br>
Loading...
`;

    }

    showError(message) {

        this.element.style.display = "block";

        this.element.innerHTML = `
<strong>ScoutCard</strong><br>
${message}
`;

    }

    show(player) {

        const sorare = player?.sorare;
        const tm = player?.transfermarkt;

        this.element.style.display = "block";

        this.element.innerHTML = `

<div style="display:flex;gap:18px;">

${tm?.photo ? `
<img
src="${tm.photo}"
style="
width:150px;
height:150px;
object-fit:cover;
border-radius:8px;
">
` : ""}

<div style="flex:1">

<div style="font-size:24px;font-weight:bold;">
${tm?.name ?? "-"}
</div>

<div style="font-size:18px;">
${tm?.marketValue ?? "-"}
</div>

<div style="font-size:16px;">
${tm?.age ?? "-"} anos ·
${tm?.height ?? "-"} ·
${tm?.foot ?? "-"}
</div>

<div style="font-size:16px;">
Contrato:
${tm?.contractUntil ?? "-"}
</div>

</div>

</div>

<hr>

<table style="width:100%">

<tr>

<td><strong>Sorare:</strong></td>
<td>${sorare?.position ?? "-"}</td>

<td><strong>L5:</strong></td>
<td>${sorare?.l5 ?? "-"}</td>

<td><strong>L10:</strong></td>
<td>${sorare?.l10 ?? "-"}</td>

<td><strong>L40:</strong></td>
<td>${sorare?.l40 ?? "-"}</td>

</tr>

<tr>

<td><strong>TM:</strong></td>

<td colspan="7">

${tm?.positions?.map(
p => p.shortName
).join(" • ") ?? "-"}

</td>

</tr>

</table>

<hr>

${renderPerformance(player)}

`;

    }

}