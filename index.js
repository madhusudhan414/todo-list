
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const todoList = document.getElementById('todoList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };


function renderTasks() {
  todoList.innerHTML = ''; 
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item', 'todo-item');
    taskItem.dataset.index = index ;

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add('completed');
    } 


    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-warning', 'btn-sm');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(index));

 
    const completeButton = document.createElement('button');
    completeButton.classList.add('btn', 'btn-success', 'btn-sm');
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.addEventListener('click', () => toggleComplete(index));

   
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));

    taskItem.append(taskText, editButton, completeButton, deleteButton);
    todoList.appendChild(taskItem);
} )};

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = ''; 
    renderTasks(); 
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addTaskButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});


renderTasks();
