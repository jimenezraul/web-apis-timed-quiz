// setup elements variables
var scoreEl = document.querySelector("#score");
var clearBtn = document.querySelector("#clear-hs");

// Get user from localstorage and display it to the page
var getUser = function () {
  var user = JSON.parse(localStorage.getItem("user"));

  if (user !== null && user.length) {
    for (var i = 0; i < user.length; i++) {
      scoreEl.innerHTML = i + 1 + ". " + user[i].user + " - " + user[i].score;
    }
  } else {
    scoreEl.innerHTML = "🚫 No score";
  }
};

// Clear the localstorage
var clearLocalStorage = function () {
  var user = JSON.stringify([]);
  localStorage.setItem("user", user);
  getUser();
};

getUser();

clearBtn.addEventListener("click", clearLocalStorage);
