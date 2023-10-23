import { storageManager } from "./localStorage";
let content=document.getElementById("content");


let displayController=(function(){
    // home Tasks displays all tasks in every project
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
        allTasks.forEach((task,index)=>{
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
            showDate.textContent=task.date;
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
            completeBtn.className="complete-btn";
            completeBtn.setAttribute("data-task",index)
            completeBtn.type="checkbox";
            modifyBtns.appendChild(deleteBtn);
            modifyBtns.appendChild(editBtn);
            modifyBtns.appendChild(completeBtn);
            taskDiv.appendChild(arrowDown);
            taskDiv.appendChild(showTitle);
            taskDiv.appendChild(showDate);
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
    return {
        homeTasks
    }
}
)();

export {displayController}