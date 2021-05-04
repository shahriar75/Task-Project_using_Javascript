let from=document.querySelector('#task_form');
let taskInput=document.querySelector('#new_task');
let taskFilter=document.querySelector('#task_filter');
let taskList=document.querySelector('ul');
let taskClear=document.querySelector('#clear_task');

// Add event listener

from.addEventListener('submit',addTask);
taskList.addEventListener('click',removeTask);
taskClear.addEventListener('click',clearTask);
taskFilter.addEventListener('keyup',filterTask);

// Reload daor por o value local stroge theka browser a show koranor jonno

document.addEventListener('DOMContentLoaded',getTasks);


// function of eventListener
// Add Task
function addTask(e){
    e.preventDefault(); // ata daor jonno ager theka set haoa default value kaj korbe na
    if(taskInput.value===''){
        alert('Add a Task!');
    }
    else{
        // create li element
        let li=document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "
        ));
        let link=document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML='x';
        li.appendChild(link);
        taskList.appendChild(li);
        // local stroage a input task add korte
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value=" ";
        
        
    }
}
// remove task

function removeTask(e){
    if(e.target.hasAttribute('href')){
        if(confirm ('Are you sure?')){
            let ele=e.target.parentElement;
            ele.remove();
            // Local Stroage theka remove korte
            removeFromLS(ele);
            
        }
        
    }
}
// clear task

function clearTask(e){
    taskList.innerHTML=' ';
    localStorage.clear(); // Local stroage theka sob kicu clear korte
}

 

// Filter Task
function filterTask(e){
    let text=e.target.value.toLowerCase(); // user input
    document.querySelectorAll('li').forEach(function(task){
        let item=task.firstChild.textContent;// task nibe
        if(item.toLowerCase().indexOf(text)!=-1) //true
        {
           task.style.display='block';
        }
        else{ task.style.display='none';
        }
    });
}

// Store in Local Stroage

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){ // local storage a check korbe task na theake faka array dibe
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks')); // jodi task pay seta k json obejct a dibe
    }
    tasks.push(task);  // new task add hobe

    localStorage.setItem('tasks', JSON.stringify(tasks)); // new task a ke local storage a add korbe
}

// getTasks

function getTasks(){
    // from store in local stroage
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        // from addTask Function
        let li=document.createElement('li');
        li.appendChild(document.createTextNode(task + " "
        ));
        let link=document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML='x';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

// remove task from Local Storage

function removeFromLS(taskItem){
    // from store in local stroage
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    let li = taskItem;
    li.removeChild(li.lastChild); //<a>x</a> ei item ta remove hoa jabe karon ata local stroage a ni

    tasks.forEach(function(task, index){ // local stroage er upore
      if(li.textContent.trim()===task){
          tasks.splice(index, 1);  // task ke remove korbe
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}