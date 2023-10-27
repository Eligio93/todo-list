import { storageManager } from "./localStorage";
import { format, isThisWeek} from 'date-fns'
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
            arrowDown.src="/src/img/arrow-down-icon.svg";
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
            deleteBtn.src="/src/img/delete-icon.svg";
            let editBtn=document.createElement("img");
            editBtn.className="edit-btn";
            editBtn.setAttribute("data-task",index)
            editBtn.src="/src/img/edit-icon.svg";
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
        let projects=storageManager.downloadProjects();
        let tasks=[];
        //put all project's tasks in the tasks array
        for(let i=0;i<projects.length;i++){
            tasks.push(projects[i].tasks);
            
        }
        let allTasks=tasks.flat();
        //display each task in a separate div
        renderTasks(allTasks);
        //logic to display task descriptions
        renderTaskDescription()
        

    }
    let todayTasks=function(){
        content.innerHTML="";
        let projects=storageManager.downloadProjects();
        let tasks=[];
        for(let i=0;i<projects.length;i++){
           tasks.push(projects[i].tasks);
        }
        let allTasks=tasks.flat(); 
        //formats the date on the task array and adds today tasks to the todayTasks array       
        let todayTasks=allTasks.filter(task=>(format(new Date(task.date),`dd/MM/yyy`)==format(new Date(),`dd/MM/yyy`)));
        renderTasks(todayTasks);
        renderTaskDescription();
    }
    let weekTasks=function(){
        content.innerHTML="";
        let projects=storageManager.downloadProjects();
        let tasks=[];
        for(let i=0;i<projects.length;i++){
            tasks.push(projects[i].tasks);
        }
        let allTasks=tasks.flat();
        let weekTasks=allTasks.filter(task=>isThisWeek(new Date(task.date), { weekStartsOn: 1 }));
        renderTasks(weekTasks);
        renderTaskDescription();
    }
    let importantTasks=function(){
        content.innerHTML="";
        let projects=storageManager.downloadProjects();
        let tasks=[];
        for(let i=0;i<projects.length;i++){
            tasks.push(projects[i].tasks)
        }
        let allTasks=tasks.flat();
        let importantTasks=allTasks.filter(task=>task.priority=="High");
        renderTasks(importantTasks);
        renderTaskDescription();

    }
    let projectsTasks=function(sbProject){
        content.innerHTML="";
        let projectTaskHeader=document.createElement("h2");
        projectTaskHeader.id="project-task-header";
        projectTaskHeader.textContent="Project "+sbProject.textContent+" tasks";
        content.appendChild(projectTaskHeader);
        let projects=storageManager.downloadProjects();
                let sbProjectName=sbProject.textContent;
                let selectedProject=projects.find(element=>element.projectName==sbProjectName);
                let tasks=selectedProject.tasks;
                renderTasks(tasks);
                renderTaskDescription();
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