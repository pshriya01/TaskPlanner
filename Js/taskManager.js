export let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

export function addTask(text) {
  tasks.push({ text, completed: false });
  saveTasks();
}

export function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

export function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

export function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
