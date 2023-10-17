import todayIcon from "./img/icon-today.svg";
import weekIcon from "./img/icon-week.svg";
import importantIcon from "./img/icon-important.svg";
//Need projects to be imported to create the sideELement in case 
let sideELements=[{
    title:"Today",
    imgSrc:todayIcon
},
{
    title:"This Week",
    imgSrc:weekIcon
},
{
    title:"Important",
    imgSrc:importantIcon
}];

let createSideBar=function(){
    let sideBar=document.getElementById("sidebar");
    for(let i=0;i<sideELements.length;i++){
        //creates sb Element div
        let sbElement=document.createElement("div");
        sbElement.className="sb-element";
        //get the icon img
        let icon=document.createElement("img");
        icon.src=sideELements[i].imgSrc;
        let elementText=document.createElement("p");
        elementText.textContent=sideELements[i].title;
        sbElement.appendChild(icon);
        sbElement.appendChild(elementText);
        sideBar.appendChild(sbElement);

    }

}
export default createSideBar;