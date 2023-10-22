import { storageManager } from "./localStorage";
import { displayController } from "./UI";
let projects = storageManager.downloadProjects();

let content = document.getElementById("content");

const taskManager = (function () {
    //all about creating a task
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
        let taskProject = document.getElementById("select-project-menu");
        //Check if there s the menu to select a project
        if (taskProject) {
            taskProject = taskProject.value;
            let newTask = new Task(taskTitle, taskDate, taskDescription, taskPriority, taskProject);
            //Put the created task in the belonging project
            projects.forEach(obj => {
                if (obj.projectName == newTask.taskProject) {
                    obj.tasks.push(newTask);
                    storageManager.saveProject(projects);//save the updated project in local storage
                }
            })
        } else {
            
            taskProject = "default";
            let newTask = new Task(taskTitle, taskDate, taskDescription, taskPriority, taskProject);
            //the new task is been putted in the default project
            let defaultProject = projects.find(obj => obj.projectName == "default");
            defaultProject.tasks.push(newTask);
            storageManager.saveProject(projects);

        }
        content.innerHTML="";
        displayController.homeTasks();
    }

    let createTaskForm = function () { 
        content.innerHTML = `<form id="task-form">
        <label for="task-title">Title:</label>
        <input type="text" id="task-title" name="task-title" required>
        <label for="task-date">Due date:</label>
        <input type="date" id="task-date" name="task-date" required>
        <label for="task-description">Description:</label>
        <textarea name="task-description" id="task-description" required></textarea>
        <label for="checkbox">Add to a project?</label>
        <input type="checkbox" name="checkbox" id="checkbox">
        <label for="task-priority">Priority:</label>
        <select name="task-priority" id="task-priority" required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        <button type="submit" id="create-task-btn">Create Task</button>
    </form>`
   
        //give the option to choose in whic project the task will be putted
        if (projects.length == 1) {
            document.getElementById("checkbox").style.display = "none";
            document.querySelector(`label[for="checkbox"]`).style.display = "none";
        } else {
            let checkbox = document.getElementById("checkbox");
            checkbox.addEventListener("change", function () {
                if (checkbox.checked) {   
                    let selectProject = document.createElement("select");
                    selectProject.id = "select-project-menu";                 
                    for(let i=0;i<projects.length;i++){
                        if(projects[i].projectName !== "default"){
                            let projectOption = document.createElement("option");
                            projectOption.setAttribute("value", projects[i].projectName);
                            projectOption.textContent = projects[i].projectName;
                            selectProject.appendChild(projectOption);

                        }

                    }
                    checkbox.insertAdjacentElement("afterend", selectProject);
                }else{
                   document.getElementById("select-project-menu").remove();
                   
                }

            })
        }
    }

    return {
        createTask,
        createTaskForm
    }


})();

const projectManager = (function () {
    class Project {
        constructor(projectName, date, priority) {
            this.projectName = projectName;
            this.date = date;
            this.priority = priority;
            this.tasks = [];
        }
    }
    let createProjectForm = function () {
        content.innerHTML = `<form action="" method="" id="project-form">
        <label for="project-name">Project Name:</label>
        <input type="text" id="project-name" name="project-name">
        <label for="project-date">Due date:</label>
        <input type="date" id="project-date" name="project-date">
        <label for="project-priority">Priority:</label>
        <select name="project-priority" id="project-priority">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        <button type="button" id="create-project-btn">Create Project</button>
    </form>`
    }

    let createProject = function () {
        let projectName = document.getElementById("project-name").value;
        let projectDate = document.getElementById("project-date").value;
        let projectPriority = document.getElementById("project-priority").value;
        let newProject = new Project(projectName, projectDate, projectPriority);
        projects = storageManager.downloadProjects();
        projects.push(newProject);
        storageManager.saveProject(projects);
        content.innerHTML="";//porta alla scehrmata dei progetti
    }

    return {
        createProjectForm,
        createProject
    }
})();


export { taskManager, projectManager};