import "./style.css";
import createSideBar from "./createSideBar";
import {taskManager,projectManager} from "./App";
let content=document.getElementById("content");


let addTask=function(){
    taskManager.createTaskForm();
    let createTaskBtn=document.getElementById("create-task-btn");
    createTaskBtn.addEventListener("click",function(){
        taskManager.createTask();
    });  
}
let addProject=function(){
    projectManager.createProjectForm();
    let createProjectBtn=document.getElementById("create-project-btn");
    createProjectBtn.addEventListener("click",function(){
        projectManager.createProject();
    })
}

createSideBar();

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