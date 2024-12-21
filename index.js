// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const todoList = document.getElementById('todoList');

// Initial tasks array, empty by default
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

// Function to render the task list
function renderTasks() {
  todoList.innerHTML = ''; // Clear current list
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item', 'todo-item');
    taskItem.dataset.index = index ;

    // Create task text element
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add('completed');
    } 

    // Create Edit button
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-warning', 'btn-sm');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(index));

    // Create Complete button
    const completeButton = document.createElement('button');
    completeButton.classList.add('btn', 'btn-success', 'btn-sm');
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.addEventListener('click', () => toggleComplete(index));

    // Create Delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));

    taskItem.append(taskText, editButton, completeButton, deleteButton);
    todoList.appendChild(taskItem);
} )};

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = ''; // Clear input field
    renderTasks(); // Re-render task list
  }
}

// Function to toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Function to edit a task
function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Event listener for adding task
addTaskButton.addEventListener('click', addTask);

// Event listener for pressing Enter to add task
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});



// Initial rendering of the task list
renderTasks();
