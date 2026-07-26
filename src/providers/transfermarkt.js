/**
 * ScoutCard
 * Transfermarkt provider
 */

const BASE = "https://www.transfermarkt.com";

export async function searchTransfermarkt(name) {

    return {

        found: false,

        profileUrl: "",

        player: null

    };

}

const Transfermarkt = {

    name: "Transfermarkt",

    search: searchTransfermarkt

};

export default Transfermarkt;