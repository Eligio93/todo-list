import "./style.css";
import { createSideBar } from "./createSideBar";
import {taskManager,projectManager} from "./App";
import {displayController} from "./UI";
let content=document.getElementById("content");
let sideBar=document.getElementById("sidebar")


let addTask=function(){
    taskManager.createTaskForm();
    let createTaskBtn=document.getElementById("create-task-btn");
    let taskForm=document.getElementById("task-form");
    createTaskBtn.addEventListener("click",function(){
        //check validity of the form and date
        if(taskForm.checkValidity()){
            taskManager.createTask();
            displayController.homeTasks(); 
        }else if(new Date(document.getElementById("task-date").value)< new Date()){
           alert("Your task can't have a date in the past")
        }else{
            alert("All informations requested are needed");
        }
        
    });  
}

let addProject=function(){
    projectManager.createProjectForm();
    let createProjectBtn=document.getElementById("create-project-btn");
    createProjectBtn.addEventListener("click",function(){
        let projectForm=document.getElementById("project-form");
        if(projectForm.checkValidity()){
            projectManager.createProject();    
        }else if(new Date(document.getElementById("project-date").value)< new Date()){
            alert("Your project date can't have a date in the past")
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

let homeBtn=document.getElementById("home-btn");
homeBtn.addEventListener("click",function(){
    displayController.homeTasks();  
});
let todayBtn=document.getElementById("today-btn");
todayBtn.addEventListener("click",displayController.todayTasks);

let weekBtn=document.getElementById("this week-btn");
weekBtn.addEventListener("click",displayController.weekTasks);
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
