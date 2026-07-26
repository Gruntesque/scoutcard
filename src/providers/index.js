/**
 * ScoutCard
 * Provider Manager
 */

import Sorare from "./sorare.js";

const providers = [

    Sorare

];

export function register(provider) {

    providers.push(provider);

}

export function getProviders() {

    return [...providers];

}

export async function searchPlayer(name) {

    const results = [];

    for (const provider of providers) {

        try {

            const players =
                await provider.search(name);

            if (players?.length) {

                results.push(

                    ...players

                );

            }

        }

        catch (error) {

            console.error(

                `[ScoutCard] ${provider.name}`,

                error

            );

        }

    }

    return results;

}

export default {

    register,

    getProviders,

    searchPlayer

};
