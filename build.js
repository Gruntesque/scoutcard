import fs from "node:fs";
import path from "node:path";

const HEADER = `// ==UserScript==
// @name         ScoutCard
// @namespace    https://github.com/Gruntesque/scoutcard
// @version      0.1.0
// @description  Universal football player popup
// @author       Gruntesque
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

`;

const ORDER = [

    "src/config.js",

    "src/cache.js",

    "src/queue.js",

    "src/utils/text.js",

    "src/utils/dom.js",

    "src/providers/sorare.js",

    "src/providers/index.js",

    "src/tooltip.js",

    "src/selection.js",

    "src/app.js"

];

function stripImports(code) {

    return code

        .replace(/^import .*$/gm, "")

        .replace(/^export default .*$/gm, "")

        .replace(/^export /gm, "");

}

let output = HEADER;

output += "\n(() => {\n\n";

for (const file of ORDER) {

    console.log("Building:", file);

    const code = fs.readFileSync(

        path.resolve(file),

        "utf8"

    );

    output +=

`\n/* ======================================================

${file}

====================================================== */

`;

    output += stripImports(code);

    output += "\n";

}

output += `

const scoutcard = new ScoutCard();

scoutcard.start();

`;

output += "\n})();\n";

fs.mkdirSync(

    "dist",

    {

        recursive: true

    }

);

fs.writeFileSync(

    "dist/scoutcard.user.js",

    output,

    "utf8"

);

console.log("");

console.log("✔ Build complete.");

console.log("dist/scoutcard.user.js");
