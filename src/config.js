/**
 * ScoutCard
 * Global configuration
 */

export const APP = {
    NAME: "ScoutCard",
    VERSION: "0.1.0"
};

export const CONFIG = {

    debug: false,

    selectionDelay: 150,

    cacheTTL: 60 * 60 * 1000,

    maxConcurrentRequests: 4,

    popupOffsetX: 18,

    popupOffsetY: 18,

    maxSelectionLength: 60,

    minSelectionLength: 3

};

export const SOURCES = {

    sorare: true,

    transfermarkt: true,

    analyst: false

};

export const API = {

    sorare: {

        search:
            "https://7z0z8pasdy-dsn.algolia.net/1/indexes/*/queries?x-algolia-application-id=7Z0Z8PASDY&x-algolia-api-key=30fdac6793afa5b820c36e7202e4b872"

    }

};
