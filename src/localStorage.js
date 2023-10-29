
let storageManager = (function () {
    //save projects on localStorage
    let saveProject = function (projects) {
        localStorage.setItem("projectsJSON", JSON.stringify(projects));
    }
    //download the projects from the local storage
    let downloadProjects = function () {
        let getProjects = JSON.parse(localStorage.getItem("projectsJSON"));
        if (getProjects == null) {
            //in case there s no project download the default project
            return [{
                projectName: "default",
                date: "",
                priority: "",
                tasks: []
            }];
            
        } else {
            return getProjects;
        }

    }

    return {
        saveProject,
        downloadProjects
    }

})();
export { storageManager };