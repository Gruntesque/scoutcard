/**
 * ScoutCard
 * Player Selector
 * Based on SQS behavior
 */


function injectCSS() {


    if (

        document.getElementById(

            "scoutcard-selector-style"

        )

    ) {

        return;

    }



    const style =

        document.createElement("style");



    style.id =

        "scoutcard-selector-style";



    style.textContent = `


#scoutcard-selector-bg {

position:fixed;

inset:0;

background:rgba(0,0,0,.55);

display:flex;

align-items:center;

justify-content:center;

z-index:999999;

}



#scoutcard-selector {

width:380px;

max-width:90vw;

max-height:80vh;

background:#191b20;

color:white;

border-radius:16px;

overflow:hidden;

box-shadow:0 15px 50px rgba(0,0,0,.6);

font-family:Roboto,Arial,sans-serif;

}



#scoutcard-selector-title {

padding:14px 20px;

font-size:17px;

font-weight:700;

border-bottom:1px solid rgba(255,255,255,.12);

}



#scoutcard-selector-list {

overflow-y:auto;

max-height:65vh;

}



.scoutcard-selector-row {

display:flex;

align-items:center;

gap:12px;

padding:8px 18px;

cursor:pointer;

}



.scoutcard-selector-row:hover {

background:rgba(255,255,255,.08);

}



.scoutcard-selector-photo {

width:38px;

height:38px;

border-radius:50%;

object-fit:cover;

flex-shrink:0;

}



.scoutcard-selector-name {

font-size:14px;

font-weight:700;

line-height:1.2;

}



.scoutcard-selector-info {

font-size:12px;

color:#b8bcc5;

margin-top:3px;

}



.scoutcard-selector-footer {

padding:10px;

text-align:center;

font-size:11px;

color:#9297a0;

border-top:1px solid rgba(255,255,255,.12);

}



`;



    document.head.appendChild(style);

}



function closeSelector() {


    document

        .getElementById(

            "scoutcard-selector-bg"

        )

        ?.remove();

}



function createRow(player, callback) {


    const row =

        document.createElement("div");



    row.className =

        "scoutcard-selector-row";



    const img =

        document.createElement("img");



    img.className =

        "scoutcard-selector-photo";



    img.src =

        player.photo || "";



    img.onerror = () => {

        img.style.display = "none";

    };



    const text =

        document.createElement("div");



    const name =

        document.createElement("div");



    name.className =

        "scoutcard-selector-name";



    name.textContent =

        [

            player.flag,

            player.name

        ]

        .filter(Boolean)

        .join(" ");




    const info =

        document.createElement("div");



    info.className =

        "scoutcard-selector-info";



    info.textContent =

        [

            player.age

                ? `${player.age} anos`

                : "",

            player.position,

            player.club

        ]

        .filter(Boolean)

        .join(" • ");




    text.appendChild(name);

    text.appendChild(info);



    row.appendChild(img);

    row.appendChild(text);



    row.onclick = () => {


        closeSelector();


        callback(player);


    };



    return row;

}



export function showPlayerSelector(

    players,

    callback

) {


    injectCSS();

    closeSelector();



    const background =

        document.createElement("div");



    background.id =

        "scoutcard-selector-bg";



    const modal =

        document.createElement("div");



    modal.id =

        "scoutcard-selector";



    const title =

        document.createElement("div");



    title.id =

        "scoutcard-selector-title";



    title.textContent =

        "Escolha um jogador";



    const list =

        document.createElement("div");



    list.id =

        "scoutcard-selector-list";



    players.forEach(player => {


        list.appendChild(

            createRow(

                player,

                callback

            )

        );


    });



    const footer =

        document.createElement("div");



    footer.className =

        "scoutcard-selector-footer";



    footer.textContent =

        "Clique em um jogador • ESC ou clique fora para cancelar";



    modal.appendChild(title);

    modal.appendChild(list);

    modal.appendChild(footer);



    background.appendChild(modal);



    background.onclick = event => {


        if (

            event.target === background

        ) {

            closeSelector();

        }

    };



    const onEscape = event => {


        if (

            event.key === "Escape"

        ) {


            closeSelector();


            document.removeEventListener(

                "keydown",

                onEscape

            );


        }


    };



    document.addEventListener(

        "keydown",

        onEscape

    );



    document.body.appendChild(

        background

    );

}



export default showPlayerSelector;