let todo = document.querySelector("#todo");
let progress = document.querySelector("#progress");
let done = document.querySelector("#done");
let tasks = document.querySelectorAll(".task");

//drag and dropping of task

let dragTask = null;

tasks.forEach(task => {
  task.addEventListener("dragstart", () => {
    dragTask = task;
  });
});

function dragOnEvent(column) {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });

  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });
  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  });

  column.addEventListener("drop", () => {
    column.classList.remove("hover-over");
    column.appendChild(dragTask);
  });
}

dragOnEvent(done);
dragOnEvent(progress);
dragOnEvent(todo);

let modal = document.querySelector(".modal");
let newTask = document.querySelector(".newTask");
let addTaskbtn = document.querySelector(".add-task-btn");
let bg = document.querySelector(".bg");
let addnewtaskbtn =  document.querySelector("#addtask");

addTaskbtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

bg.addEventListener("dblclick", () => {
  modal.style.display = "none";
});



addnewtaskbtn.addEventListener('click',()=>{
   let div = document.createElement("div");
div.setAttribute("draggable", "true");
div.classList.add('task')

let taskTitle = document.querySelector('#title').value
console.log(taskTitle)
let taskDesc = document.querySelector('#description').value

div.innerHTML = `
                   <div class="task-box">
                        <h2>${taskTitle}</h2>
                    <div class="desc">${taskDesc}</div>
                    </div>
                    <button class="delete">Delete</button>
`;

  div.addEventListener("dragstart", () => {
    dragTask = div;
  });

todo.appendChild(div)
modal.style.display = "none";

})
