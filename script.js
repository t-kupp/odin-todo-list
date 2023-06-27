const btnHome = document.querySelector("#btn-default-home");
const btnToday = document.querySelector("#btn-default-today");
const btnWeek = document.querySelector("#btn-default-week");
const btnAddProject = document.querySelector("#btn-add-project");
const btnAddTask = document.querySelector("#btn-add-task");

// Array to store the tasks in
let taskList = [];

// Constructor to create new tasks and push them into the array
function Task(title, description, project, date, isImportant, isDone) {
  this.title = title;
  this.description = description;
  this.project = project;
  this.date = date;
  this.isImportant = isImportant;
  this.isDone = isDone;
  taskList.push(this);
}

new Task(
  "Finish the To-Do List", //title
  "Complete this project to advance to the next part of the curriculum.", //description
  "home", //project folder
  "", //date
  true, //isImportant
  false //isDone
);

// Functionality for the 'Add Task' button
btnAddTask.addEventListener("click", () => {
  openNewTaskForm();
});

function openNewTaskForm() {
  const formWrapper = document.querySelector("#form-wrapper");

  formWrapper.style.visibility = "visible";

  formWrapper.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target == formWrapper) {
      formWrapper.style.visibility = "hidden";
    }
  });
}
