import { storageManager } from "./localStorage";
import { format, isThisWeek} from 'date-fns';
import deleteIcon from "./img/delete-icon.svg";
import editIcon from "./img/edit-icon.svg";
import arrowDownIcon from "./img/arrow-down-icon.svg"
let content=document.getElementById("content");


let displayController=(function(){
    // home Tasks displays all tasks in every project
    let renderTasks=function(array){
        array.forEach((task,index)=>{
            let taskDiv=document.createElement("div");
            taskDiv.className="task-div";
            taskDiv.setAttribute("data-task",index)
            let arrowDown=document.createElement("img");
            arrowDown.className="arrow-down-icon";
            arrowDown.src=arrowDownIcon;
            let showTitle=document.createElement("div");
            showTitle.className="show-title";
            showTitle.textContent=task.title;
            let showDate=document.createElement("div");
            showDate.className="show-date";
            showDate.textContent=format(new Date(task.date),'dd/MM/yyyy');
            let showProject=document.createElement("div");
            showProject.className="show-project";
            if(task.taskProject!=="default"){
                showProject.textContent=task.taskProject;
            }else{
                showProject.textContent="";
            }            
            let showPriority=document.createElement("div");
            showPriority.className="show-priority";
            let priorityColor=document.createElement("div");
            priorityColor.className="priority-color";
            let priorityDescription=document.createElement("div");
            priorityDescription.className="priority-description";
            priorityDescription.textContent=task.priority;
            if(task.priority=="High"){
                priorityColor.style.backgroundColor="red";
            }else if(task.priority=="Medium"){
                priorityColor.style.backgroundColor="blue";                
            }else{
                priorityColor.style.backgroundColor="green";
            }
            showPriority.appendChild(priorityColor);
            showPriority.appendChild(priorityDescription);
            let modifyBtns=document.createElement("div");
            modifyBtns.className="modify-btns";
            let deleteBtn=document.createElement("img");
            deleteBtn.className="delete-btn";
            deleteBtn.setAttribute("data-task",index)
            deleteBtn.src=deleteIcon;
            let editBtn=document.createElement("img");
            editBtn.className="edit-btn";
            editBtn.setAttribute("data-task",index)
            editBtn.src=editIcon;
            let completeBtn=document.createElement("input");
            // completeBtn.className="complete-btn";
            // completeBtn.setAttribute("data-task",index)
            // completeBtn.type="checkbox";
            modifyBtns.appendChild(deleteBtn);
            modifyBtns.appendChild(editBtn);
            // modifyBtns.appendChild(completeBtn);
            taskDiv.appendChild(arrowDown);
            taskDiv.appendChild(showTitle);
            taskDiv.appendChild(showDate);
            taskDiv.appendChild(showProject);
            taskDiv.appendChild(showPriority);
            taskDiv.appendChild(modifyBtns);
            content.appendChild(taskDiv);
            let taskDescriptionDiv=document.createElement("div");
            taskDescriptionDiv.className="task-description";
            taskDescriptionDiv.setAttribute("data-description",index);
            let taskDescription=document.createElement("p");
            taskDescription.textContent=task.description;
            taskDescriptionDiv.appendChild(taskDescription);
            taskDescriptionDiv.style.display="none";
            content.appendChild(taskDescriptionDiv);
        })

    }
    let renderTaskDescription=function(){
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
    }
    let homeTasks=function(){
        content.innerHTML="";
        let homeTaskHeader=document.createElement("h2");
        homeTaskHeader.className="content-header";
        let projects=storageManager.downloadProjects();
        let tasks=[];
        //put all project's tasks in the tasks array
        for(let i=0;i<projects.length;i++){
            tasks.push(projects[i].tasks);
            
        }
        let allTasks=tasks.flat();
        if(allTasks.length>0){
            homeTaskHeader.textContent="All Tasks"
            content.appendChild(homeTaskHeader);
            //display each task in a separate div
            renderTasks(allTasks);
            //logic to display task descriptions
            renderTaskDescription();
        }else{
            homeTaskHeader.textContent="You have no tasks, please add one from the + button below"
            content.appendChild(homeTaskHeader);
        }
      
        

    }
    let todayTasks=function(){
        content.innerHTML="";
        let todayTaskHeader=document.createElement("h2");
        todayTaskHeader.className="content-header";       
        let projects=storageManager.downloadProjects();
        let tasks=[];
        for(let i=0;i<projects.length;i++){
           tasks.push(projects[i].tasks);
        }
        let allTasks=tasks.flat(); 
        //formats the date on the task array and adds today tasks to the todayTasks array       
        let todayTasks=allTasks.filter(task=>(format(new Date(task.date),`dd/MM/yyy`)==format(new Date(),`dd/MM/yyy`)));
        if(todayTasks.length > 0){
            todayTaskHeader.textContent="Tasks of the day";
            content.appendChild(todayTaskHeader);
            renderTasks(todayTasks);
            renderTaskDescription();
        }else{
            todayTaskHeader.textContent="Today you have no tasks";
            content.appendChild(todayTaskHeader);
        }
        
    }
    let weekTasks=function(){
        content.innerHTML="";
        let weekTaskHeader=document.createElement("h2");
        weekTaskHeader.className="content-header";
        let projects=storageManager.downloadProjects();
        let tasks=[];
        for(let i=0;i<projects.length;i++){
            tasks.push(projects[i].tasks);
        }
        let allTasks=tasks.flat();
        let weekTasks=allTasks.filter(task=>isThisWeek(new Date(task.date), { weekStartsOn: 1 }));
        if(weekTasks.length>0){
            weekTaskHeader.textContent="Weekly tasks";
            content.appendChild(weekTaskHeader);
            renderTasks(weekTasks);
            renderTaskDescription();
        }else{
            weekTaskHeader.textContent="You have no tasks for this week";
            content.appendChild(weekTaskHeader);
        }
        
    }
    let importantTasks=function(){
        content.innerHTML="";
        let importantTaskHeader=document.createElement("h2");
        importantTaskHeader.className="content-header";
        let projects=storageManager.downloadProjects();
        let tasks=[];
        for(let i=0;i<projects.length;i++){
            tasks.push(projects[i].tasks)
        }
        let allTasks=tasks.flat();
        let importantTasks=allTasks.filter(task=>task.priority=="High");
        if(importantTasks.length > 0){
        importantTaskHeader.textContent="High priority tasks";
        content.appendChild(importantTaskHeader);
        renderTasks(importantTasks);
        renderTaskDescription();
        }else{
            importantTaskHeader.textContent="No high priority task found. Please add a new task!";
            content.appendChild(importantTaskHeader);
        }
        

    }
    let projectsTasks=function(sbProject){
        content.innerHTML="";
        let projectTaskHeader=document.createElement("div");
        let projectTaskTitle=document.createElement("h2");
        let projectTaskPriority=document.createElement("p");
        let projectTaskDate=document.createElement("p");
        projectTaskHeader.className="content-header";
        let projects=storageManager.downloadProjects();
                //project Name taken from the sb project
                let sbProjectName=sbProject.textContent;
                let selectedProject=projects.find(element=>element.projectName==sbProjectName);
                projectTaskPriority.textContent="Priority: "+selectedProject.priority;
                projectTaskDate.textContent="Due Date: "+format(new Date(selectedProject.date),'dd/MM/yyyy');
                let tasks=selectedProject.tasks;
                if(tasks.length>0){
                    projectTaskTitle.textContent="Project "+sbProject.textContent+" tasks";
                    projectTaskHeader.appendChild(projectTaskTitle);
                    projectTaskHeader.appendChild(projectTaskPriority);
                    projectTaskHeader.appendChild(projectTaskDate);
                    content.appendChild(projectTaskHeader)
                   
                    renderTasks(tasks);
                    renderTaskDescription();
                }else{
                    projectTaskTitle.textContent="Project "+sbProject.textContent+" have no tasks";
                   projectTaskHeader.appendChild(projectTaskTitle);
                   projectTaskHeader.appendChild(projectTaskPriority);
                    projectTaskHeader.appendChild(projectTaskDate);
                    content.appendChild(projectTaskHeader)
                }
               
            }
    return {
        homeTasks,
        todayTasks,
        weekTasks,
        importantTasks,
        projectsTasks
    }
}
)();

export {displayController}