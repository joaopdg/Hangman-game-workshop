/* --- SLIDE SOBRE DATA TYPES --- */
//all the possible words for the game
let wordsArray = [
  ["I ", "R ", "O ", "N ", "H ", "A ", "C ", "K "],
  ["J ", "A ", "V ", "A ", "S ", "C ", "R ", "I ", "P ", "T "],
  ["P ", "R ", "O ", "G ", "R ", "A ", "M ", "M ", "I ", "N ", "G "],
  ["H ", "T ", "M ", "L "],
  ["C ", "S ", "S "],
];

//control variables for win and lose
let pressedKey;
let gameOver = false;
let wrongAnswers = 0;

/* --- SLIDE SOBRE ARRAY METHODS --- */
//pick a random word
let randomIndex = Math.floor(Math.random() * wordsArray.length);
let wordToGuess = wordsArray[randomIndex];

/* --- SLIDE SOBRE LOOPS --- */
//switch the letters for empty spaces
let underScores = new Array(wordToGuess.length);
for (let i = 0; i < wordToGuess.length; i++) {
  underScores[i] = "_ ";
}

/* --- SLIDE SOBRE FUNCTIONS E DOM --- */
//update the empty spaces to the user
function printGameBoard() {
  for (let i = 0; i < underScores.length; i++) {
    let gameBoard = document.getElementById("gameBoard");
    let emptyFields = document.createTextNode(underScores[i]);
    gameBoard.appendChild(emptyFields);
    updateImg();
  }
}

function updateImg() {
  let progressImgs = [
    "../images/1.jpg",
    "../images/2.jpg",
    "../images/3.jpg",
    "../images/4.jpg",
    "../images/5.jpg",
    "../images/6.jpg",
    "../images/7.jpg",
  ];
  let progress = document.getElementById("progress");
  progress.innerHTML = `
  <img src=${progressImgs[wrongAnswers]} alt="">
  `;
}

function fakeKeyboard(letter) {
  pressedKey = letter;

  //check if the word includes the pressed key
  for (let i = 0; i < wordToGuess.length; i++) {
    if (wordToGuess[i] === pressedKey + " " && !gameOver) {
      underScores[i] = pressedKey + " ";
    }
  }

  //display the wrong keys
  if (!wordToGuess.includes(pressedKey + " ") && !gameOver) {
    wrongAnswers++;
    let wrongLetters = document.getElementById("wrongLetters");
    let wrongGuess = document.createTextNode(" " + pressedKey);
    wrongLetters.appendChild(wrongGuess);
  }

  //update Gameboard
  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  printGameBoard();

  //check Win
  let gameStatus = document.getElementById("gameStatus");
  if (underScores.toString() === wordToGuess.toString()) {
    gameStatus.innerHTML = "🏆 YOU WIN 🏆";
    gameOver = true;

    //check Loose
  } else if (wrongAnswers === 6) {
    gameStatus.innerHTML = "❌ YOU LOSE ❌";
    gameOver = true;
  }
}

/* --- SLIDE SOBRE EVENT LISTENERS E CONDITIONS --- */
//listen to the keys that the user pressed
document.addEventListener("keydown", (event) => {
  pressedKey = event.key.toUpperCase();

  //check if the word includes the pressed key
  for (let i = 0; i < wordToGuess.length; i++) {
    if (wordToGuess[i] === pressedKey + " " && !gameOver) {
      underScores[i] = pressedKey + " ";
    }
  }

  //display the wrong keys
  if (!wordToGuess.includes(pressedKey + " ") && !gameOver) {
    wrongAnswers++;
    let wrongLetters = document.getElementById("wrongLetters");
    let wrongGuess = document.createTextNode(" " + pressedKey);
    wrongLetters.appendChild(wrongGuess);
  }

  //update Gameboard
  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  printGameBoard();

  //check Win
  let gameStatus = document.getElementById("gameStatus");
  if (underScores.toString() === wordToGuess.toString()) {
    gameStatus.innerHTML = "🏆 YOU WIN 🏆";
    gameOver = true;

    //check Loose
  } else if (wrongAnswers === 6) {
    gameStatus.innerHTML = "❌ YOU LOSE ❌";
    gameOver = true;
  }
});

//start the game as soon as the page loads
window.onload = printGameBoard();
