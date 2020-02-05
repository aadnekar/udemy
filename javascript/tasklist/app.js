// Define UI Vars
const form = document.querySelector(`#task-form`);
const taskList = document.querySelector(`.collection`);
const clearBtn = document.querySelector(`.clear-tasks`);
const filter = document.querySelector(`#filter`);
const taskInput = document.querySelector(`#task`);

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear all tasks event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        console.log(tasks)
    }

    tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const delLink = document.createElement('a');
        // Add class
        delLink.className = 'delete-item secondary-content';
        // Add icon html
        delLink.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(delLink);
        //Append li to the ul
        taskList.appendChild(li);
    })
}


// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const delLink = document.createElement('a');
    // Add class
    delLink.className = 'delete-item secondary-content';
    // Add icon html
    delLink.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(delLink);
    //Append li to the ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    // Prevents the DOM form reloading
    e.preventDefault();
}

// Store Task in Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove Task from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, index);
        }
    });

    // Clear tasks from Local Storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks from local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Clear Tasks
function clearTasks() {
    // taskList.innerHtml = '';

    // Faster
    if(confirm('Are you sure you want to delete all tasks?')) {
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        clearTasksFromLocalStorage();
    }
}


// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

}





