"use strict";

window.onload = function () {
  let taskColumns = document.querySelectorAll(".task-column");
  taskColumns.forEach((column) => {
    addTaskButton(column);
  });
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
  let newTask = `<div class="task">
                    <p>${text}</p>
                  </div>`;
  column.querySelector(".tasks").insertAdjacentHTML("beforeend", newTask);
}
