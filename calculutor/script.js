let container = document.querySelector(".container");
let display = document.querySelector(".display-area");




container.addEventListener("click", e=>{
    if(e.target.nodeName == 'BUTTON'){
        switch(e.target.textContent){
            case 'C':
                clear();
                break;
            case 'Del':
                deleteLastIndex();
                break;
            case '=':
                evaluation();
                break;
            default: addToDisplay(e.target.textContent)
        }
    }
})


function clear(){
    display.textContent = "";
}

function deleteLastIndex(){
    let value = display.textContent.substring(0,display.textContent.length-1);
    display.textContent = value;
}

function addToDisplay(value){
    display.textContent += value;
}

function evaluation(){
    try{
        display.textContent = eval(display.textContent);
    }catch(error){
        display.textContent = 'Invalid Operation';
    }
}

















