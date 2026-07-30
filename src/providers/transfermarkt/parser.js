/**
 * ScoutCard
 * Transfermarkt Parser
 */

import parseProfile from "./profile.js";
import parseMarketValue from "./marketValue.js";

function parseRibbon(doc) {

    const ribbon =

        doc.querySelector(

            ".data-header__box--small"

        );

    if (!ribbon) {

        return {

            ribbon: null,

            ribbonType: null,

            loan: false

        };

    }

    const text =
        ribbon.textContent
            .replace(/\s+/g, " ")
            .trim();

    const ribbonType =
        text
            .toUpperCase()
            .replace(/\s+/g, "_");

    return {

        ribbon: text || null,

        ribbonType,

        loan: ribbonType === "LOAN"

    };

}

function parseInjury(doc) {

    const box =
        doc.querySelector(
            ".verletzungsbox .text"
        );

    if (!box) {

        return {

            injury: null,

            expectedReturn: null

        };

    }

    const injuryNode =

        [...box.childNodes]

            .find(node =>

                node.nodeType === Node.TEXT_NODE &&
                node.textContent.trim()

            );

    const injury =

        injuryNode
            ?.textContent
            ?.trim() || null;

    const expectedReturn =

        box.querySelector(

            ".rueckkehr"

        )

            ?.textContent

            ?.trim() || null;

    return {

        injury,

        expectedReturn

    };

}

export function parseTransfermarkt(html) {

    const doc = new DOMParser().parseFromString(
        html,
        "text/html"
    );

    const profile =
        parseProfile(doc);

    const market =
        parseMarketValue(doc);

    const ribbon =
        parseRibbon(doc);

    const injury =
        parseInjury(doc);

    return {

        id: null,

        url: null,

        age: profile.age,

        height: profile.height,

        foot: profile.foot,

        position: profile.position,

        citizenship: profile.citizenship,

        contractExpires: profile.contractExpires,

        marketValue: market.value,

        marketValueUpdated: market.lastUpdate,

        ribbon: ribbon.ribbon,

        ribbonType: ribbon.ribbonType,

        loan: ribbon.loan,

        injury: injury.injury,

        expectedReturn: injury.expectedReturn

    };

}

export default parseTransfermarkt;