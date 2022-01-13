// Set all the variable to the elements
var startBox = document.querySelector(".start-quiz");
var quizBox = document.querySelector(".quiz-box");
var initialsBox = document.querySelector(".initials-box");
var start_btn = document.getElementById("start");
var questionTitle = document.querySelector(".question");
var answer = document.querySelector(".answers");
var finalScoreEl = document.querySelector("#final-score");
var resultShow = document.querySelectorAll(".result");
var timerEl = document.querySelector("#timer");
var submitBtn = document.querySelector("#submit");
var inputEl = document.querySelector("input");
var questionCount = 0;
var timeScore = 75;
var score = 0;

// Start the quiz
var start_quiz = function () {
  startBox.classList.add("hide");
  quizBox.classList.remove("hide");
  timerEl.textContent = timeScore;
  timer();
  nextQuestions();
};

// Quiz timer
var timer = function () {
  var timerstart = setInterval(function () {
    timeScore--;
    if (initialsBox.classList.contains("hide")) {
      timerEl.textContent = timeScore;
    } else {
      timerEl.textContent = score;
    }
    if (timeScore <= 0) {
      clearInterval(timerstart);
      endQuiz();
    }
  }, 1000);
};

// Reset question card and set the next question
var nextQuestions = function () {
  resetEl();
  if (questions[questionCount] === undefined) {
    score = timeScore;
    endQuiz();
  } else {
    showQuestion(questions[questionCount]);
  }
  questionCount++;
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

// Check if selected answer is correct or wrong
var selectedAnswer = function (e, answer) {
  if (e.target.getAttribute("value") === answer) {
    for (var i = 0; i < resultShow.length; i++) {
      resultShow[i].classList.remove("hide");
      resultShow[i].innerHTML = "<p>Correct!</p>";
    }
    nextQuestions();
  } else {
    for (var i = 0; i < resultShow.length; i++) {
      resultShow[i].classList.remove("hide");
      resultShow[i].innerHTML = "<p>Wrong!</p>";
    }
    timeScore = timeScore - 10;
    nextQuestions();
  }
};

//End quiz
var endQuiz = function () {
  quizBox.classList.add("hide");
  initialsBox.classList.remove("hide");
  finalScoreEl.textContent = score;
};

// Reset all the elements inside the question card
var resetEl = function () {
  while (answer.firstChild) {
    answer.removeChild(answer.firstChild);
  }
};

// Check if there's a user in localstorage and compare if that user score < than the current user score
var initialsHandler = function () {
  var input = inputEl.value;
  var user;
  var highScoreUser = JSON.parse(localStorage.getItem("user"));
  if (highScoreUser !== null && highScoreUser.length > 0) {
    if (highScoreUser[0].score < score) {
      user = { user: input, score: score };
      highScoreHandler(user);
    }
  } else {
    user = { user: input, score: score };
    highScoreHandler(user);
  }

  location.href = "./high-score.html";
};

// Save user to the localstorage
var highScoreHandler = function (user) {
  user = JSON.stringify([{ user: user.user, score: user.score }]);
  localStorage.setItem("user", user);
};

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

// Submit button
submitBtn.addEventListener("click", initialsHandler);
