const quizDb = [
  {
    question: "Q1 : What is the full form of HTML ?",
    a: "HyperText Mark Langauge",
    b: "Hyper Markup Langugae",
    c: "HyperText Markup Langauge",
    d: "Hello Markup Language",
    ans: "ans3",
  },
  {
    question: "Q2 : What is the full form of CSS ?",
    a: "Control Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Super Sheets",
    d: "Controlled Style Sever",
    ans: "ans2",
  },
  {
    question: "Q3 : Which tag is used as main heading in HTML ?",
    a: "h2",
    b: "h3",
    c: "h6",
    d: "h1",
    ans: "ans4",
  },
  {
    question: "Q4 : Which property is used to give space on top of content?",
    a: "margin-top",
    b: "margin-bottom",
    c: "padding-top",
    d: "padding-bottom",
    ans: "ans1",
  },
];

const question = document.querySelector(".question");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const submit = document.querySelector("#submit");

const answers = document.querySelectorAll(".answer");

const showScore = document.querySelector("#showScore");

let score = 0;

let questionCount = 0;

const loadQuestion = () => {
  const questionList = quizDb[questionCount];

  question.innerHTML = questionList.question;
  option1.innerHTML = questionList.a;
  option2.innerHTML = questionList.b;
  option3.innerHTML = questionList.c;
  option4.innerHTML = questionList.d;
};
loadQuestion();

const getAnswer = () => {
  answers.forEach((current) => {
    if (current.checked) {
      answer = current.id;
    }
  });
  return answer;
};

submit.addEventListener("click", () => {
  const checkedAnswer = getAnswer();
  console.log(checkedAnswer);

  if (checkedAnswer === quizDb[questionCount].ans) {
    score++;
    console.log(score);
  }

  questionCount = questionCount + 1;
  console.log(questionCount);

  if (questionCount < quizDb.length) {
    loadQuestion();
  } else {
    showScore.innerHTML = `
        <h4>Hey Congrats !!! You scored ${score} / ${quizDb.length}</h4>
        <button class="btn" onclick="location.reload()">Play Again</button>
    `;
    showScore.classList.remove("scoreArea");
  }
});
