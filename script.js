const question = document.getElementById("question");
const choices = Array.from( document.getElementsByClassName("choice-text") );
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const reStart = document.getElementById("again");


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
fetch("https://opentdb.com/api.php?amount=10&category=21&type=multiple")
.then(res => {
    return res.json();
})
.then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map( loadedQuestion => {
        const formattedQuestion = {
            question: loadedQuestion.question
        };
        
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(
            formattedQuestion.answer - 1,
            0,
            loadedQuestion.correct_answer
        );
        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice;
        });
        return formattedQuestion;
    });
    
    startGame();
})
.catch(err => {
    console.log(err);
});


const MAX_QUESTIONS = 10;
const CORRECT_BONUS = 1;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
} 

getNewQuestion = () =>{

    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {

        const result = score;
        document.getElementById('result').textContent = `Your Score is ${result} / 10` 
    
            let a = document.createElement('a');
            let linkText = document.createTextNode("Restart");
            a.appendChild(linkText);
            a.title = "my title text";
            a.href = "index.html";
            document.body.appendChild(a);
    }


    questionCounter++;
    questionCounterText.innerText = (questionCounter - 1) + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice =>{
    choice.addEventListener("click", e => {
        if(!acceptingAnswers)return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const  selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};
