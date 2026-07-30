import bootIcon from "../assets/boot.js";

export function formatFoot(foot) {
    if (!foot) return "-";

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

export function formatMarketValue(value) {
    if (!value) return "-";

    return value
        .replace(",", ".")
        .replace(/m$/, "M");
}

export function isCaptain(player) {
    const tm = player?.transfermarkt;

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

export function captainIcon(player) {
    if (!isCaptain(player))
        return "";

    return `
<img
class="scoutcard-captain"
src="https://tmsi.akamaized.net/icons/captain_1_minified.png"
title="Captain"
>
`;
}

export function nationalityFlag(tm) {
    if (!tm?.flag)
        return "";

    return `
<img
class="scoutcard-flag"
src="${tm.flag}"
title="${tm.nationalityName || ""}"
>
`;
}

export function nationalities(tm) {
    return nationalityFlag(tm);
}

export function currentClub(tm) {
    return (
        tm.currentClub?.shortName ||
        tm.currentClub?.name ||
        "-"
    );
}

export function positions(tm) {
    return (tm.positions || [])
        .map(position => position.shortName)
        .filter(Boolean)
        .join(" • ");
}

export function sorareSearchLink(name) {
    if (!name)
        return "";

    return (
        "https://sorare.com/legal-notice#search=" +
        encodeURIComponent(name)
    );
}

export function playerDetails(tm) {
    return `
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
`;
}

export function marketBlock(tm) {
    return `
<div class="scoutcard-market">

${formatMarketValue(tm.marketValue)}

•

Contract:

${tm.contractUntil || "-"}

</div>
`;
}