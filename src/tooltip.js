/**
 * ScoutCard
 * Tooltip
 */

import { CONFIG } from "./config.js";
import { injectStyle } from "./utils/dom.js";

const STYLE_ID = "scoutcard-tooltip-style";

const CSS = `

.scoutcard-tooltip{

    position:fixed;

    z-index:2147483647;

    min-width:280px;

    max-width:420px;

    background:#18191d;

    color:#fff;

    border:1px solid #2e3138;

    border-radius:12px;

    box-shadow:0 12px 40px rgba(0,0,0,.45);

    font-family:system-ui,sans-serif;

    font-size:13px;

    opacity:0;

    pointer-events:none;

    transition:opacity .12s ease;

}

.scoutcard-tooltip.visible{

    opacity:1;

}

.scoutcard-tooltip-content{

    padding:14px;

}

`;

export class Tooltip {

    constructor() {

        injectStyle(

            STYLE_ID,

            CSS

        );

        this.element =
            document.createElement("div");

        this.element.className =
            "scoutcard-tooltip";

        this.content =
            document.createElement("div");

        this.content.className =
            "scoutcard-tooltip-content";

        this.element.appendChild(

            this.content

        );

        document.body.appendChild(

            this.element

        );

    }

    setHTML(html){

        this.content.innerHTML = html;

    }

    show(x,y){

        this.move(x,y);

        this.element.classList.add(

            "visible"

        );

    }

    hide(){

        this.element.classList.remove(

            "visible"

        );

    }

    move(x,y){

        this.element.style.left =

            (x + CONFIG.popupOffsetX) + "px";

        this.element.style.top =

            (y + CONFIG.popupOffsetY) + "px";

    }

    destroy(){

        this.element.remove();

    }

}

export default Tooltip;
