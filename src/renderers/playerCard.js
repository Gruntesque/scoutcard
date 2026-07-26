/**
 * ScoutCard
 * Player Card Renderer
 */

export function renderPlayerCard(player) {

    const flag = player.nationality
        ? `https://flagcdn.com/24x18/${player.nationality.toLowerCase()}.png`
        : "";

    return `

<div class="sc-player-card">

    <img
        class="sc-player-avatar"
        src="${player.avatar || ""}"
        alt="${player.name}"
        loading="lazy"
    >

    <div class="sc-player-info">

        <div class="sc-player-header">

            <div class="sc-player-name">

                ${player.name}

            </div>

            ${
                flag
                    ? `<img class="sc-player-flag" src="${flag}" alt="">`
                    : ""
            }

        </div>

        <div class="sc-player-club">

            ${player.club || "-"}

        </div>

        <div class="sc-player-meta">

            <div class="sc-player-position">

                ${player.position || "-"}

            </div>

            <div class="sc-player-separator">

                •

            </div>

            <div class="sc-player-l10">

                L10 ${player.l10 ?? "-"}

            </div>

        </div>

    </div>

</div>

`;

}

export default renderPlayerCard;