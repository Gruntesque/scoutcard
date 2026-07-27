/**
 * ScoutCard
 * Persistent Storage
 */

const KEY = "scoutcard:database";


const DEFAULT_DATABASE = {

    version: 1,

    players: {},

    aliases: {}

};


export function loadDatabase() {

    const database = GM_getValue(

        KEY,

        null

    );


    if (!database) {

        return structuredClone(

            DEFAULT_DATABASE

        );

    }


    return database;

}


export function saveDatabase(database) {

    GM_setValue(

        KEY,

        database

    );

}


export function clearDatabase() {

    GM_deleteValue(KEY);

}


export function resetDatabase() {

    GM_setValue(

        KEY,

        structuredClone(

            DEFAULT_DATABASE

        )

    );

}


export default {

    loadDatabase,

    saveDatabase,

    clearDatabase,

    resetDatabase

};