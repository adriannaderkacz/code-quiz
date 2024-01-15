//Display the score
function displayScores() {
    const highscores = JSON.parse(localStorage.getItem('highscores'));
    highscores.sort((a, b) => b.score - a.score);

    for (let i = 0; i < highscores.length; i++) {
        const score = highscores[i];
        let liEl = document.createElement('li')
        liEl.textContent = score.initials + " -- " + score.score
        let olEl = document.getElementById('highscores')
        olEl.appendChild(liEl)
    }
}


//Clear the score
displayScores()

function clearScores() {
    localStorage.removeItem("highscores")
    window.location.reload()
}

let clearButton = document.getElementById('clear')

clearButton.addEventListener('click', clearScores)