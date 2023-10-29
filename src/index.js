import "./style.css";
import { createSideBar } from "./createSideBar";
import {taskManager,projectManager} from "./App";
import {displayController} from "./UI";
import { format,parse} from "date-fns";

let content=document.getElementById("content");
let sideBar=document.getElementById("sidebar")

//function that manage the process of the creating a task
let addTask=function(){
    //show the form
    taskManager.createTaskForm();
    let createTaskBtn=document.getElementById("create-task-btn");
    let taskForm=document.getElementById("task-form");
    //check if the form is been compiled correctly
    createTaskBtn.addEventListener("click",function(event){
        if(!taskForm.checkValidity()){
            alert("All informations requested are needed");
            //make sure the due date is not in the past
        }else if(parse(format(new Date(document.getElementById("task-date").value),'dd/MM/yyyy'),'dd/MM/yyyy', new Date())< parse(format(new Date(),'dd/MM/yyyy'),'dd/MM/yyyy',new Date())){
            alert("Your task can't have a date in the past");
            event.preventDefault();
        }else{
            taskManager.createTask(); 
        } 
        
    });  
}
//function that manage the process of the creating a project
let addProject=function(){
    projectManager.createProjectForm();
    let createProjectBtn=document.getElementById("create-project-btn");
    let projectForm=document.getElementById("project-form");
    createProjectBtn.addEventListener("click",function(event){
        let formattedFormDate=format(new Date(document.getElementById("project-date").value),'dd/MM/yyyy');
        let formattedTodayDate=format(new Date(),'dd/MM/yyyy');
        if(parse(formattedFormDate,'dd/MM/yyyy', new Date())< parse(formattedTodayDate,'dd/MM/yyyy',new Date())){
            alert("Your project date can't have a date in the past");
            event.preventDefault();
        }else if(projectForm.checkValidity()){
            projectManager.createProject(); 
        }else{
            alert("All informations requested are needed");
        }
    })
}

//initialize page
createSideBar.showSummary();
createSideBar.showProjects();
createSideBar.showCreateBtn();
displayController.homeTasks();
//event listener to the button that allows us to create a task or a project
let createTodo=document.getElementById("create-todo");
createTodo.addEventListener("click",function(){
    content.innerHTML="";
    let newTaskBtn=document.createElement("button");
    newTaskBtn.id="new-task-btn";
    newTaskBtn.textContent="New Task";
    content.appendChild(newTaskBtn);
    let newProjectBtn=document.createElement("button");
    newProjectBtn.id="new-project-btn";
    newProjectBtn.textContent="New Project";
    content.appendChild(newProjectBtn);
    newTaskBtn.addEventListener("click",addTask);
    newProjectBtn.addEventListener("click",addProject)

});
//event on the home sidebar element
let homeBtn=document.getElementById("home-btn");
homeBtn.addEventListener("click",function(){
    displayController.homeTasks();  
});
//event on the Today sidebar element
let todayBtn=document.getElementById("today-btn");
todayBtn.addEventListener("click",displayController.todayTasks);
//event on the Week sidebar element
let weekBtn=document.getElementById("this week-btn");
weekBtn.addEventListener("click",displayController.weekTasks);
//event on the Important sidebar element(high priority tasks)
let importantBtn=document.getElementById("important-btn");
importantBtn.addEventListener("click",displayController.importantTasks);

//click event on the projects in sidebar
document.addEventListener("click",function(event){
if(event.target.getAttribute("data-projects-sb")){
    displayController.projectsTasks(event.target);
}
})
//click event on delete task button
content.addEventListener("click",function(event){
   if(event.target.classList=="delete-btn"){
    taskManager.deleteTask(event.target);
   }
})
//click event on edit task button
content.addEventListener("click",function(event){
    if(event.target.classList=="edit-btn"){        
        taskManager.editTask(event.target);        
    }

})
//click event on delete project btn
sideBar.addEventListener("click",function(event){
    if(event.target.classList=="delete-btn"){
        projectManager.deleteProject(event.target)
    }
})
//click event on edit project
sideBar.addEventListener("click",function(event){
    if(event.target.classList=="edit-btn"){
        projectManager.editProject(event.target);
    }
})
