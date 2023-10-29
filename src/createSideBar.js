import todayIcon from "./img/icon-today.svg";
import weekIcon from "./img/icon-week.svg";
import importantIcon from "./img/icon-important.svg";
import homeIcon from "./img/home-icon.svg";
import { storageManager } from "./localStorage";
import deleteIcon from "./img/delete-icon.svg";
import editIcon from "./img/edit-icon.svg";
//creates an array of objects which are going to be desplayed on the sidebar
let sideELements = [{
    title: "Home",
    imgSrc: homeIcon
}, {
    title: "Today",
    imgSrc: todayIcon
},
{
    title: "This Week",
    imgSrc: weekIcon
},
{
    title: "Important",
    imgSrc: importantIcon
}];

let createSideBar = (function () {
    let sideBar = document.getElementById("sidebar");    
    let showSummary = function () {        
        let summaryDiv = document.createElement("div");
        summaryDiv.id = "summary-div";
        let summaryHeader = document.createElement("h2");
        summaryHeader.textContent = "Summary";
        summaryHeader.className = "sb-header";
        summaryDiv.appendChild(summaryHeader);
        for (let i = 0; i < sideELements.length; i++) {
            let sbElement = document.createElement("div");
            sbElement.className = "sb-element";
            sbElement.id = sideELements[i].title.toLowerCase() + "-btn";
            let icon = document.createElement("img");
            icon.src = sideELements[i].imgSrc;
            let elementText = document.createElement("p");
            elementText.textContent = sideELements[i].title;
            sbElement.appendChild(icon);
            sbElement.appendChild(elementText);
            summaryDiv.appendChild(sbElement);
            sideBar.appendChild(summaryDiv);
        }
    }
    //functions the create and show the projects on the sidebar(not the default one)
    let showProjects = function () {
            let projects = storageManager.downloadProjects();
            if (projects.length > 1) {
                let projectsDiv = document.createElement("div");
                projectsDiv.id = "projects-div";
                let projectsHeader = document.createElement("h2");
                projectsHeader.textContent = "Projects";
                projectsHeader.className = "sb-header";
                projectsDiv.appendChild(projectsHeader);
                for (let i = 1; i < projects.length; i++) {
                    let sbElement = document.createElement("div");
                    sbElement.className = "sb-element";
                    sbElement.classList.add("sb-project-element");
                    sbElement.id = projects[i].projectName.toLowerCase() + "-sb";
                    sbElement.setAttribute("data-projects-sb", i);
                    sbElement.textContent = projects[i].projectName;
                    let modifyBtns=document.createElement("div");
                    modifyBtns.className="modify-btns";
                    let deleteBtn=document.createElement("img");
                    deleteBtn.className="delete-btn";
                    deleteBtn.src=deleteIcon;
                    let editBtn=document.createElement("img");
                    editBtn.className="edit-btn";
                    editBtn.src=editIcon;
                    modifyBtns.appendChild(deleteBtn);
                    modifyBtns.appendChild(editBtn);
                    sbElement.appendChild(modifyBtns)
                    projectsDiv.appendChild(sbElement);
                    sideBar.appendChild(projectsDiv)
                }
            }
    }
    //button to add a new project or a new task
    let showCreateBtn=function(){
        let createBtn = document.createElement("button");
        createBtn.id = "create-todo";
        sideBar.appendChild(createBtn);
    }
    return{
        showSummary,
        showProjects,
        showCreateBtn
    }
    }
)();




    



export {createSideBar};