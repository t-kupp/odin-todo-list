const btnHome = document.querySelector("#btn-default-home");
const btnToday = document.querySelector("#btn-default-today");
const btnWeek = document.querySelector("#btn-default-week");
const btnAddProject = document.querySelector("#btn-add-project");
const btnAddTask = document.querySelector("#btn-add-task");
const btnSubmitForm = document.querySelector("#input-submit");
const taskList = document.querySelector("#task-list");
const btnImportant = document.querySelector("#input-important");

let myTasks = [];

// Constructor to create new tasks and push them into the array
function Task(title, description, date, isImportant, isDone) {
  this.title = title;
  this.description = description;
  this.date = date;
  this.isImportant = isImportant;
  this.isDone = isDone;
  myTasks.push(this);
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

  title.value = "";
  description.value = "";
  date.value = "";
  btnImportant.classList.remove("toggled");
  isImportant = false;

  toggleTaskFormVisibility("hidden");

  drawTasksFromArray();
});

// Draw tasks from the array
function drawTasksFromArray() {
  taskList.innerHTML = "";

  for (let i = 0; i < myTasks.length; i++) {
    const newTaskWrapper = taskList.appendChild(document.createElement("div"));
    newTaskWrapper.classList.add("task-wrapper");

    const newLeftSide = newTaskWrapper.appendChild(document.createElement("div"));
    newLeftSide.classList.add("left-side");

    const newRightSide = newTaskWrapper.appendChild(document.createElement("div"));
    newRightSide.classList.add("right-side");

    const newTitle = newLeftSide.appendChild(document.createElement("p"));
    newTitle.textContent = myTasks[i].title;
    newTitle.classList.add("task-title");

    const newDescription = newLeftSide.appendChild(document.createElement("p"));
    newDescription.textContent = myTasks[i].description;
    newDescription.classList.add("task-description");

    const newImportant = newRightSide.appendChild(document.createElement("p"));
    newImportant.classList.add("task-important");
    if (myTasks[i].isImportant == true) {
      newImportant.textContent = "!!!";
    }

    const newDate = newRightSide.appendChild(document.createElement("p"));
    newDate.textContent = myTasks[i].date;
    newDate.classList.add("task-date");

    const newIsDone = newRightSide.appendChild(document.createElement("input"));
    newIsDone.type = "checkbox";
    newIsDone.checked = myTasks[i].isDone;
    newIsDone.classList.add("task-done");
    if (myTasks[i].isDone == true) newTaskWrapper.classList.add("task-completed");
    if (myTasks[i].isDone == false) newTaskWrapper.classList.remove("task-completed");
    newIsDone.addEventListener("click", () => {
      if (myTasks[i].isDone == false) {
        myTasks[i].isDone = true;
      } else {
        myTasks[i].isDone = false;
      }
      drawTasksFromArray();
    });

    const newDeleteButton = newRightSide.appendChild(document.createElement("input"));
    newDeleteButton.type = "button";
    newDeleteButton.value = "DEL";
    newDeleteButton.classList.add("task-delete");
    newDeleteButton.addEventListener("click", () => {
      myTasks.splice(i, 1);
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

// Add new projects
