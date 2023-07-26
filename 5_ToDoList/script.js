// SELECTORS:

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('#todo-filter');

// EVENT LISTENERS:
document.addEventListener('DOMContentLoaded', showlocalTasks);
todoButton.addEventListener('click',addTask); // Button click
todoList.addEventListener('click',clickedElement);
filterOption.addEventListener('click',todoFilter);

// FUNCTIONS:

function addTask(event){
    event.preventDefault(); // Prevent website refresh (form submitting)
    if(todoInput.value != ""){
        // ToDo DIV-BOX:
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-box');
        // INSIDE THE BOX ELEMENT
        const todoLi = document.createElement('li');
        todoLi.classList.add('todo-li-item');
        todoLi.innerText = todoInput.value;
        todoDiv.appendChild(todoLi);

        // ADD TASK TO LOCAL STORAGE:
        saveLocalTasks(todoInput.value)

        // SUBMIT BUTTON:
        const checkBtn = document.createElement('button');
        checkBtn.innerHTML = '<i class="fa fa-check-square"></i>';
        checkBtn.classList.add('check-button');
        todoDiv.appendChild(checkBtn);
    
        // DELETE BUTTON:
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fa fa-trash-o"></i>';
        deleteBtn.classList.add('delete-button');
        todoDiv.appendChild(deleteBtn);
    
        // APPEND ToDo DIV-BOX to LIST:
        todoList.appendChild(todoDiv);
    
        // CLEAR INPUT BAR VALUE:
        todoInput.value = "";
    }
}

// DELETE & CHECK ITEM:

function clickedElement(e){
    const item = e.target;
    console.log(item.classList[0])
    const todoElement = item.parentElement;
    switch(item.classList[0]){
        case 'delete-button':
            // DROP ELEMENT ANIMATION:
            todoElement.classList.add('DropAnimation');
            removelocalTask(todoElement);
            todoElement.addEventListener('transitionend',function(){
                todoElement.remove();
            });
            break;
        case 'check-button':
            todoElement.classList.toggle('todo-box-completed');
            break;
        default:
            break;
    }
}

// FILTER FUNCTION:

function todoFilter(e){
    const todoListFilters = todoList.childNodes;
    todoListFilters.forEach(function(todoElem){
        switch(e.target.value){
            case 'all':
                todoElem.style.display = 'flex';
                break;
            case 'completed':
                if(todoElem.classList.contains('todo-box-completed')){
                    todoElem.style.display = 'flex';
                }else{
                    todoElem.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todoElem.classList.contains('todo-box-completed')){
                    todoElem.style.display = 'flex';
                }else{
                    todoElem.style.display = 'none';
                }
                break;
            default:
                break;
        }
    });
}

// LOCAL STORAGE:

function saveLocalTasks(todoBox){
    // CHECK IF TASKS EXISTS:
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(todoBox);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function showlocalTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
                // ToDo DIV-BOX:
                const todoDiv = document.createElement('div');
                todoDiv.classList.add('todo-box');
                // INSIDE THE BOX ELEMENT
                const todoLi = document.createElement('li');
                todoLi.classList.add('todo-li-item');
                todoLi.innerText = task;
                todoDiv.appendChild(todoLi);
                // SUBMIT BUTTON:
                const checkBtn = document.createElement('button');
                checkBtn.innerHTML = '<i class="fa fa-check-square"></i>';
                checkBtn.classList.add('check-button');
                todoDiv.appendChild(checkBtn);
            
                // DELETE BUTTON:
                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '<i class="fa fa-trash-o"></i>';
                deleteBtn.classList.add('delete-button');
                todoDiv.appendChild(deleteBtn);
            
                // APPEND ToDo DIV-BOX to LIST:
                todoList.appendChild(todoDiv);
    });
}

function removelocalTask(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}