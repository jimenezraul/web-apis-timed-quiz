// Set all the variable to the elements
var startBox = document.querySelector(".start-quiz");
var quizBox = document.querySelector(".quiz-box");
var initialsBox = document.querySelector(".initials-box");
var start_btn = document.getElementById("start");
var questionTitle = document.querySelector(".question");
var answer = document.querySelector(".answers");
var finalScoreEl = document.querySelector("#final-score");
var resultShow = document.querySelector(".result");
var timerEl = document.querySelector("#timer");
var submitBtn = document.querySelector("#submit");
var questionCount = 0;
var startTime = 70;
var penalize = 0;
var score = 0;

//End quiz
var endQuiz = function () {
  quizBox.classList.add("hide");
  initialsBox.classList.remove("hide");
  finalScoreEl.textContent = score;
};

// Quiz timer
var timer = function () {
  var timerstart = setInterval(function () {
    startTime--;
    if (penalize > 0) {
      startTime = startTime - penalize;
    }
    if (initialsBox.classList.contains("hide")) {
      timerEl.textContent = startTime;
    } else {
      timerEl.textContent = score;
    }
    penalize = 0;
    if (startTime <= 0) {
      clearInterval(timerstart);
      endQuiz();
    }
  }, 1000);
};

// Selected answer
var selectedAnswer = function (e, answer) {
  if (e.target.getAttribute("value") === answer) {
    resultShow.classList.remove("hide");
    resultShow.innerHTML = "<p>Correct!</p>";
    nextQuestions();
  } else {
    resultShow.classList.remove("hide");
    resultShow.innerHTML = "<p>Wrong!</p>";
    penalize = 10;
    nextQuestions();
  }
};

// Show question to the page
var showQuestion = function (question) {
  questionTitle.innerHTML = "<h1>" + question.question + "</h1>";
  var olEl = document.createElement("ul");
  for (var i = 0; i < question.options.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = i + 1 + ". " + question.options[i];
    liEl.setAttribute("class", "answer");
    liEl.setAttribute("value", question.options[i]);
    liEl.addEventListener("click", function (e) {
      selectedAnswer(e, question.answer);
    });
    olEl.appendChild(liEl);
    answer.appendChild(olEl);
  }
};

// Reset question card and set the next question
var nextQuestions = function () {
  resetEl();
  if (questions[questionCount] === undefined) {
    score = startTime;
    endQuiz();
  } else {
    showQuestion(questions[questionCount]);
  }
  questionCount++;
};

// Start the quiz
var start_quiz = function () {
  startBox.classList.add("hide");
  quizBox.classList.remove("hide");
  timer(startTime);
  nextQuestions();
};

// Reset all the elements inside the question card
var resetEl = function () {
  while (answer.firstChild) {
    answer.removeChild(answer.firstChild);
  }
};

var initialsHandler = function () {
  location.href = "/high-score.html"
}

// Questions array
const questions = [
  {
    question: "Commonly used data types DO Not Include:",
    answer: "alerts",
    options: ["strings", "booleans", "alerts", "numbers"],
  },
  {
    question:
      "The consition in a if / else statement is enclosed with _______.",
    answer: "parenthesis",
    options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
  },
  {
    question: "Arrays in Javascript can be used to store _______.",
    answer: "all of the above",
    options: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
  },
  {
    question:
      "String values must be enclosed within _______ when being assined to variables.",
    answer: "quotes",
    options: ["commas", "curly brackets", "quotes", "parenthesis"],
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer: "console.log",
    options: ["Javascript", "terminal/bash", "for loops", "console.log"],
  },
];

// Start button
start_btn.addEventListener("click", start_quiz);
submitBtn.addEventListener("click", initialsHandler);
