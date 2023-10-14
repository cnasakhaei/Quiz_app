import formatData from "./helper.js";

const level = localStorage.getItem("level");

const loader = document.querySelector("#loader");
const container = document.querySelector("#container");
const questionText = document.querySelector("#question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.querySelector("#score");
const nextButton = document.getElementById("next-button");
const questionNumber = document.getElementById("question-number");
const finishButton = document.getElementById("finish-button");
const error = document.getElementById("error");

const CORRECT_BONUS = 10;
const URL = `https://opentdb.com/api.php?amount=10&type=multiple${
  level ? `&difficulty=${level}` : ""
}`;

let formattedData = null;
let questionIndex = 0;
let correctAnswers = null;
let score = 0;
let isAccepted = true;

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    formattedData = formatData(json.results);
    start();
  } catch (err) {
    loader.style.display = "none";
    error.style.display = "block";
  }
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  questionNumber.innerText = questionIndex + 1;
  const { question, answers, correctAnswerindex } =
    formattedData[questionIndex];
  correctAnswers = correctAnswerindex;
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;
  const isCorrect = index === correctAnswers ? true : false;
  if (isCorrect) {
    answerList[correctAnswers].classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswers].classList.add("correct");
  }
};

const nextHandler = () => {
  questionIndex++;
  if (questionIndex < formattedData.length) {
    isAccepted = true;
    removeClasse();
    showQuestion();
  } else {
    finishHandler();
  }
};

const removeClasse = () => {
  answerList.forEach((button) => (button.className = "answer-text"));
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("/end.html");
};

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
