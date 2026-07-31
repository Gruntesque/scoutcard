/**
 * ScoutCard
 * Player Header Photo Renderer
 */

export default function playerHeaderPhoto(tm) {

    const photo = tm.photo || "";
    const backgrounds = new Set([
        "transparent",
        "white",
        "solid",
        "field"
    ]);
    const background = backgrounds.has(tm.photoBackground)
        ? tm.photoBackground
        : "unknown";
    const backgroundColor = /^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/.test(
        tm.photoBackgroundColor || ""
    )
        ? tm.photoBackgroundColor
        : "";

    return `

<div class="scoutcard-photo">

<div class="scoutcard-photo-glow" aria-hidden="true"></div>

<div class="scoutcard-photo-frame${backgroundColor ? " scoutcard-photo-frame-colored" : ""}"${backgroundColor ? ` style="--scoutcard-photo-background:${backgroundColor}"` : ""}>

<img
class="scoutcard-photo-portrait scoutcard-photo-background-${background}${tm.isPlaceholder ? " scoutcard-placeholder" : ""}"
src="${photo}"
alt="${tm.name || ""}"
>

</div>

<div class="scoutcard-photo-ring" aria-hidden="true"></div>

</div>

`;

}
