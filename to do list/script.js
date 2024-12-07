const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filter = document.getElementById('filter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(filterType) {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        if (filterType === 'completed' && !task.completed) return;
        if (filterType === 'incomplete' && task.completed) return;

        const li = document.createElement('li');
        li.className = 'task';
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div>
                <button onclick="toggleComplete(${index})">✔️</button>
                <button onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks(filter.value);
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks(filter.value);
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks(filter.value);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', addTask);
filter.addEventListener('change', () => renderTasks(filter.value));

// Initial render
renderTasks('all');