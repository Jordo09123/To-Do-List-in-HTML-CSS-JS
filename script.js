const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// function so that we can track how many completed and uncompleted tasks we have
function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

// popup box will tell user to add a task if they didnt "add" one but clicked "add"
function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please write down a task!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class = "delete-btn">Delete</span>
        `;

    listContainer.appendChild(li);

    //clear the input field when user enters task
    inputBox.value = "";

    // variables for elements used 
    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    // check box for when task is finished
    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
        // call the update function
        updateCounters();
    });

    // button to edit tasks
    editBtn.addEventListener("click", function (){
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null) {
            taskSpan.textContent = update;
            li.classList.remove("completed");
            // call update function
            checkbox.checked = false;
            updateCounters();
        }
    });

    // button to delete tasks
    deleteBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task?")) {
            li.remove();
            updateCounters();
        }
    });
}