"use strict";

let taskColumns;

window.onload = function () {
  taskColumns = document.querySelectorAll(".task-column");
  taskColumns.forEach((column) => {
    addTaskButton(column);
  });

  addDragListeners();
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
  var tasks = column.querySelector(".tasks");
  tasks.insertAdjacentHTML("beforeend", newTask);
}

// Drag&Drop
let dragged;
let currentColumn;

function addDragListeners() {
  document.addEventListener(
    "dragstart",
    function (event) {
      dragged = event.target;
      dragged.style.opacity = 0.5;
    },
    false
  );
  document.addEventListener(
    "dragend",
    function (event) {
      dragged.style.opacity = "";
    },
    false
  );
  document.addEventListener(
    "dragenter",
    function (event) {
      if (event.target.classList.contains("task-column")) {
        currentColumn = event.target;
        event.target.style.background = "purple";
      } else if (event.target.tagName === "BODY") {
        if (currentColumn != null) currentColumn.style.background = "";
      }
      // console.log(event.target.tagName);
    },
    false
  );
  document.addEventListener(
    "dragleave",
    function (event) {
      // if (event.target.classList.contains("task-column")) dragCounter--;
      // if (dragCounter === 0) event.target.style.background = "";
      // console.log(dragCounter);
    },
    false
  );
  document.addEventListener(
    "drop",
    function (event) {
      event.preventDefault();
      if (event.target.className == "task-column") {
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        event.target.querySelector(".tasks").appendChild(dragged);
      }
    },
    false
  );
  document.addEventListener(
    "dragover",
    function (event) {
      event.preventDefault();
    },
    false
  );
}
