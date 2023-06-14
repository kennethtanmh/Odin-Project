function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  // For javascript Math.random will return a value between 0-1
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Function to capitalize the first letter of a string
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Function to play a round of the game
function playRound(playerSelection, computerSelection) {
  if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    return (
      "You Win! " +
      capitalize(playerSelection) +
      " beats " +
      capitalize(computerSelection)
    );
  } else if (
    (playerSelection === "rock" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "rock")
  ) {
    return (
      "You Lose! " +
      capitalize(computerSelection) +
      " beats " +
      capitalize(playerSelection)
    );
  } else {
    return "It's a tie! Both chose " + capitalize(playerSelection);
  }
}

// Initial score variables
let playerScore = 0;
let computerScore = 0;

// Function to handle player selection
function handlePlayerSelection(playerSelection) {
  const computerSelection = getComputerChoice();
  const result = playRound(playerSelection, computerSelection);

  displayResult(playerSelection, computerSelection, result);

  if (result.startsWith("You Win!")) {
    playerScore++;
  } else if (result.startsWith("You Lose!")) {
    computerScore++;
  }

  displayScore();

  if (playerScore === 5 || computerScore === 5) {
    // Check if either player or computer has scored 5 points
    if (playerScore === 5) {
      announceWinner("Player");
    } else {
      announceWinner("Computer");
    }

    // Disable the buttons to stop the game
    document.getElementById("rock").disabled = true;
    document.getElementById("paper").disabled = true;
    document.getElementById("scissors").disabled = true;
  }
}

// Assign event listeners to the buttons
let rock = document.getElementById("rock");
rock.addEventListener("click", function () {
  handlePlayerSelection("rock");
});

let paper = document.getElementById("paper");
paper.addEventListener("click", function () {
  handlePlayerSelection("paper");
});

let scissors = document.getElementById("scissors");
scissors.addEventListener("click", function () {
  handlePlayerSelection("scissors");
});

// Function to display the result in the HTML
function displayResult(playerSelection, computerSelection, result) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML =
    "Player chose " +
    capitalize(playerSelection) +
    ", Computer chose " +
    capitalize(computerSelection) +
    ". <br>" +
    result;
}

// Function to display the scores in the DOM
function displayScore() {
  const scoreDiv = document.getElementById("score");
  scoreDiv.textContent =
    "Player: " + playerScore + " | Computer: " + computerScore;
}

// Function to announce the winner in the DOM
function announceWinner(winner) {
  const winnerDiv = document.getElementById("winner");
  winnerDiv.textContent = winner + " wins the game!";
}
