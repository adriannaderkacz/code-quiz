//Added to check if the script is running
console.log("Script is running")

//Defined variables for elements in the HTML
let timerEl = document.getElementById("time");
let startScreen = document.getElementById("start-screen");
let startBtn = document.getElementById("start");
let questionsEl = document.getElementById("questions");
let questionTitle = document.getElementById("question-title");
let choicesEl = document.getElementById("choices");
let endScreen = document.getElementById("end-screen");
let finalScore = document.getElementById("final-score");
let initials = document.getElementById("initials");
let submitBtn = document.getElementById("submit");
let feedbackEl = document.getElementById("feedback");
let highscores = document.getElementById('highscores');

//Play the correct sound effect
console.log("Playing correct sound")
function playCorrectSound() {
    const audio = document.getElementById('correct-audio');
    if (audio) {
      audio.play();
    }
  }
//Play the wrong sound effect 
console.log("Playing wrong sound")
function playWrongSound() {
    const audio = document.getElementById('wrong-audio');
    if (audio) {
      audio.play();
    }
  }
