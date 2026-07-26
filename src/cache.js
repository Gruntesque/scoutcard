/**
 * ScoutCard
 * Cache manager
 */

import { CONFIG } from "./config.js";

export class Cache {

    constructor(ttl = CONFIG.cacheTTL) {

        this.ttl = ttl;
        this.items = new Map();

    }

    get(key) {

        const item = this.items.get(key);

        if (!item) {
            return null;
        }

        if (Date.now() > item.expires) {

            this.items.delete(key);

            return null;

        }

        return item.value;

    }

    set(key, value) {

        this.items.set(key, {

            value,

            expires: Date.now() + this.ttl

        });

        return value;

    }

    has(key) {

        return this.get(key) !== null;

    }

    delete(key) {

        return this.items.delete(key);

    }

    clear() {

        this.items.clear();

    }

    keys() {

        return [...this.items.keys()];

    }

    values() {

        return [...this.items.values()].map(v => v.value);

    }

    entries() {

        return [...this.items.entries()].map(

            ([key, value]) => [

                key,

                value.value

            ]

        );

    }

    cleanup() {

        const now = Date.now();

        for (const [key, value] of this.items) {

            if (value.expires <= now) {

                this.items.delete(key);

            }

        }

    }

}
