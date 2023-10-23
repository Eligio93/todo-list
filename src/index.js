import "./style.css";
import createSideBar from "./createSideBar";
import {taskManager,projectManager} from "./App";
import {displayController} from "./UI";
let content=document.getElementById("content");


let addTask=function(){
    taskManager.createTaskForm();
    let createTaskBtn=document.getElementById("create-task-btn");
    let taskForm=document.getElementById("task-form");
    taskForm.addEventListener("submit",function(event){
        //prevent the submit event but checks the inout fields
        event.preventDefault()
        //work as a click event
        createTaskBtn.click();
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

let homeBtn=document.getElementById("home-btn");
homeBtn.addEventListener("click",function(){
    displayController.homeTasks();
    let descriptionBtns=document.querySelectorAll(".arrow-down-icon");
    descriptionBtns.forEach((btn,index)=>{
        btn.addEventListener("click",function(){
            let description=document.querySelector(`[data-description="${index}"]`);
            if(description.style.display=="none"){
                description.style.display="block";
            }else if(description.style.display=="block"){
                description.style.display="none";
            }
        })
    })
});