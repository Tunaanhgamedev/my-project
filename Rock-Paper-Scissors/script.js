const playerDisplay = document.getElementById("player-choice");
const computerDisplay = document.getElementById("computer-choice");
const resultDisplay = document.getElementById("resultDisplay");

const choices = ["Rock", "Paper", "Scissors"];

function Game(playerChoice) {
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  const getResult = (playerChoice, computerChoice) =>
    playerChoice === computerChoice
      ? "It's a TIE!" 
      : (playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Paper" && computerChoice === "Rock") ||
        (playerChoice === "Scissors" && computerChoice === "Paper")
      ? "You WIN!"
      : "You LOSE!";
  const result = getResult(playerChoice, computerChoice);
  resultDisplay.textContent = result;
  playerDisplay.textContent = `PLAYER: ${playerChoice}`;
  computerDisplay.textContent = `COMPUTER: ${computerChoice}`;

  resultDisplay.style.backgroundColor =
    result === "It's a TIE!" ? "blue" : result === "You WIN!" ? "green" : "red";

  resultDisplay.style.border = "2px solid transparent";
  resultDisplay.style.color = "white";
}
