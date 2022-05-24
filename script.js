// VARIABLES TO KEEP TRACK OF SCORE
let comScore = 0;
let pScore = 0;

let imgPath = "./images";
let choices = ["rock", "paper", "scissors"];
let gameOver = false;

// REQUIRED DOM ELEMENTS
const inputs = document.querySelectorAll(".button");
const pImg = document.querySelector(".player .portrait img");
const cImg = document.querySelector(".computer .portrait img");
const pScoreContainer = document.querySelector(".pScore");
const comScoreContainer = document.querySelector(".comScore");
const results = document.querySelector(".results");

const finalResult = document.querySelector(".final-result");
const finalScore = document.querySelector(".final-score");
const playAgainPopUp = document.querySelector(".play-again");
const playAgainBtn = document.querySelector(".replay");

// UPDATE SCORE
const updateScore = () => {
    pScoreContainer.innerText = pScore;
    comScoreContainer.innerText = comScore;
};

// UPDATE IMG
const updateImg = (choice, img) => {
    img.src = `${imgPath}/${choices[choice]}.svg`;
};

const choiceToInteger = (choice) => choices.indexOf(choice);

// FUNCTION TO GET COMPUTER CHOICE
const getAIChoice = () => Math.floor(Math.random() * 3);

const checkGameOver = () => {
    if (pScore >= 5 || comScore >= 5) {
        gameOver = true;
    }
};

const whenGameOver = () => {
    let winner = pScore > comScore ? "You Win!" : "You Loose!";
    finalResult.innerText = `${winner}\nFinal Score:`;
    finalScore.innerText = `${pScore} - ${comScore}`;
    setTimeout(() => {
        playAgainPopUp.classList.remove("hidden");
    }, 1000);
};

const reset = () => {
    pScore = 0;
    comScore = 0;
    updateScore();
    pImg.src = "";
    cImg.src = "";
    results.innerText = "";
    playAgainPopUp.classList.add("hidden");
    gameOver = false;
};

// GET WINNER
const getWinner = (pChoice, AIChoice) => {
    let playerWin = false;
    let tieGame = false;
    let comparison = pChoice - AIChoice;
    switch (comparison) {
        case 0:
            tieGame = true;
        case 1:
            playerWin = true;
        case -2:
            playerWin = true;
    }

    let messageString = "";

    results.classList.remove("tie", "win", "loose");

    if (tieGame) {
        results.classList.add("tie");
        messageString = "Tie Game!";
    } else {
        if (playerWin) {
            results.classList.add("win");
            messageString = "You win!";
            pScore++;
        } else {
            results.classList.add("loose");
            messageString = "Computer Wins!";
            comScore++;
        }
    }
    return `You chose ${choices[pChoice]}, Computer chose: ${choices[AIChoice]}\n${messageString}`;
};

const playRound = (pChoice) => {
    // GET AI CHOICE
    const AIChoice = getAIChoice();

    // UPDATING IMGS TO REFLECT CHOICES
    updateImg(pChoice, pImg);
    updateImg(AIChoice, cImg);
    const message = getWinner(pChoice, AIChoice);
    results.innerText = message;
    updateScore();
    checkGameOver();
    if (gameOver) {
        whenGameOver();
    }
};

// ATTACH CLICK LISTENERS TO INPUTS
inputs.forEach((input) => {
    input.addEventListener("click", (e) => {
        // MAKE PLAYER CHOICE WITH CLICKED BUTTONS DATA ATTRIBUTE
        if (gameOver) return;
        playRound(input.dataset.value);
    });
});

playAgainBtn.addEventListener("click", reset);
