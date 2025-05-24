// main.js
import { tasks, addTask, deleteTask, toggleTask } from "./taskManager.js";
import { debounce, throttle } from "./utils.js";

const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task");
const searchInput = document.getElementById("search-task");
const clearAllBtn = document.getElementById("clear-all");
const backToTopBtn = document.getElementById("back-to-top");

// Render tasks
function renderTasks(filter = "") {
  taskList.innerHTML = "";
  const filtered = tasks.filter((task) =>
    task.text.toLowerCase().includes(filter.toLowerCase())
  );
  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">${task.text}</span>
      <div>
        <input type="checkbox" ${
          task.completed ? "checked" : ""
        } data-index="${index}" />
        <button data-index="${index}">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  clearAllBtn.hidden = tasks.length === 0;
}

// Add task
addTaskBtn.addEventListener("click", () => {
  if (newTaskInput.value.trim()) {
    addTask(newTaskInput.value.trim());
    newTaskInput.value = "";
    renderTasks();
  }
});

// Toggle or delete task
taskList.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (e.target.tagName === "INPUT") {
    toggleTask(index);
  } else if (e.target.tagName === "BUTTON") {
    deleteTask(index);
  }
  renderTasks(searchInput.value);
});

// Search (debounced)
searchInput.addEventListener(
  "input",
  debounce(() => {
    renderTasks(searchInput.value);
  }, 300)
);

// Clear All
clearAllBtn.addEventListener("click", () => {
  if (confirm("Clear all tasks?")) {
    localStorage.clear();
    tasks.length = 0;
    renderTasks();
  }
});

// Back to Top (throttled)
window.addEventListener(
  "scroll",
  throttle(() => {
    backToTopBtn.hidden = window.scrollY < 100;
  }, 200)
);

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Initial render
renderTasks();
