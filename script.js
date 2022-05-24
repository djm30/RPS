// VARIABLES TO KEEP TRACK OF SCORE
let comScore = 0;
let pScore = 0;

choices = ["rock", "paper", "scissors"];

const choiceToInteger = (choice) => choices.indexOf(choice);

// FUNCTION TO GET COMPUTER CHOICE
const getAIChoice = () => choices[Math.floor(Math.random() * 3)];

// FUNCTION TO GET PLAYER CHOICE
const getPChoice = () => {
    console.log("Please enter either Rock, Paper or Scissors");
    let choice = "";
    let validChoice = false;
    while (!validChoice) {
        choice = prompt("Enter choice:").toLowerCase();
        if (choice === "paper" || choice === "rock" || choice === "scissors") {
            validChoice = true;
        }
    }
    return choice;
};

// GET WINNER
const getWinner = (pChoice, AIChoice) => {
    let playerWin = false;
    let tieGame = false;
    let comparison = choiceToInteger(pChoice) - choiceToInteger(AIChoice);
    switch (comparison) {
        case 0:
            tieGame = true;
        case 1:
            playerWin = true;
        case -2:
            playerWin = true;
    }

    let messageString = "";
    if (tieGame) {
        messageString = "Tie Game!";
    } else {
        if (playerWin) {
            messageString = "You win!";
            pScore++;
        } else {
            messageString = "Computer Wins!";
            comScore++;
        }
    }

    console.log(
        `You chose ${pChoice}, Computer chose: ${AIChoice}\n${messageString}`
    );
};

// SCORE PRINT
const printScore = () => {
    console.log(`Computer Score: ${comScore}\tPlayer Score: ${pScore}`);
};

const finalScore = () => {
    let winner = "";
    if (pScore === comScore) {
        winner = "Tie Game!";
    } else if (pScore > comScore) {
        winner = "Player Wins!";
    } else {
        winner = "Computer Wins!";
    }

    return `Final Scores:\nComputer: ${comScore}\t Player: ${pScore}\n${winner}`;
};

const playRound = () => {
    getWinner(getPChoice(), getAIChoice());
    printScore();
};

for (let _ = 0; _ < 5; _++) {
    console.log(`Round ${_ + 1}`);
    playRound();
}
console.log(finalScore());

// 5 ROUND GAME
