function getComputerChoice() {
  const choice = ["rock", "paper", "scissors"];
  const randomChoice = Math.floor(Math.random() * 3);
  return choice[randomChoice];
}

function getPlayerChoice() {
  const playerChoice = prompt(
    "Please enter your choice: Rock, Paper, or Scissors"
  ).toLowerCase();
  return playerChoice;
}

let caplitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

function playRound(playerSelection, computerSelection) {
  if (
    playerSelection !== "rock" &&
    playerSelection !== "paper" &&
    playerSelection !== "scissors"
  ) {
    return "not a valid choice";
  }

  if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    return (
      "You Win! " +
      caplitalize(playerSelection) +
      " beats " +
      caplitalize(computerSelection)
    );
  } else if (
    (playerSelection === "rock" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "rock")
  ) {
    return (
      "You Lose! " +
      caplitalize(computerSelection) +
      " beats " +
      caplitalize(playerSelection)
    );
  } else {
    return "It's a tie! Both chose " + caplitalize(playerSelection);
  }
}

function game() {
  let playerScore = 0;
  let computerScore = 0;

  for (let round = 1; round <= 5; round++) {
    const playerSelection = getPlayerChoice();
    const computerSelection = getComputerChoice();
    const result = playRound(playerSelection, computerSelection);

    console.log("Round " + round + ":");
    console.log("Player chose " + caplitalize(playerSelection));
    console.log("Computer chose " + caplitalize(computerSelection));
    console.log(result);

    if (result.startsWith("You Win!")) {
      playerScore++;
    } else if (result.startsWith("You Lose!")) {
      computerScore++;
    }
  }

  console.log("Game Over");
  console.log("Player Final Score " + playerScore);
  console.log("Computer Final Score " + computerScore);

  if (playerScore > computerScore) {
    console.log("Yay! The player wins!");
  } else if (computerScore > playerScore) {
    console.log("Aw! The player lost!");
  } else {
    console.log("The game ended with a tie!");
  }
}

game();
