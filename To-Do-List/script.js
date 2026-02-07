let input = document.querySelector("input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks")
let arrayOfTasks;



window.onload = ()=>{
     if(localStorage.getItem("tasks") != null){
        arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
     }else{
        arrayOfTasks = [];
     }
     displayTasks();
}

function checkInput(value){
    if(value === ""){
        alert("Error! Enter the task");
        return null;
    }
    return value;
}

add.addEventListener("click", ()=>{
    let inputValue = checkInput(input.value);
    if(inputValue === null) return;
    input.value = '';
    arrayOfTasks.push(inputValue);
    localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
    displayTasks();
})


function createTask(task,index){
         let li = document.createElement("li");
         li.classList.add("task");
         li.textContent = task;
         let span = document.createElement("span");
         span.textContent= "×";
         span.classList.add("remove");
         span.setAttribute("onclick", `removeTask(${index})`)
         li.appendChild(span)
        return li;
}

function displayTasks(){
    tasks.textContent = "";
    let fragment = document.createDocumentFragment();
    arrayOfTasks.forEach((task,index) => {
        fragment.appendChild(createTask(task,index));
    });
    tasks.appendChild(fragment);
}

function removeTask(index){
    arrayOfTasks.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
    displayTasks();
}

