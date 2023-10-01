document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            const timestamp = new Date().toLocaleString(); 
            listItem.innerHTML = `
                <span>${task}</span>
                <span class="timestamp">${timestamp}</span>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(listItem);

            const deleteButton = listItem.querySelector(".delete");
            deleteButton.addEventListener("click", function () {
                const indexToDelete = this.getAttribute("data-index");
                tasks.splice(indexToDelete, 1);
                saveTasks();
                renderTasks();
            });
        });
    }

    renderTasks();

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const timestamp = new Date().toLocaleString(); 
            const taskWithTimestamp = `${taskText} `;
            tasks.push(taskWithTimestamp);
            saveTasks();
            renderTasks();
            taskInput.value = "";
        }
    });

    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });
});
