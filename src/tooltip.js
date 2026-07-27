/**
 * ScoutCard
 * Tooltip
 */

import renderPlayerCard from "./renderers/playerCard.js";


export default class Tooltip {


    constructor() {


        this.element =
            document.createElement("div");


        this.element.id =
            "scoutcard-tooltip";


        Object.assign(

            this.element.style,

            {

                position: "fixed",

                zIndex: "999999",

                width: "620px",

                maxWidth: "90vw",

                background:
                    "rgba(25,30,40,0.88)",

                backdropFilter:
                    "blur(8px)",

                color: "#ffffff",

                borderRadius:
                    "12px",

                padding:
                    "12px 14px",

                fontFamily:
                    "Roboto, Arial, sans-serif",

                fontSize:
                    "13px",

                boxShadow:
                    "0 10px 30px rgba(0,0,0,.45)",

                display:
                    "none",

                overflow:
                    "hidden"

            }

        );


        this.visible = false;


        this.injectFont();

        this.injectStyle();


        document.body.appendChild(

            this.element

        );


        this.bindEvents();

    }



    injectFont() {


        if (

            document.getElementById(

                "scoutcard-roboto"

            )

        ) {

            return;

        }


        const font =
            document.createElement("link");


        font.id =
            "scoutcard-roboto";


        font.rel =
            "stylesheet";


        font.href =

            "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";


        document.head.appendChild(font);

    }



    injectStyle() {


        if (

            document.getElementById(

                "scoutcard-reset"

            )

        ) {

            return;

        }



        const style =
            document.createElement("style");



        style.id =
            "scoutcard-reset";



        style.textContent = `


#scoutcard-tooltip,
#scoutcard-tooltip * {

    box-sizing: border-box;

    font-family:
        "Roboto",
        Arial,
        sans-serif !important;

}



#scoutcard-tooltip {

    color:#ffffff;

}



#scoutcard-tooltip table,
#scoutcard-tooltip thead,
#scoutcard-tooltip tbody,
#scoutcard-tooltip tr,
#scoutcard-tooltip th,
#scoutcard-tooltip td {

    background:
        transparent !important;

    color:
        #ffffff !important;

    border:
        0 !important;

}



#scoutcard-tooltip table {

    width:
        100%;

    border-collapse:
        collapse;

    border-spacing:
        0;

}



#scoutcard-tooltip th,
#scoutcard-tooltip td {

    padding:
        6px 8px;

    line-height:
        1.2;

    vertical-align:
        middle;

}



#scoutcard-tooltip tbody tr:hover,
#scoutcard-tooltip td:hover {

    background:
        transparent !important;

}



#scoutcard-tooltip hr {

    margin:
        12px 0;

    border:
        0;

    border-top:
        1px solid rgba(255,255,255,.25);

}



`;



        document.head.appendChild(style);

    }



    bindEvents() {


        document.addEventListener(

            "mousedown",

            event => {


                if (!this.visible) {

                    return;

                }


                if (

                    !this.element.contains(

                        event.target

                    )

                ) {

                    this.hide();

                }


            }

        );



        document.addEventListener(

            "keydown",

            event => {


                if (

                    event.key === "Escape"

                ) {

                    this.hide();

                }


            }

        );


    }



    position(x, y) {


        const gap = 16;


        const rect =
            this.element.getBoundingClientRect();


        let left =
            x + gap;


        let top =
            y + gap;



        if (

            left + rect.width >

            window.innerWidth

        ) {

            left =
                x - rect.width - gap;

        }



        if (

            top + rect.height >

            window.innerHeight

        ) {

            top =
                y - rect.height - gap;

        }



        this.element.style.left =

            `${Math.max(left, 10)}px`;



        this.element.style.top =

            `${Math.max(top, 10)}px`;

    }



    show(player, x, y) {


        this.element.innerHTML =

            renderPlayerCard(player);



        this.element.style.display =

            "block";



        this.visible = true;



        requestAnimationFrame(() => {


            this.position(

                x,

                y

            );


        });


    }



    showLoading(name) {


        this.element.innerHTML = `

<div>

Loading ${name}...

</div>

`;



        this.element.style.display =

            "block";



        this.visible = true;


    }



    showError(message) {


        this.element.innerHTML = `

<div>

Error: ${message}

</div>

`;



        this.element.style.display =

            "block";



        this.visible = true;


    }



    hide() {


        this.element.style.display =

            "none";



        this.visible = false;


    }


}