"use strict";

window.onload = function () {
  document
    .querySelector(".add-task-button")
    .addEventListener("click", function () {
      let taskText = document.querySelector(".task-text");
      if (!taskText.classList.contains("hiden")) {
        document.querySelector(".task-text").className += " hiden";
      } else {
        document.querySelector(".task-text").className = "task-text";
      }
    });
};

//   "click",
//   function () {
//     document.querySelector(".task-text").className += "hiden";
//     console.log("hello");
//   },
//   false
// );
