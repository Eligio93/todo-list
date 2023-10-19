
let storageManager = (function () {

    let saveProject = function (projects) {
        localStorage.setItem("projectsJSON", JSON.stringify(projects));
    }
    let downloadProjects = function () {
        let getProjects = JSON.parse(localStorage.getItem("projectsJSON"));
        if (getProjects == null) {
            return [{
                projectName: "default",
                date: "",
                priority: "",
                tasks: []
            }]
        } else {
            return getProjects;
        }

    }

    return {
        saveProject,
        downloadProjects,
        // initStorage
    }

})();
export { storageManager };