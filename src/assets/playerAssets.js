/**
 * ScoutCard
 * Player Assets
 */

import { loadExternalImage } from "../utils/image.js";
import countryToCode from "./flags.js";

const playerPlaceholder=URL.createObjectURL(new Blob([`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><rect width="150" height="150" rx="75" fill="#1B2230"/><circle cx="75" cy="50" r="22" fill="#5F6B7C"/><path d="M40 130C42 104 56 88 75 88C94 88 108 104 110 130" fill="#5F6B7C"/></svg>`],{type:"image/svg+xml"}));

export async function preparePlayerAssets(player){
const tm=player?.transfermarkt;
if(!tm)return player;

let photo=tm.photo||"";
let isPlaceholder=false;

if(photo){
const blobPhoto=await loadExternalImage(photo);
if(blobPhoto){
photo=blobPhoto;
}else{
photo=playerPlaceholder;
isPlaceholder=true;
}
}else{
photo=playerPlaceholder;
isPlaceholder=true;
}

let flag="";

if(tm.nationalityName){
const code=countryToCode(tm.nationalityName);
if(code){
flag=`https://flagcdn.com/20x15/${code}.png`;
}
}

return{
...player,
transfermarkt:{
...tm,
photo,
flag,
isPlaceholder
}
};
}

export default preparePlayerAssets;