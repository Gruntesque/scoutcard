/**
 * ScoutCard
 * Memory Cache
 */

import {

    loadDatabase,

    saveDatabase

} from "./storage.js";

function createDatabase() {

    return {

        version: 1,

        players: {},

        clubs: {},

        aliases: {},

        stats: {

            searches: 0,

            cacheHits: 0,

            created: Date.now(),

            lastCleanup: null

        }

    };

}

let database = loadDatabase();

if (!database) {

    database = createDatabase();

}

database.version ??= 1;

database.players ??= {};

database.clubs ??= {};

database.aliases ??= {};

database.stats ??= {

    searches: 0,

    cacheHits: 0,

    created: Date.now(),

    lastCleanup: null

};

export function getDatabase() {

    return database;

}

export function save() {

    saveDatabase(database);

}

export function reset() {

    database = createDatabase();

    save();

}

export default {

    getDatabase,

    save,

    reset

};