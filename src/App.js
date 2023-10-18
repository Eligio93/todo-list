let projects = [];

const taskManager = (function () {

    let createTask = function () {
        
        class Task {
            constructor(title, date, description, priority) {
                this.title = title;
                this.date = date;
                this.description = description;
                this.priority = priority;
            }
        }
        let taskTitle = document.getElementById("task-title").value;
        let taskDate = document.getElementById("task-date").value;
        let taskDescription = document.getElementById("task-description").value;
        let taskPriority = document.getElementById("task-priority").value;
        let task = new Task(taskTitle, taskDate, taskDescription, taskPriority);
        projects.push(task);
        console.log(projects);
    }
    return {
        createTask
    }

})();

export default taskManager;