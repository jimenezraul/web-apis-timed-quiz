// Set all the variable to the elements
var startBox = document.querySelector(".start-quiz");
var quizBox = document.querySelector(".quiz-box");
var start_btn = document.getElementById("start");
var questionTitle = document.querySelector(".question");
var answer = document.querySelector(".answers");
var questionCount = 0;
var resultShow = document.querySelector(".result");

// Selected answer
var selectedAnswer = function(e, answer) {
  console.log(e.target.getAttribute("value") === answer)
}

// Show question to the page
var showQuestion = function (question) {
  questionTitle.innerHTML = "<h1>" + question.question + "</h1>";
  var olEl = document.createElement("ul");
  for (var i = 0; i < question.options.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = i + 1 + ". " + question.options[i];
    liEl.setAttribute("class", "answer");
    liEl.setAttribute("value", question.options[i])
    liEl.addEventListener("click", function(e){ selectedAnswer(e, question.answer)})
    olEl.appendChild(liEl);
  }
  answer.appendChild(olEl);
};

// Reset question card and set the next question
var nextQuestions = function () {
  resetEl();
  showQuestion(questions[questionCount]);
  questionCount++;
};

// Start the quiz
var start_quiz = function () {
  startBox.classList.add("hide");
  quizBox.classList.remove("hide");
  shuffledQuestion = Math.random() - 0.5;
  console.log(shuffledQuestion);
  nextQuestions();
};

// Reset all the elements inside the question card
var resetEl = function () {
  while (answer.firstChild) {
    answer.removeChild(answer.firstChild);
  }
};

// Questions array
const questions = [
  {
    question: "This is an example",
    answer: "Example 3",
    options: ["Example 1", "Example 2", "Example 3", "Example 4"],
  },
];

// Start button
start_btn.addEventListener("click", start_quiz);
