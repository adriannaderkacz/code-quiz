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

//Added quiz questions, choices and correct answers
let questions = [
  {
    title: "What is BookTok?",
    choices: [
        'A TikTok channel dedicated to cooking', 
        'A community of book lovers on TikTok',
        'A hashtag for TikTok dance challenges',
        'A TikTok trend for makeup tutorials'
    ],
    answer: 'A community of book lovers on TikTok'
  },
  {
    title: "Which genre tends to be the most popular on BookTok?",
    choices: [
        'Science Fiction', 
        'Self-Help',
        'Fantasy', 
        'Historical Non-Fiction'
    ],
    answer: 'Fantasy'
  },
  {
    title: "What impact has BookTok had on the publishing industry?",
    choices: [
        'Decreased overall book sales', 
        'Increased sales of classic literature only', 
        'Boosted sales for both new and old books', 
        'No significant impact'
    ],
    answer: 'Boosted sales for both new and old books'
  },
  {
    title: "Which of the following books gained renewed popularity because of BookTok?",
    choices: [
        '"1984" by George Orwell', 
        '"The Song of Achilles" by Madeline Miller', 
        '"War and Peace" by Leo Tolstoy', 
        '"The Catcher in the Rye" by J.D. Salinger'
    ],
    answer: '"The Song of Achilles" by Madeline Miller'
  },
  {
    title: "What type of content is most commonly shared by BookTok users?",
    choices: [
        'Book reviews and recommendations', 
        'Writing and publishing advice', 
        'Movie adaptations of books', 
        'Interviews with authors'
    ],
    answer: 'Book reviews and recommendations'
  }
]

//Defined variables for the quiz
let timer = questions.length * 10
let timerInterval;
let score = 0
let questionIndex = 0

//Added function to start the quiz, set the timer and get questions
function startQuiz() {
  startScreen.setAttribute("class", "hide")
  questionsEl.removeAttribute('class')
  getQuestions();
  timerInterval = setInterval(function () {
    timer--;
    timerEl.textContent = timer;
    if (timer <= 0) {
      endQuiz()
    }
  }, 1000)
}

//Event listener for starting the quiz on button click
startBtn.addEventListener("click", startQuiz);

//Function to get and display quiz questions
function getQuestions() {
  let currentQuestion = questions[questionIndex];
  questionTitle.textContent = currentQuestion.title;
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.addEventListener('click', selectAnswer);
    choicesEl.appendChild(button);
  });
}

//Function to handle user's answer selection
function selectAnswer(event) {
  const selectedAnswer = event.target.textContent;
  const correctAnswer = questions[questionIndex].answer;

  //If the answer is wrong, reduce time by 10
  if (selectedAnswer !== correctAnswer) {
    timer -= 10;
    //Code to stop the timer from dropping below 0
    if (timer < 0) {
      timer = 0;
    }
    timerEl.textContent = timer;
    feedbackEl.textContent = 'Wrong!';
    playWrongSound();
  } else {
    feedbackEl.textContent = 'Correct!';
    playCorrectSound();

  }
  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 1500)

  questionIndex++
  //If the current question is the final question
  if (questionIndex === questions.length) {
    endQuiz();
  } else {
    getQuestions();
  }

}
//Added function to end the quiz
function endQuiz() {
  clearInterval(timerInterval)
  questionsEl.setAttribute('class', 'hide')
  endScreen.removeAttribute('class')
  finalScore.textContent = timer;
}

//Event listener for submitting the score
submitBtn.addEventListener("click", () => {
  const initialsValue = initials.value.trim();
  // If initials are not empty
  if (initialsValue !== '') {
    const highscore = JSON.parse(localStorage.getItem('highscores')) || [];
    //Created a new score object with score and initials
    let newScore = {
      score: timer,
      initials: initialsValue,
    }
    highscore.push(newScore);
    //Store the score in local storage
    localStorage.setItem('highscores', JSON.stringify(highscore));

    //Redirect to the highscores page
    window.location.href = "highscores.html";

  } else {
    alert('Please enter your initials!');
  }
})
