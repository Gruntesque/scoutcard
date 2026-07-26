// ==UserScript==
// @name         ScoutCard
// @namespace    https://github.com/
// @version      0.1.0
// @description  Base framework for ScoutCard
// @author       ChatGPT
// @match        *://*/*
// @run-at       document-idle
// @grant        GM_addStyle
// ==/UserScript==

(() => {
    'use strict';

    const VERSION = '0.1.0';

    const CONFIG = {
        debug: false,
        hoverDelay: 250,
        cacheTTL: 60 * 60 * 1000,
        maxConcurrentRequests: 4
    };

    const SELECTORS = {
        playerLinks: [
            'a',
            '[data-player]',
            '[data-player-name]'
        ]
    };

    const State = {
        initialized: false,
        hoveredElement: null,
        hoveredPlayer: null,
        activeCard: null,
        hoverTimer: null,
        requestQueue: [],
        runningRequests: 0,
        cache: new Map()
    };

    function log(...args) {
        if (CONFIG.debug) {
            console.log('[ScoutCard]', ...args);
        }
    }

    function createElement(tag, props = {}, children = []) {
        const el = document.createElement(tag);

        for (const [key, value] of Object.entries(props)) {
            if (key === 'class') {
                el.className = value;
            } else if (key === 'style') {
                Object.assign(el.style, value);
            } else if (key.startsWith('on') && typeof value === 'function') {
                el.addEventListener(key.slice(2), value);
            } else {
                el[key] = value;
            }
        }

        for (const child of children) {
            if (child instanceof Node) {
                el.appendChild(child);
            } else if (child != null) {
                el.appendChild(document.createTextNode(String(child)));
            }
        }

        return el;
    }

    class Cache {
        static get(key) {
            const entry = State.cache.get(key);

            if (!entry) {
                return null;
            }

            if (Date.now() > entry.expires) {
                State.cache.delete(key);
                return null;
            }

            return entry.value;
        }

        static set(key, value) {
            State.cache.set(key, {
                value,
                expires: Date.now() + CONFIG.cacheTTL
            });
        }

        static clear() {
            State.cache.clear();
        }
    }

    class RequestQueue {
        static enqueue(task) {
            return new Promise((resolve, reject) => {
                State.requestQueue.push({
                    task,
                    resolve,
                    reject
                });

                this.next();
            });
        }

        static next() {
            if (State.runningRequests >= CONFIG.maxConcurrentRequests) {
                return;
            }

            const item = State.requestQueue.shift();

            if (!item) {
                return;
            }

            State.runningRequests++;

            Promise.resolve()
                .then(item.task)
                .then(item.resolve)
                .catch(item.reject)
                .finally(() => {
                    State.runningRequests--;
                    this.next();
                });
        }
    }

    class Tooltip {
        constructor() {
            this.element = createElement('div', {
                class: 'scoutcard-tooltip'
            });

            document.body.appendChild(this.element);
        }

        show(x, y, html) {
            this.element.innerHTML = html;
            this.element.style.left = `${x}px`;
            this.element.style.top = `${y}px`;
            this.element.classList.add('visible');
        }

        move(x, y) {
            this.element.style.left = `${x}px`;
            this.element.style.top = `${y}px`;
        }

        hide() {
            this.element.classList.remove('visible');
        }
    }

    const tooltip = new Tooltip();

    function normalizeName(name) {
        return name
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
    }

    function extractPlayerName(element) {
        if (!element) {
            return null;
        }

        return (
            element.dataset.playerName ||
            element.dataset.player ||
            element.getAttribute('aria-label') ||
            element.textContent
        )?.trim();
    }

    function isCandidate(element) {
        if (!(element instanceof HTMLElement)) {
            return false;
        }

        const text = extractPlayerName(element);

        if (!text) {
            return false;
        }

        return text.length >= 3;
    }

    async function fetchPlayerData(name) {
        const key = normalizeName(name);

        const cached = Cache.get(key);

        if (cached) {
            return cached;
        }

        const result = await RequestQueue.enqueue(async () => {
            return {
                name,
                status: 'pending',
                source: null,
                updatedAt: Date.now()
            };
        });

        Cache.set(key, result);

        return result;
    }

    function buildCard(data) {
        return `
            <div class="scoutcard-header">
                <div class="scoutcard-name">${data.name}</div>
                <div class="scoutcard-status">${data.status}</div>
            </div>
            <div class="scoutcard-body">
                Loading...
            </div>
        `;
    }

    async function handleHover(event) {
        const target = event.target.closest('a,[data-player],[data-player-name]');

        if (!isCandidate(target)) {
            return;
        }

        const name = extractPlayerName(target);

        if (!name) {
            return;
        }

        State.hoveredElement = target;
        State.hoveredPlayer = name;

        clearTimeout(State.hoverTimer);

        State.hoverTimer = setTimeout(async () => {
            const data = await fetchPlayerData(name);

            tooltip.show(
                event.pageX + 16,
                event.pageY + 16,
                buildCard(data)
            );
        }, CONFIG.hoverDelay);
    }

    function handleMove(event) {
        tooltip.move(
            event.pageX + 16,
            event.pageY + 16
        );
    }

    function handleLeave() {
        clearTimeout(State.hoverTimer);
        tooltip.hide();
    }

    function installEvents() {
        document.addEventListener('mouseover', handleHover, true);
        document.addEventListener('mousemove', handleMove, true);
        document.addEventListener('mouseout', handleLeave, true);
    }

    function installStyles() {
        GM_addStyle(`
            .scoutcard-tooltip{
                position:absolute;
                z-index:2147483647;
                min-width:280px;
                max-width:420px;
                background:#111;
                color:#fff;
                border-radius:8px;
                padding:12px;
                box-shadow:0 8px 30px rgba(0,0,0,.35);
                opacity:0;
                pointer-events:none;
                transition:opacity .15s ease;
                font:13px/1.4 system-ui,sans-serif;
            }

            .scoutcard-tooltip.visible{
                opacity:1;
            }

            .scoutcard-header{
                display:flex;
                justify-content:space-between;
                gap:12px;
                margin-bottom:8px;
                font-weight:600;
            }

            .scoutcard-body{
                opacity:.8;
            }
        `);
    }

    function init() {
        if (State.initialized) {
            return;
        }

        State.initialized = true;

        installStyles();
        installEvents();

        log(`ScoutCard ${VERSION} initialized`);
    }

    init();

})();
