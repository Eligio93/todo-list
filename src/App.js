import {storageManager} from "./localStorage";
let projects=storageManager.initStorage();
let content = document.getElementById("content");

const taskManager = (function () {

   
    let tasks=[];
    //ALl about creating a task
    let createTask = function () {  

        //class to create a task object
        class Task {
            constructor(title, date, description, priority, taskProject) {
                this.title = title;
                this.date = date;
                this.description = description;
                this.priority = priority;
                this.taskProject = taskProject;
            }
        }

        //get task value from form
        let taskTitle = document.getElementById("task-title").value;
        let taskDate = document.getElementById("task-date").value;
        let taskDescription = document.getElementById("task-description").value;
        let taskPriority = document.getElementById("task-priority").value;
        //inserire la funziona che prenda la task e lo assegni al progetto. se non viene selezionata la casella il progetto è default
        
        //create the task object
        let newTask = new Task(taskTitle, taskDate, taskDescription, taskPriority);
        tasks.push(newTask);
        //if doesn thave project, task assigned to default project
        if(newTask.taskProject==undefined){
            newTask.taskProject="default"
        }
        // add the task to the belonging project
        projects.forEach(obj=>{
            if(obj.projectName==newTask.taskProject){
                obj.tasks=tasks;
                storageManager.saveProject();//save the updated project in local storage
            }
        })
        content.innerHTML="";
    }

    let createTaskForm = function () {
        content.innerHTML = `<form action="" method="" id="task-form">
        <label for="task-title">Title:</label>
        <input type="text" id="task-title" name="task-title">
        <label for="task-date">Due date:</label>
        <input type="date" id="task-date" name="task-date">
        <label for="task-description">Description:</label>
        <textarea name="task-description" id="task-description"></textarea>
        <label for="checkbox">Add to a project?</label>
        <input type="checkbox" name="checkbox" id="checkbox">
        <label for="task-priority">Priority:</label>
        <select name="task-priority" id="task-priority">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        <button type="button" id="create-task-btn">Create Task</button>
    </form>`
    }
    let getTasks=function(){
        return tasks;
    }
    return {
        createTask,
        createTaskForm,
        getTasks
    }


})();

const projectManager=(function(){
    class Project {
        constructor(projectName, date, priority) {
            this.projectName = projectName;
            this.date = date;  
            this.priority = priority;
        }
    }

})();
export {taskManager};