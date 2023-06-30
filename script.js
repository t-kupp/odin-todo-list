const btnToday = document.querySelector("#btn-default-today");
const btnWeek = document.querySelector("#btn-default-week");
const btnAddTask = document.querySelector("#btn-add-task");
const btnSubmitForm = document.querySelector("#input-submit");
const taskList = document.querySelector("#task-list");
const btnImportant = document.querySelector("#input-important");
const btnHome = document.querySelector("#btn-default-home");
const userProjectsListWrapper = document.querySelector("#user-projects-list-wrapper");

let myTasks = {};
let activeProject = "home";

// push new project array
function ProjectArray(projectName) {
  myTasks[projectName] = [];
}

new ProjectArray("home");

// Constructor to create new tasks and push them into the array
function Task(title, description, date, isImportant, isDone, activeProject) {
  this.title = title;
  this.description = description;
  this.date = date;
  this.isImportant = isImportant;
  this.isDone = isDone;
  myTasks[activeProject].push(this);
}

// Example task
new Task(
  "Finish the To-Do List", //title
  "Complete this project to advance to the next part of the curriculum.", //description
  "2023-07-01", //date
  true, //isImportant
  false, //isDone
  "home"
);

// Clicking the Add Task button opens the new task form
btnAddTask.addEventListener("click", () => {
  toggleTaskFormVisibility("visible");
});

function toggleTaskFormVisibility(v) {
  const formWrapper = document.querySelector("#form-wrapper");
  formWrapper.style.visibility = v;

  formWrapper.addEventListener("click", (e) => {
    if (e.target == formWrapper) {
      e.preventDefault();
      formWrapper.style.visibility = "hidden";
    }
  });
}

// Add new task to array when submitting the form
btnSubmitForm.addEventListener("click", () => {
  const title = document.querySelector("#input-title");
  const description = document.querySelector("#input-description");
  const date = document.querySelector("#input-date");

  if (title.value.trim() === "") {
    alert("Please enter a title.");
    return;
  }

  new Task(
    title.value.trim(),
    description.value.trim(),
    date.value,
    isImportant,
    false,
    activeProject
  );

  resetForm(title, description, date);

  toggleTaskFormVisibility("hidden");

  drawTasksFromArray();
});

function resetForm(title, description, date) {
  title.value = "";
  description.value = "";
  date.value = "";
  btnImportant.classList.remove("toggled");
  isImportant = false;
}

// Draw tasks from the array
function drawTasksFromArray() {
  taskList.innerHTML = "";

  for (let i = 0; i < myTasks[activeProject].length; i++) {
    const newTaskWrapper = taskList.appendChild(document.createElement("div"));
    newTaskWrapper.classList.add("task-wrapper");

    const newLeftSide = newTaskWrapper.appendChild(document.createElement("div"));
    newLeftSide.classList.add("left-side");

    const newRightSide = newTaskWrapper.appendChild(document.createElement("div"));
    newRightSide.classList.add("right-side");

    const newTitle = newLeftSide.appendChild(document.createElement("p"));
    newTitle.textContent = myTasks[activeProject][i].title;
    newTitle.classList.add("task-title");

    const newDescription = newLeftSide.appendChild(document.createElement("p"));
    newDescription.textContent = myTasks[activeProject][i].description;
    newDescription.classList.add("task-description");

    if (myTasks[activeProject][i].isImportant == true) {
      newTaskWrapper.classList.add("important");
    }

    const newDate = newRightSide.appendChild(document.createElement("p"));
    newDate.textContent = myTasks[activeProject][i].date;
    newDate.classList.add("task-date");

    const newIsDone = newRightSide.appendChild(document.createElement("input"));
    newIsDone.type = "checkbox";
    newIsDone.name = "checkbox";
    newIsDone.checked = myTasks[activeProject][i].isDone;
    newIsDone.classList.add("task-done");
    if (myTasks[activeProject][i].isDone == true) newTaskWrapper.classList.add("task-completed");
    if (myTasks[activeProject][i].isDone == false)
      newTaskWrapper.classList.remove("task-completed");
    newIsDone.addEventListener("click", () => {
      if (myTasks[activeProject][i].isDone == false) {
        myTasks[activeProject][i].isDone = true;
      } else {
        myTasks[activeProject][i].isDone = false;
      }
      drawTasksFromArray();
    });

    const newDeleteButton = newRightSide.appendChild(document.createElement("button"));
    newDeleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    newDeleteButton.classList.add("task-delete");
    newDeleteButton.addEventListener("click", () => {
      myTasks[activeProject].splice(i, 1);
      drawTasksFromArray();
    });
  }
}
drawTasksFromArray();

// Functionality for the "Important?"" button
btnImportant.addEventListener("click", () => {
  toggleImportantStatus();
});

let isImportant = false;
function toggleImportantStatus() {
  if (isImportant == true) {
    isImportant = false;
    btnImportant.classList.remove("toggled");
    return;
  }
  btnImportant.classList.add("toggled");
  isImportant = true;
}

// Sidebar Home button
btnHome.addEventListener("click", (e) => {
  activeProject = "home";
  drawTasksFromArray();
});

// Add Project button
const btnAddProject = document.querySelector("#btn-add-project");

btnAddProject.addEventListener("click", function f(e) {
  const addProjectWrapper = document.querySelector("#add-project-wrapper");

  const newWrapper = addProjectWrapper.appendChild(document.createElement("div"), null);
  newWrapper.classList.add("new-project-input-wrapper");

  const newTextInput = newWrapper.appendChild(document.createElement("input"));
  newTextInput.classList.add("new-project-text-input");

  const newConfirm = newWrapper.appendChild(document.createElement("button"));
  newConfirm.classList.add("checkmark");
  newConfirm.innerHTML = "✓";

  newConfirm.addEventListener("click", () => {
    if (newTextInput.value.trim() == "") {
      alert("Please enter a name for your new project.");
      return;
    }

    new ProjectArray(newTextInput.value.trim());
    appendNewProject(newTextInput.value.trim());
    newWrapper.remove();
    btnAddProject.style.display = "block";
  });
  btnAddProject.style.display = "none";
});

// Add new projects to the project list
function appendNewProject(newProjectName) {
  const newProjectWrapper = userProjectsListWrapper.appendChild(document.createElement("div"));
  newProjectWrapper.classList.add("user-project-wrapper");
  newProjectWrapper.addEventListener("click", () => {
    activeProject = newProjectName;
    drawTasksFromArray();
  });

  const newProject = newProjectWrapper.appendChild(document.createElement("input"));
  newProject.classList.add("user-project");
  newProject.type = "button";
  newProject.value = newProjectName;

  const newProjectDeleteBtn = newProjectWrapper.appendChild(document.createElement("button"));
  newProjectDeleteBtn.classList.add("user-project-delete");
  newProjectDeleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  newProjectDeleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevents conflict with wrapper click event
    delete myTasks[newProjectName];
    newProjectWrapper.remove();
    activeProject = "home";
    drawTasksFromArray();
  });
}
