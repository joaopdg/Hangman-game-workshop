//Collection of words for the game
let wordsArray = [
  ["H ", "T ", "M ", "L "],
  ["C ", "S ", "S "],
];

//Choose a random word to play
let rIndex = Math.floor(Math.random() * wordsArray.length);
let wordToGuess = wordsArray[rIndex];

//Make a copy of the word and swap the letters for "_"
let underScores = [...wordToGuess];
for (let i = 0; i < underScores.length; i++) {
  underScores[i] = "_ ";
}

//Function to update the letters in the gameBoard
function updateGameBoard() {
  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  for (let i = 0; i < underScores.length; i++) {
    let emptyFields = document.createTextNode(underScores[i]);
    gameBoard.appendChild(emptyFields);
  }
}

let gameOver = false

//Check which key the user pressed
document.addEventListener("keydown", (event) => {
  //Store the pressed key in the variable "pressedKey"
  let pressedKey = event.key.toUpperCase() + " ";

  //Check if the key that the user pressed was correct
  for (let i = 0; i < wordToGuess.length; i++ && gameOver === false) {
    if (wordToGuess[i] === pressedKey) {
      underScores[i] = pressedKey;
    }
  }

  //Check if the key that the user pressed was incorrect
  if (wordToGuess.includes(pressedKey) === false && gameOver === false) {
    let wrongLetters = document.getElementById("wrongLetters");
    wrongLetters.innerHTML += pressedKey;
  }

  //Update the game board
  updateGameBoard();

  //Stop the game if user won
  if (underScores.toString() === wordToGuess.toString()) {
    let gameStatus = document.getElementById("gameStatus");
    gameStatus.innerHTML = "YOU WIN";
    gameOver = true
  }

  //Stop the game if user looses
  if (wrongLetters.innerHTML.length > 26) {
    gameStatus.innerHTML = "YOU LOSE";
    gameOver = true
  }
});

//Run the game as soon as the page loads
updateGameBoard();
