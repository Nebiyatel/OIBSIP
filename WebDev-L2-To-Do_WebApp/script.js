// =========================================
// GET HTML ELEMENTS
// =========================================

const taskForm = document.getElementById("task-form");

const taskInput = document.getElementById("task-input");

const pendingList = document.getElementById("pending-list");

const completedList = document.getElementById("completed-list");

const pendingCount = document.getElementById("pending-count");

const completedCount = document.getElementById("completed-count");

const pendingEmpty = document.getElementById("pending-empty");

const completedEmpty = document.getElementById("completed-empty");

const inputError = document.getElementById("input-error");


// =========================================
// LOAD TASKS FROM LOCAL STORAGE
// =========================================

let tasks = JSON.parse(
    localStorage.getItem("todoTasks")
) || [];


// =========================================
// SAVE TASKS
// =========================================

function saveTasks() {

    localStorage.setItem(
        "todoTasks",
        JSON.stringify(tasks)
    );
}


// =========================================
// GENERATE TASK ID
// =========================================

function generateId() {

    return Date.now().toString() +
           Math.random().toString(16).slice(2);
}


// =========================================
// FORMAT DATE
// =========================================

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleString();
}


// =========================================
// ADD NEW TASK
// =========================================

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskText = taskInput.value.trim();


    // Check empty input

    if (taskText === "") {

        inputError.textContent =
            "Please enter a task.";

        taskInput.focus();

        return;
    }


    // Clear error

    inputError.textContent = "";


    // Create task object

    const newTask = {

        id: generateId(),

        text: taskText,

        completed: false,

        createdAt: new Date().toISOString(),

        completedAt: null

    };


    // Add task

    tasks.push(newTask);


    // Save

    saveTasks();


    // Clear input

    taskInput.value = "";


    // Display

    renderTasks();

});


// =========================================
// RENDER ALL TASKS
// =========================================

function renderTasks() {

    // Clear current lists

    pendingList.innerHTML = "";

    completedList.innerHTML = "";


    // Separate tasks

    const pendingTasks = tasks.filter(
        function(task) {
            return !task.completed;
        }
    );

    const completedTasks = tasks.filter(
        function(task) {
            return task.completed;
        }
    );


    // Update counts

    pendingCount.textContent =
        pendingTasks.length + " pending";

    completedCount.textContent =
        completedTasks.length + " completed";


    // Empty states

    if (pendingTasks.length === 0) {

        pendingEmpty.style.display = "block";

    } else {

        pendingEmpty.style.display = "none";
    }


    if (completedTasks.length === 0) {

        completedEmpty.style.display = "block";

    } else {

        completedEmpty.style.display = "none";
    }


    // Create pending tasks

    pendingTasks.forEach(function(task) {

        const taskElement =
            createTaskElement(task);

        pendingList.appendChild(taskElement);

    });


    // Create completed tasks

    completedTasks.forEach(function(task) {

        const taskElement =
            createTaskElement(task);

        completedList.appendChild(taskElement);

    });

}


// =========================================
// CREATE TASK ELEMENT
// =========================================

function createTaskElement(task) {

    // Main task container

    const taskItem =
        document.createElement("div");

    taskItem.classList.add("task-item");


    if (task.completed) {taskItem.classList.add("completed-task");
    }


    // Task content

    const taskContent =
        document.createElement("div");

    taskContent.classList.add("task-content");


    // Task text

    const taskText =
        document.createElement("p");

    taskText.classList.add("task-text");

    taskText.textContent = task.text;


    // Timestamp

    const taskTime =
        document.createElement("p");

    taskTime.classList.add("task-time");


    if (task.completed && task.completedAt) {

        taskTime.textContent =
            "Added: " +
            formatDate(task.createdAt) +
            " • Completed: " +
            formatDate(task.completedAt);

    } else {

        taskTime.textContent =
            "Added: " +
            formatDate(task.createdAt);
    }


    taskContent.appendChild(taskText);

    taskContent.appendChild(taskTime);


    // Buttons container

    const actions =
        document.createElement("div");

    actions.classList.add("task-actions");


    // Complete button

    const completeButton =
        document.createElement("button");

    completeButton.classList.add(
        "task-button",
        "complete-button"
    );


    if (task.completed) {

        completeButton.textContent =
            "Mark Pending";

    } else {

        completeButton.textContent =
            "Mark Complete";
    }


    completeButton.addEventListener(
        "click",
        function() {

            toggleComplete(task.id);

        }
    );


    // Edit button

    const editButton =
        document.createElement("button");

    editButton.classList.add(
        "task-button",
        "edit-button"
    );

    editButton.textContent = "Edit";


    editButton.addEventListener(
        "click",
        function() {

            editTask(task.id);

        }
    );


    // Delete button

    const deleteButton =
        document.createElement("button");

    deleteButton.classList.add(
        "task-button",
        "delete-button"
    );

    deleteButton.textContent = "Delete";


    deleteButton.addEventListener(
        "click",
        function() {

            deleteTask(task.id);

        }
    );


    // Add buttons

    actions.appendChild(completeButton);

    actions.appendChild(editButton);

    actions.appendChild(deleteButton);


    // Add everything to task

    taskItem.appendChild(taskContent);

    taskItem.appendChild(actions);


    return taskItem;
}


// =========================================
// MARK TASK COMPLETE / PENDING
// =========================================

function toggleComplete(taskId) {

    const task =
        tasks.find(function(item) {

            return item.id === taskId;

        });


    if (!task) {
        return;
    }


    task.completed =
        !task.completed;


    if (task.completed) {

        task.completedAt =
            new Date().toISOString();

    } else {

        task.completedAt = null;
    }


    saveTasks();

    renderTasks();
}


// =========================================
// EDIT TASK
// =========================================

function editTask(taskId) {

    const task =
        tasks.find(function(item) {

            return item.id === taskId;

        });


    if (!task) {
        return;
    }


    // Find the task element

    const taskElements =
        document.querySelectorAll(".task-item");


    let selectedElement = null;


    taskElements.forEach(function(element) {

        const textElement =
            element.querySelector(".task-text");

        if (
            textElement &&
            textElement.textContent === task.text
        ) {

            selectedElement = element;

        }

    });


    if (!selectedElement) {
        return;
    }


    // Create input

    const editInput =
        document.createElement("input");

    editInput.type = "text";

    editInput.value = task.text;

    editInput.classList.add("edit-input");


    // Replace text with inputconst textElement =
        selectedElement.querySelector(
            ".task-text"
        );

    textElement.replaceWith(editInput);


    editInput.focus();

    editInput.select();


    // Change Edit button to Save

    const editButton =
        selectedElement.querySelector(
            ".edit-button"
        );

    editButton.textContent = "Save";


    // Save function

    function saveEdit() {

        const newText =
            editInput.value.trim();


        if (newText === "") {

            alert("Task cannot be empty.");

            editInput.focus();

            return;
        }


        task.text = newText;

        saveTasks();

        renderTasks();
    }


    // Save when button clicked

    editButton.onclick = saveEdit;


    // Save with Enter

    editInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                saveEdit();

            }

            if (event.key === "Escape") {

                renderTasks();

            }

        }
    );
}


// =========================================
// DELETE TASK
// =========================================

function deleteTask(taskId) {

    const task =
        tasks.find(function(item) {

            return item.id === taskId;

        });


    if (!task) {
        return;
    }


    const confirmed =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmed) {
        return;
    }


    tasks =
        tasks.filter(function(item) {

            return item.id !== taskId;

        });


    saveTasks();

    renderTasks();
}


// =========================================
// INITIAL DISPLAY
// =========================================

renderTasks();