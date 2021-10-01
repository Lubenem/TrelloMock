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
      let closestColumn = event.target.closest(".task-column");

      if (closestColumn) {
        SetDragColumn(closestColumn);
      } else {
        SetDragColumn(null);
      }
    },
    false
  );
  document.addEventListener(
    "drop",
    function (event) {
      event.preventDefault();
      if (currentColumn) {
        dragged.parentNode.removeChild(dragged);
        currentColumn.querySelector(".tasks").appendChild(dragged);
        SetDragColumn(null);
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

function SetDragColumn(column) {
  if (currentColumn === column) return;
  if (currentColumn) currentColumn.style.background = "";
  currentColumn = column;
  if (currentColumn) column.style.background = "purple";
}
