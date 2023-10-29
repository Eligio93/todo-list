import { storageManager } from "./localStorage";
import { createSideBar } from "./createSideBar";
import { format } from 'date-fns'
import { displayController } from "./UI";
let content = document.getElementById("content");



//all about tasks
const taskManager = (function () {
    //create task form
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
        <button type="button" id="create-task-btn">Create Task</button>
    </form>`
        let projects = storageManager.downloadProjects();
        //give the option to choose in which project the task will be putted
        if (projects.length == 1) {
            document.getElementById("checkbox").style.display = "none";
            document.querySelector(`label[for="checkbox"]`).style.display = "none";
        } else {
            let checkbox = document.getElementById("checkbox");
            let selectProject = document.createElement("select");
            selectProject.id = "select-project-menu";
            for (let i = 0; i < projects.length; i++) {
                if (projects[i].projectName !== "default") {
                    let projectOption = document.createElement("option");
                    projectOption.setAttribute("value", projects[i].projectName);
                    projectOption.textContent = projects[i].projectName;
                    selectProject.appendChild(projectOption);
                }
            }
            checkbox.insertAdjacentElement("afterend", selectProject);
            selectProject.style.display = "none";
            checkbox.addEventListener("change", function () {
                if (checkbox.checked) {
                    selectProject.style.display = "block";
                } else {
                    selectProject.style.display = "none";
                }


            })
        }
    }
    //function to create a task
    let createTask = function () {
        let projects = storageManager.downloadProjects();
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
        if (taskProject && document.getElementById("checkbox").checked) {
            taskProject = taskProject.value;
        } else {
            taskProject = "default";
        }
        //check if there s another task with same title and date
        let existingTask = projects.some(project => {


            return project.tasks.some(task => task.title == taskTitle && task.date == taskDate);
        })
        if (existingTask) {
            alert("A task with same title and same date already exists")
        } else {
            let newTask = new Task(taskTitle, taskDate, taskDescription, taskPriority, taskProject);
            projects.forEach(obj => {
                if (obj.projectName == newTask.taskProject) {
                    obj.tasks.push(newTask);
                    storageManager.saveProject(projects);//save the updated project in local storage
                }
            })
            displayController.homeTasks();

        }

    }
    //function to delete a task(as argument is been passed the delete button clicked on sidebar)
    let deleteTask = function (deleteBtn) {
        //get the div of the delete button clicked where there are info about the task
        let divTask = deleteBtn.parentNode.parentNode;
        let taskToDeleteTitle = divTask.querySelector(".show-title").textContent;
        let tasktoDeleteDate = divTask.querySelector(".show-date").textContent;
        let projects = storageManager.downloadProjects();
        //check in all projects the task to delete
        for (let i = 0; i < projects.length; i++) {
            for (let j = 0; j < projects[i].tasks.length; j++) {
                let formatProjectDate = format(new Date(projects[i].tasks[j].date), "dd/MM/yyyy");
                if (projects[i].tasks[j].title == taskToDeleteTitle && formatProjectDate == tasktoDeleteDate) {
                    projects[i].tasks.splice(j, 1);
                }

            }
        }
        storageManager.saveProject(projects);
        divTask.remove();

    }
    //function to edit task
    let editTask = function (editBtn) {
        //select the task to edit from div where button is clicked and get the info
        let divTask = editBtn.parentNode.parentNode;
        let divDataTask = divTask.getAttribute("data-task");
        let taskToEditDescription = content.querySelector(`[data-description="${divDataTask}"]`).textContent;
        let taskToEditTitle = divTask.querySelector(".show-title").textContent;
        let taskToEditDate = divTask.querySelector(".show-date").textContent;
        let taskToEditProject = divTask.querySelector(".show-project").textContent;
        let tasktoEditPriority = divTask.querySelector(".show-priority").querySelector(".priority-description").textContent;
        //use the form with prefilled information
        createTaskForm();
        document.getElementById("task-title").value = taskToEditTitle;
        document.getElementById("task-date").value = taskToEditDate.split('/').reverse().join('-');;
        document.getElementById("task-description").textContent = taskToEditDescription;
        if (taskToEditProject == "") {
            taskToEditProject = "default";
        } else {
            document.getElementById("checkbox").checked = true;
            let selectionMenuProject = document.getElementById("select-project-menu");
            selectionMenuProject.style.display = "block";
            selectionMenuProject.value = taskToEditProject;
        }
        let selectionMenuPriority = document.getElementById("task-priority");
        selectionMenuPriority.value = tasktoEditPriority;
        document.getElementById("create-task-btn").textContent = "Edit Task";
        let createEditedTaskBtn = document.getElementById("create-task-btn");
        //delete the old task and create the edited one
        createEditedTaskBtn.addEventListener("click", function () {
            let projects = storageManager.downloadProjects();
            for (let i = 0; i < projects.length; i++) {
                for (let j = 0; j < projects[i].tasks.length; j++) {
                    if (projects[i].tasks[j].title == taskToEditTitle && projects[i].tasks[j].description == taskToEditDescription && projects[i].tasks[j].taskProject == taskToEditProject) {
                        projects[i].tasks.splice(j, 1);
                    }
                }

            }
            storageManager.saveProject(projects);
            createTask();
            displayController.homeTasks();



        })
    }
    return {
        createTask,
        createTaskForm,
        deleteTask,
        editTask
    }


})();
//all about Projects
const projectManager = (function () {
    //contructor class for project
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
        <input type="text" id="project-name" name="project-name" required>
        <label for="project-date">Due date:</label>
        <input type="date" id="project-date" name="project-date" required>
        <label for="project-priority">Priority:</label>
        <select name="project-priority" id="project-priority" required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        <button type="button" id="create-project-btn">Create Project</button>
    </form>`
    }
    //function to create project
    let createProject = function () {
        let projectName = document.getElementById("project-name").value;
        let projectDate = document.getElementById("project-date").value;
        let projectPriority = document.getElementById("project-priority").value;
        let newProject = new Project(projectName, projectDate, projectPriority);
        let projects = storageManager.downloadProjects();
        projects.push(newProject);
        storageManager.saveProject(projects);
        content.innerHTML = "";//porta alla scehrmata dei progetti
        if (document.getElementById("projects-div")) {
            document.getElementById("projects-div").remove();
        }

        createSideBar.showProjects();
    }
    //function to delete the project
    let deleteProject = function (deleteBtn) {
        let divProject = deleteBtn.parentNode.parentNode;
        let projectToDeleteName = divProject.textContent;
        let projects = storageManager.downloadProjects();
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].projectName == projectToDeleteName) {
                projects.splice(i, 1);
            }
        }
        storageManager.saveProject(projects);
        divProject.remove();
        displayController.homeTasks();
        document.getElementById("projects-div").remove();
        createSideBar.showProjects();

    }
    //function to edit project
    let editProject = function (editBtn) {
        let divProject = editBtn.parentNode.parentNode;
        let projectToEditName = divProject.textContent;
        let projects = storageManager.downloadProjects();
        let selectedProject = projects.find(obj => obj.projectName == projectToEditName);
        let projectToEditDate = selectedProject.date;
        let projectToEditPriority = selectedProject.priority;
        //same as task the form is precompiled with old information
        createProjectForm();
        document.getElementById("project-name").value = projectToEditName;
        document.getElementById("project-date").value = projectToEditDate;
        document.getElementById("project-priority").value = projectToEditPriority;
        document.getElementById("create-project-btn").textContent = "Edit Project";
        document.getElementById("create-project-btn").addEventListener("click", function () {
            //differently from task modifies the actual value of the project in the array
            selectedProject.projectName = document.getElementById("project-name").value;
            selectedProject.date = document.getElementById("project-date").value;
            selectedProject.priority = document.getElementById("project-priority").value;
            storageManager.saveProject(projects);
            document.getElementById("projects-div").remove();
            createSideBar.showProjects();
            displayController.homeTasks();

        });


    }

    return {
        createProjectForm,
        createProject,
        deleteProject,
        editProject
    }
})();


export { taskManager, projectManager };