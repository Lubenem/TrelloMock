"use strict";
let tasks;
let dragSrcEl;

window.onload = function () {
  let taskColumns = document.querySelectorAll(".task-column");
  taskColumns.forEach((column) => {
    addTaskButton(column);
  });

  tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => addDragListeners(task));
};

function addTaskButton(column) {
  column
    .querySelector(".add-task-button")
    .addEventListener("click", function () {
      let taskText = column.querySelector(".task-text");
      if (!taskText.classList.contains("hiden")) {
        taskText.className += " hiden";
        addTask(column, taskText.value);
      } else {
        taskText.className = "task-text";
        taskText.value = "";
        taskText.focus();
      }
    });
}

function addTask(column, text) {
  if (text === "") return;
  let newTask = `<div draggable="true" class="task">
                    <p>${text}</p>
                  </div>`;
  let tasks = column.querySelector(".tasks");
  tasks.insertAdjacentHTML("beforeend", newTask);
  addDragListeners(tasks.lastChild);
}

// Drag&Drop
function addDragListeners(task) {
  task.addEventListener("dragstart", function (task) {
    this.style.opacity = "0.4";
    dragSrcEl = this;
    task.dataTransfer.effectAllowed = "move";
    task.dataTransfer.setData("text/html", this.innerHTML);
  });
  task.addEventListener("dragend", function (task) {
    this.style.opacity = "1";
    tasks.forEach(function (task) {
      task.classList.remove("drag-over");
    });
  });
  task.addEventListener("dragenter", function (task) {
    this.classList.add("drag-over");
  });
  task.addEventListener("dragleave", function (task) {
    this.classList.remove("drag-over");
  });
  task.addEventListener("drop", function (task) {
    task.stopPropagation();
    if (dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = task.dataTransfer.getData("text/html");
    }
    return false;
  });
  task.addEventListener("dragover", function (task) {
    if (task.preventDefault) {
      task.preventDefault();
    }
    return false;
  });
}
