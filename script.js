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
    updateAllCount()
    saveBoard()
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
updateAllCount()
saveBoard()

})



let count = document.querySelector('.heading .count')

let taskarr = [todo,progress,done]
taskarr.forEach(t=>{
     
})

function updateCount(column){
  let countE1 = column.querySelector('.count')
  let tasks = column.querySelectorAll('.task')
  countE1.innerText = tasks.length
}

function updateAllCount(){
  updateCount(todo)
  updateCount(progress)
  updateCount(done)
}

function saveBoard() {
  let boardData = {
    todo: [],
    progress: [],
    done: []
  };

  [todo, progress, done].forEach(column => {
    let columnId = column.id;
    let tasks = column.querySelectorAll('.task');

    tasks.forEach(task => {
      let titleEl = task.querySelector('h2');
      let descEl  = task.querySelector('.desc');

      if (!titleEl || !descEl) return;

      boardData[columnId].push({
        title: titleEl.innerText,
        desc: descEl.innerText
      });
    });
  });

  localStorage.setItem('KanbanBoard', JSON.stringify(boardData));
}



function loadBoard(){
  let data = JSON.parse(localStorage.getItem('KanbanBoard'))
  if(!data) return;

  //clear existing task
  [todo,progress,done].forEach(col=>{
    col.querySelectorAll('.task').forEach(task=>task.remove())
  })

  Object.keys(data).forEach(columnId=>{
    let column = document.querySelector(`#${columnId}`)

    data[columnId].forEach(taskData=>{
      let div = document.createElement('div');
      div.classList.add('task');
      div.setAttribute('draggable', 'true');

      div.innerHTML = `
        <div class="task-box">
          <h2>${taskData.title}</h2>
          <div class="desc">${taskData.desc}</div>
        </div>
        <button class="delete">Delete</button>
      `;

      // attach drag again
      div.addEventListener('dragstart', () => {
        dragTask = div;
      });

      column.appendChild(div);
    })
  })
  updateAllCount()
}

loadBoard();


//delete logic
function enableDelete(column) {
  column.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      let task = e.target.closest('.task');
      task.remove();

      updateAllCount();
      saveBoard();
    }
  });
}

enableDelete(todo);
enableDelete(progress);
enableDelete(done);
