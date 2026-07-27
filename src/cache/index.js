/**
 * ScoutCard
 * Repository
 */

import memory from "./memory.js";
import { isExpired } from "./ttl.js";

function database() {

    return memory.getDatabase();

}

function getPlayer(id) {

    return database().players[id] ?? null;

}

function ensurePlayer(id) {

    const db = database();

    if (!db.players[id]) {

        db.players[id] = {

            id,

            aliases: [],

            sources: {}

        };

    }

    return db.players[id];

}

function savePlayer(player) {

    database().players[player.id] = player;

    memory.save();

    return player;

}

function getAlias(alias) {

    return database().aliases[alias] ?? null;

}

function saveAlias(alias, id) {

    alias = alias.trim().toLowerCase();

    const db = database();

    db.aliases[alias] = id;

    const player = ensurePlayer(id);

    if (!player.aliases.includes(alias)) {

        player.aliases.push(alias);

    }

    memory.save();

}

function getSource(id, provider, resource) {

    const player = getPlayer(id);

    if (!player) {

        return null;

    }

    return (

        player.sources?.[provider]?.[resource] ??

        null

    );

}

function saveSource(

    id,

    provider,

    resource,

    data

) {

    const player = ensurePlayer(id);

    player.sources ??= {};

    player.sources[provider] ??= {};

    player.sources[provider][resource] = {

        updated: Date.now(),

        data

    };

    memory.save();

    return data;

}

function needsRefresh(

    id,

    provider,

    resource,

    ttl

) {

    const block = getSource(

        id,

        provider,

        resource

    );

    if (!block) {

        return true;

    }

    return isExpired(

        block.updated,

        ttl

    );

}

export {

    getPlayer,

    ensurePlayer,

    savePlayer,

    getAlias,

    saveAlias,

    getSource,

    saveSource,

    needsRefresh

};

export default {

    getPlayer,

    ensurePlayer,

    savePlayer,

    getAlias,

    saveAlias,

    getSource,

    saveSource,

    needsRefresh

};