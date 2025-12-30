let todo = document.querySelector('#todo')
let progress = document.querySelector('#progress')
let done = document.querySelector('#done')
let task  = document.querySelector('.task')

let dragTask = null;

task.addEventListener('dragstart', () => {
      dragTask = task
  })

function dragOnEvent(column){

    column.addEventListener('dragover', (e) => {
        e.preventDefault() 
        column.classList.add('hover-over')
    })

    column.addEventListener('dragenter',(e)=>{
        e.preventDefault()
       column.classList.add('hover-over')
        
    })
    column.addEventListener('dragleave',(e)=>{      
         e.preventDefault()
        column.classList.remove('hover-over')
    })

    column.addEventListener('drop', () => {
          column.classList.remove('hover-over')
          column.appendChild(dragTask)
      })
}

dragOnEvent(done);
dragOnEvent(progress);
dragOnEvent(todo);