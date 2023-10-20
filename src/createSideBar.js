import todayIcon from "./img/icon-today.svg";
import weekIcon from "./img/icon-week.svg";
import importantIcon from "./img/icon-important.svg";
import homeIcon from "./img/home-icon.svg";
//Need projects to be imported to create the sideELement project in case 
let sideELements=[{
    title:"Home",
    imgSrc:homeIcon
},{
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
    let summary=document.createElement("h2");
    summary.textContent="Summary";
    summary.id="summary";
    sideBar.appendChild(summary);
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
    let createBtn=document.createElement("button");
    createBtn.id="create-todo";
    sideBar.appendChild(createBtn);


}
export default createSideBar;