/**
 * ScoutCard
 * Text Selection
 */

import { CONFIG } from "./config.js";
import { looksLikePlayerName } from "./utils/text.js";


export class SelectionManager {


    constructor(

        callback,

        hoverCallback

    ) {


        this.callback = callback;

        this.hoverCallback = hoverCallback;


        this.timer = null;

        this.lastSelection = "";

        this.lastSelectionData = null;


        this.enabled = false;


        this.onMouseUp =

            this.onMouseUp.bind(this);


        this.onMouseOver =

            this.onMouseOver.bind(this);


        this.onScroll =

            this.onScroll.bind(this);


        this.onKeyDown =

            this.onKeyDown.bind(this);


    }



    start() {


        if (this.enabled) {

            return;

        }



        this.enabled = true;



        document.addEventListener(

            "mouseup",

            this.onMouseUp,

            true

        );



        document.addEventListener(

            "mouseover",

            this.onMouseOver,

            true

        );



        document.addEventListener(

            "keydown",

            this.onKeyDown,

            true

        );



        window.addEventListener(

            "scroll",

            this.onScroll,

            true

        );


    }



    stop() {


        if (!this.enabled) {

            return;

        }



        this.enabled = false;



        document.removeEventListener(

            "mouseup",

            this.onMouseUp,

            true

        );



        document.removeEventListener(

            "mouseover",

            this.onMouseOver,

            true

        );



        document.removeEventListener(

            "keydown",

            this.onKeyDown,

            true

        );



        window.removeEventListener(

            "scroll",

            this.onScroll,

            true

        );


    }



    getSelection() {


        const text =

            window

                .getSelection()

                ?.toString()

                ?.replace(/\s+/g, " ")

                ?.trim();



        if (!text) {

            return "";

        }



        if (

            text.length <

            CONFIG.minSelectionLength

        ) {

            return "";

        }



        if (

            text.length >

            CONFIG.maxSelectionLength

        ) {

            return "";

        }



        return text;


    }



    clear() {


        this.lastSelection = "";

        this.lastSelectionData = null;


    }



    onScroll() {


        this.clear();


    }



    onKeyDown(event) {


        if (

            event.key === "Escape"

        ) {

            return;

        }


    }



    onMouseUp(event) {


        clearTimeout(this.timer);



        this.timer =

            setTimeout(() => {



                const text =

                    this.getSelection();



                if (!text) {

                    return;

                }



                if (

                    !looksLikePlayerName(text)

                ) {

                    return;

                }



                if (

                    text === this.lastSelection

                ) {

                    return;

                }



                const data = {


                    text,

                    x:event.clientX,

                    y:event.clientY,

                    target:event.target


                };



                this.lastSelection = text;

                this.lastSelectionData = data;



                this.callback(data);



            },

            CONFIG.selectionDelay

            );


    }



    onMouseOver(event) {


        if (

            !this.lastSelectionData

        ) {

            return;

        }



        if (

            !this.hoverCallback

        ) {

            return;

        }



        const currentSelection =

            window

                .getSelection()

                ?.toString()

                ?.replace(/\s+/g, " ")

                ?.trim();



        if (

            currentSelection !==

            this.lastSelectionData.text

        ) {

            return;

        }



        const target =

            this.lastSelectionData.target;



        if (

            event.target === target

        ) {


            this.hoverCallback(

                this.lastSelectionData

            );


        }


    }


}



export default SelectionManager;