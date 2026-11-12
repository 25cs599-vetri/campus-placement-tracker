const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const problemInput = document.getElementById("problemInput");
const problemTopic = document.getElementById("problemTopic");
const problemDifficulty = document.getElementById("problemDifficulty");
const addProblemButton = document.getElementById("addProblemButton");
const problemList = document.getElementById("problemList");
let problems = JSON.parse(localStorage.getItem("problems")) || [];
const companyInput = document.getElementById("companyInput");
const roleInput = document.getElementById("roleInput");
const applicationDate = document.getElementById("applicationDate");
const applicationStatus = document.getElementById("applicationStatus");
const addApplicationButton = document.getElementById("addApplicationButton");
const applicationList = document.getElementById("applicationList");
const applicationCount = document.getElementById("applicationCount");
const interviewCount = document.getElementById("interviewCount");
let applications = JSON.parse(localStorage.getItem("applications")) || [];
const studentName = document.getElementById("studentName");
const studentDegree = document.getElementById("studentDegree");
const collegeName = document.getElementById("collegeName");
const studentSkills = document.getElementById("studentSkills");
const careerGoal = document.getElementById("careerGoal");
const saveProfileButton = document.getElementById("saveProfileButton");
const profileDisplay = document.getElementById("profileDisplay");
const completedTaskCount = document.getElementById("completedTaskCount");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function updateCompletedTaskCount() {

    const completedTasks = tasks.filter(function (task) {
        return task.completed === true;
    });

    completedTaskCount.textContent = completedTasks.length;
}
function saveProfile() {

    const profile = {
        name: studentName.value.trim(),
        degree: studentDegree.value.trim(),
        college: collegeName.value.trim(),
        skills: studentSkills.value.trim(),
        goal: careerGoal.value.trim()
    };
    if (
        profile.name === "" ||
        profile.degree === "" ||
        profile.college === "" ||
        profile.skills === "" ||
        profile.goal === ""
    ) {
        alert("Please fill in all the profile fields!");
        return;
    }
        localStorage.setItem("profile", JSON.stringify(profile));
            profileDisplay.innerHTML = `
        <h3>${profile.name}</h3>
        <p><strong>Degree:</strong> ${profile.degree}</p>
        <p><strong>College:</strong> ${profile.college}</p>
        <p><strong>Skills:</strong> ${profile.skills}</p>
        <p><strong>Career Goal:</strong> ${profile.goal}</p>
    `;
}
saveProfileButton.addEventListener("click", saveProfile);
function displayProblem(problem) {

    const listItem = document.createElement("li");

    const problemText = document.createElement("span");
    const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = problem.solved || false;
    problemText.textContent =
    problem.name + " | " +
    problem.topic + " | " +
    problem.difficulty;

if (problem.solved) {
    problemText.style.textDecoration = "line-through";
}
checkbox.addEventListener("change", function () {

    problem.solved = checkbox.checked;

    localStorage.setItem("problems", JSON.stringify(problems));

    if (checkbox.checked) {
        problemText.style.textDecoration = "line-through";
    } else {
        problemText.style.textDecoration = "none";
    }

    updateProblemCount();

});

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        problems = problems.filter(function (item) {
            return item !== problem;
        });

        localStorage.setItem("problems", JSON.stringify(problems));

        listItem.remove();

        updateProblemCount();
    });

    listItem.appendChild(problemText);
    listItem.appendChild(checkbox);
    listItem.appendChild(deleteButton);

    problemList.appendChild(listItem);
}
function displayApplication(application) {

    const listItem = document.createElement("li");

    const applicationText = document.createElement("span");
const statusSelect = document.createElement("select");

const statuses = [
    "Applied",
    "Assessment",
    "Interview",
    "Selected",
    "Rejected"
];

statuses.forEach(function (status) {

    const option = document.createElement("option");

    option.value = status;
    option.textContent = status;

    statusSelect.appendChild(option);

});

statusSelect.value = application.status;
statusSelect.addEventListener("change", function () {

    application.status = statusSelect.value;

    localStorage.setItem("applications", JSON.stringify(applications));

    updateInterviewCount();

});
    applicationText.textContent =
    application.company + " | " +
    application.role + " | " +
    application.date;
const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";

deleteButton.addEventListener("click", function () {

    applications = applications.filter(function (item) {
        return item !== application;
    });

    localStorage.setItem("applications", JSON.stringify(applications));

    listItem.remove();
updateApplicationCount();
updateInterviewCount();
});
    listItem.appendChild(applicationText);
    listItem.appendChild(statusSelect);
listItem.appendChild(deleteButton);
    applicationList.appendChild(listItem);
}
function updateProblemCount() {

    const solvedProblems = problems.filter(function (problem) {
        return problem.solved === true;
    });

    document.getElementById("problemCount").textContent = solvedProblems.length;
}
function updateApplicationCount() {
    applicationCount.textContent = applications.length;
}
function updateInterviewCount() {

    const interviews = applications.filter(function (application) {
        return application.status === "Interview";
    });

    interviewCount.textContent = interviews.length;
}
addProblemButton.addEventListener("click", function () {

    const name = problemInput.value.trim();
    const topic = problemTopic.value;
    const difficulty = problemDifficulty.value;

    if (name === "" || topic === "" || difficulty === "") {
        alert("Please fill in all the fields!");
        return;
    }

    const problem = {
        name: name,
        topic: topic,
        difficulty: difficulty
    };

    problems.push(problem);

    localStorage.setItem("problems", JSON.stringify(problems));

    displayProblem(problem);

    updateProblemCount();

    problemInput.value = "";
    problemTopic.value = "";
    problemDifficulty.value = "";

});
addApplicationButton.addEventListener("click", function () {

    const company = companyInput.value.trim();
    const role = roleInput.value.trim();
    const date = applicationDate.value;
    const status = applicationStatus.value;
if (company === "" || role === "" || date === "" || status === "") {
    alert("Please fill in all the fields!");
    return;
}
const application = {
    company: company,
    role: role,
    date: date,
    status: status
};
applications.push(application);

localStorage.setItem("applications", JSON.stringify(applications));
displayApplication(application);
updateApplicationCount();
updateInterviewCount();
companyInput.value = "";
roleInput.value = "";
applicationDate.value = "";
applicationStatus.value = "";
});
function displayTask(task) {

    const listItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    if (task.completed) {
        taskText.style.textDecoration = "line-through";
    }

    checkbox.addEventListener("change", function () {
        task.completed = checkbox.checked;

        if (checkbox.checked) {
            taskText.style.textDecoration = "line-through";
        } else {
            taskText.style.textDecoration = "none";
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateCompletedTaskCount();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        tasks = tasks.filter(function (item) {
            return item !== task;
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
        listItem.remove();
        updateCompletedTaskCount();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
}
addTaskButton.addEventListener("click", function () {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }
tasks.push({
    text: task,
    completed: false
});

localStorage.setItem("tasks", JSON.stringify(tasks));
   displayTask(tasks[tasks.length - 1]);

    taskInput.value = "";

});
tasks.forEach(function (task) {
    displayTask(task);
});
updateCompletedTaskCount();
problems.forEach(function (problem) {
    displayProblem(problem);
});

updateProblemCount();
applications.forEach(function (application) {
    displayApplication(application);
});
updateApplicationCount();
updateInterviewCount();
const savedProfile = JSON.parse(localStorage.getItem("profile"));

if (savedProfile) {

    studentName.value = savedProfile.name;
    studentDegree.value = savedProfile.degree;
    collegeName.value = savedProfile.college;
    studentSkills.value = savedProfile.skills;
    careerGoal.value = savedProfile.goal;

    saveProfile();

}