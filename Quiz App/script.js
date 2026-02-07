let question = document.querySelector("#firstPage h2");
let checkBoxes = document.querySelectorAll(`input[name="question"]`);
let answerArea = document.querySelector(".answer-area");
let next = document.querySelector("#Next");
let nbrOfQuestions = document.querySelector(".tests-timer p span");
let minTimer = document.querySelector("#timer #minutes");
let secondTimer = document.querySelector("#timer #seconds");
let progress = document.querySelector(".progress");
let answers = document.querySelectorAll(".answer label")
let restart = document.getElementById("restart");
let secondPage = document.getElementById("secondPage");
let count;
let second;
let minute;
let nbrQuestionCorrect;

let arrayOfQuestions = [
    {
        id: 0,
        title: `1-What's your name?`,
        answer: ["Ahmed", "Mohamed", "Mohssin", "Nine"],
        correct: "Nine",
    },
    {
        id: 1,
        title: `2-What's your favorite Book?`,
        answer: ["griland", "How to improve your mindset", "learn how to talk", "learn how to be Nine"],
        correct: "learn how to be Nine",
    },
    {
        id: 2,
        title: `3-What's name's your father?`,
        answer: ["who", "me", "Mohss", "toNine"],
        correct: "toNine",
    },
    {
        id: 3,
        title: `4-What's your habit?`,
        answer: ["basketball", "video games", "soccer", "football"],
        correct: "football",
    },
    {
        id: 4,
        title: `5-kill yourself?`,
        answer: ["yes", "no", "why", "how"],
        correct: "why",
    }
]

window.addEventListener("onload", defaultStatus());
function defaultStatus(){
    count = 0;
    second = 0 ;
    minute = 1 ;
    minTimer.textContent = minute;
    secondTimer.textContent = second;
    nbrQuestionCorrect = 0;
    question.textContent = arrayOfQuestions[0].title;
    answers.forEach((el, index) => {
        el.textContent = arrayOfQuestions[0].answer[index]
    });
    progress.style.width = `${((count) / arrayOfQuestions.length) * 100}%`;
    nbrOfQuestions.textContent = (arrayOfQuestions.length);
}

function checkAnswer() {
    let reponse;
    checkBoxes.forEach(checkBox => {
        if (checkBox.checked) {
            reponse = checkBox.nextElementSibling;
        }else{
            checkBox.disabled=true;
        }     
    })
    if (reponse.textContent === arrayOfQuestions[count].correct) {
        reponse.parentElement.classList.add("correct");
        nbrQuestionCorrect++;
    } else {
        reponse.parentElement.classList.add("incorrect");
    }
    
    count++;
    return reponse;
}

function displayQuiz(reponse) {
    question.textContent = arrayOfQuestions[count].title;
    answers.forEach((el, index) => {
        el.textContent = arrayOfQuestions[count].answer[index]
    });
    progress.style.width = `${((count) / (arrayOfQuestions.length - 1)) * 100}%`;
    nbrOfQuestions.textContent = (arrayOfQuestions.length) - (count);
}

next.addEventListener("click", () => {
    next.disabled = true;
    let reponse = checkAnswer();
    setTimeout(() => {
        if (count < arrayOfQuestions.length) {
            displayQuiz(reponse);
        }

            reponse.parentElement.classList.remove("correct");
            reponse.parentElement.classList.remove("incorrect");
            next.disabled = false;
            checkBoxes.forEach(checkBox => {checkBox.disabled= false});

        if (count >= arrayOfQuestions.length) gameOver();
        
    }, 1000)

})

restart.addEventListener("click", () => {
    firstPage.style.display = "block";
    secondPage.style.display = "none";
    defaultStatus();
})

function gameOver(){
   
            firstPage.style.display = "none";
            secondPage.style.display = "block";


            let result = document.getElementById("result");
            let scoreValue = (nbrQuestionCorrect/arrayOfQuestions.length) * 100;
            
            if(scoreValue >= 90){
                  result.textContent = "Excellent";
            }else if(scoreValue  >= 70){
                  result.textContent = "Good";
            }else if(scoreValue  >= 50){
                  result.textContent = "Fair";
            }else if(scoreValue  >= 0){
                  result.textContent = "poor";
            }
            let score = document.querySelector("#score");
            score.textContent = `${scoreValue}%`;
}

function timer(){
   if((second === 0) && (minute != 0)){
      second=59;
      minute=0;
      minTimer.textContent = minute;
   }

    secondTimer.textContent = second;
    second--;

    if((second === 0)&& (minute === 0)){
     gameOver();
     return
   }
   setTimeout(timer, 1000);
}
timer()