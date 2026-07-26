/**
 * ScoutCard
 * Transfermarkt Market Value Parser
 */

export function parseMarketValue(html) {

    const doc = new DOMParser().parseFromString(
        html,
        "text/html"
    );

    const result = {

        value: null,

        lastUpdate: null

    };

    const valueNode = doc.querySelector(
        ".data-header__market-value-wrapper"
    );

    if (valueNode) {

        const text = valueNode.textContent
            .replace(/\s+/g, " ")
            .trim();

        const match = text.match(/(€[^ ]+)/);

        if (match) {

            result.value = match[1];

        }

        const update = text.match(/Last update:\s*(.+)$/i);

        if (update) {

            result.lastUpdate = update[1].trim();

        }

    }

    return result;

}

export default parseMarketValue;