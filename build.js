import { build } from "esbuild";
import fs from "node:fs";

const banner = `// ==UserScript==
// @name         ScoutCard
// @namespace    https://github.com/Gruntesque/scoutcard
// @version      0.1.0
// @description  Universal football player popup
// @author       Gruntesque
// @match        *://*/*

// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle

// @connect      tmapi.transfermarkt.technology
// @connect      www.transfermarkt.com
// @connect      transfermarkt.com
// @connect      7z0z8pasdy-dsn.algolia.net

// @run-at       document-end
// ==/UserScript==

`;

await build({

    entryPoints: [

        "src/main.js"

    ],

    bundle: true,

    format: "iife",

    outfile: "dist/scoutcard.user.js",

    banner: {

        js: banner

    },

    target: "es2022",

    minify: false

});

const file = fs.readFileSync(

    "dist/scoutcard.user.js",

    "utf8"

);

fs.writeFileSync(

    "dist/scoutcard.user.js",

    file,

    "utf8"

);

console.log("");

console.log("✔ ScoutCard built successfully.");