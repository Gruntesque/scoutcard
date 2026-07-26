/**
 * ScoutCard
 * Entry point
 */

import { APP } from "./config.js";
import ScoutCard from "./app.js";

const scoutcard = new ScoutCard();

// Disponibiliza para debug no console do navegador
window.ScoutCard = scoutcard;

// Informações de inicialização
console.group(
    `%c${APP.NAME}`,
    "color:#38bdf8;font-weight:bold;"
);

console.log("Version:", APP.VERSION);
console.log("Initialized");

console.groupEnd();

// Inicia o ScoutCard
scoutcard.start();