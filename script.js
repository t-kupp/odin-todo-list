const btnToday = document.querySelector("#btn-default-today");
const btnWeek = document.querySelector("#btn-default-week");

const btnAddTask = document.querySelector("#btn-add-task");
const btnSubmitForm = document.querySelector("#input-submit");
const taskList = document.querySelector("#task-list");
const btnImportant = document.querySelector("#input-important");

let activeProjectID = 0;

let myTasks = [];
let myProjects = [];

// push new project array
function newProjectArray() {
  myTasks.push(new Array());
}

newProjectArray();

// Constructor to create new tasks and push them into the array
class Task {
  constructor(title, description, date, isImportant, isDone) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.isImportant = isImportant;
    this.isDone = isDone;
    myTasks[activeProjectID].push(this);
  }
}

// Example task
new Task(
  "Finish the To-Do List", //title
  "Complete this project to advance to the next part of the curriculum.", //description
  "2023-07-01", //date
  true, //isImportant
  false //isDone
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

  new Task(title.value.trim(), description.value.trim(), date.value, isImportant, false);

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

  for (let i = 0; i < myTasks[activeProjectID].length; i++) {
    const newTaskWrapper = taskList.appendChild(document.createElement("div"));
    newTaskWrapper.classList.add("task-wrapper");

    const newLeftSide = newTaskWrapper.appendChild(document.createElement("div"));
    newLeftSide.classList.add("left-side");

    const newRightSide = newTaskWrapper.appendChild(document.createElement("div"));
    newRightSide.classList.add("right-side");

    const newTitle = newLeftSide.appendChild(document.createElement("p"));
    newTitle.textContent = myTasks[activeProjectID][i].title;
    newTitle.classList.add("task-title");

    const newDescription = newLeftSide.appendChild(document.createElement("p"));
    newDescription.textContent = myTasks[activeProjectID][i].description;
    newDescription.classList.add("task-description");

    const newImportant = newRightSide.appendChild(document.createElement("p"));
    newImportant.classList.add("task-important");
    if (myTasks[activeProjectID][i].isImportant == true) {
      newImportant.textContent = "!!!";
    }

    const newDate = newRightSide.appendChild(document.createElement("p"));
    newDate.textContent = myTasks[activeProjectID][i].date;
    newDate.classList.add("task-date");

    const newIsDone = newRightSide.appendChild(document.createElement("input"));
    newIsDone.type = "checkbox";
    newIsDone.name = "checkbox";
    newIsDone.checked = myTasks[activeProjectID][i].isDone;
    newIsDone.classList.add("task-done");
    if (myTasks[activeProjectID][i].isDone == true) newTaskWrapper.classList.add("task-completed");
    if (myTasks[activeProjectID][i].isDone == false)
      newTaskWrapper.classList.remove("task-completed");
    newIsDone.addEventListener("click", () => {
      if (myTasks[activeProjectID][i].isDone == false) {
        myTasks[activeProjectID][i].isDone = true;
      } else {
        myTasks[activeProjectID][i].isDone = false;
      }
      drawTasksFromArray();
    });

    const newDeleteButton = newRightSide.appendChild(document.createElement("input"));
    newDeleteButton.type = "button";
    newDeleteButton.value = "DEL";
    newDeleteButton.classList.add("task-delete");
    newDeleteButton.addEventListener("click", () => {
      myTasks[activeProjectID].splice(i, 1);
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
const btnHome = document.querySelector("#btn-default-home");
btnHome.addEventListener("click", () => {
  activeProjectID = 0;
  drawTasksFromArray();
});

// Add Project button
const btnAddProject = document.querySelector("#btn-add-project");
btnAddProject.addEventListener("click", () => {
  const newInputField = btnAddProject.appendChild(document.createElement("input"));
  newInputField.classList.add("newProjectInput");

  // add confirm button
  // put input and confirm in a flex wrapper so they are side by side
});
