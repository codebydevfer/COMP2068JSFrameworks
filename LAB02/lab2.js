// Rock, Paper, Scissors Game

//computer's random choice

var randomValue = Math.random().toFixed(2);

var computerSelection;

if (randomValue <  0.34) {
    computerSelection = "PAPER";
}
else if (randomValue <= 0.67) {
    computerSelection = "SCISSORS";
}
else {
    computerSelection = "ROCK";
}

//prompt()

var prompt = require('prompt');

//start the prompt

prompt.start();

prompt.get(['userSelection'], function (err, result) {
    var userSelection = result.userSelection.toUpperCase(); //toUpper to handle case insensitivity

    //display choices
    console.log("User: " + userSelection);
    console.log("Computer: " + computerSelection);
    console.log(" ");

    //determine winner

    if (userSelection === computerSelection) {
        console.log("It's a tie!");
    }
    else if (
        (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
        (userSelection === "PAPER" && computerSelection === "ROCK") ||
        (userSelection === "SCISSORS" && computerSelection === "PAPER")
    ) {
        console.log("User wins!");
    }
    else if (
        (userSelection === "ROCK" && computerSelection === "PAPER") ||
        (userSelection === "PAPER" && computerSelection === "SCISSORS") ||
        (userSelection === "SCISSORS" && computerSelection === "ROCK")
    ) {
        console.log("Computer wins!");
    }
});