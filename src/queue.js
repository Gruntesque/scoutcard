/**
 * ScoutCard
 * Async request queue
 */

import { CONFIG } from "./config.js";

export class RequestQueue {

    constructor(limit = CONFIG.maxConcurrentRequests) {

        this.limit = limit;

        this.running = 0;

        this.queue = [];

    }

    add(task) {

        return new Promise((resolve, reject) => {

            this.queue.push({

                task,

                resolve,

                reject

            });

            this.next();

        });

    }

    next() {

        if (this.running >= this.limit) {

            return;

        }

        const item = this.queue.shift();

        if (!item) {

            return;

        }

        this.running++;

        Promise.resolve()

            .then(item.task)

            .then(item.resolve)

            .catch(item.reject)

            .finally(() => {

                this.running--;

                this.next();

            });

    }

    clear() {

        this.queue = [];

    }

    get pending() {

        return this.queue.length;

    }

    get active() {

        return this.running;

    }

    get idle() {

        return this.running === 0 &&
               this.queue.length === 0;

    }

}
