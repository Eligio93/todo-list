import { storageManager } from "./localStorage";
let content=document.getElementById("content");


let displayController=(function(){
    let homeTasks=function(){
        let projects=storageManager.downloadProjects();
        let tasks=[];
        for(let i=0;i<projects.length;i++){
            tasks.push(projects[i].tasks);
            
        }
        let allTasks=tasks.flat();
        allTasks.forEach((task,index)=>{
            let taskDiv=document.createElement("div");
            taskDiv.className="task-div";
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


        })

    }
    return {
        homeTasks
    }
}
)();

export {displayController}