// *Selecting Player / Score Elements / Currenct Score
const player0Element = document.querySelector('.player0');
const player1Element = document.querySelector('.player1');
const score0Element = document.getElementById('score0');
const score1Element = document.getElementById('score1');
const current0Element = document.getElementById('current0');
const current1Element = document.getElementById('current1');

// *Starting Conditions:
score0Element.textContent = 0;
score1Element.textContent = 0;

//* Start Condition function
let startCondition = function(){
    current0Element.textContent = 0;
    current1Element.textContent = 0;
}

// *Selecting Dice Elements
const diceElement = document.querySelector('.dice');
diceElement.classList.add('hidden');

// *Selecting Buttons Elements
const btnNewGame = document.querySelector('.btnNew');
const btnRoll = document.querySelector('.btnRoll');
const btnHold = document.querySelector('.btnHold');


let totalScore = [0, 0];
let currentScore = 0;
let activePlayer = 0; //* 0 or 1
let playing = true;


// *Switch Player function
const switchPlayer = function() {
    document.getElementById(`current${activePlayer}`).textContent = 0;
    currentScore = 0; //* current score is reseting to 0
    activePlayer = activePlayer === 0 ? 1 : 0
    player0Element.classList.toggle('playerActive');
    player1Element.classList.toggle('playerActive');
}


// *Rolling Dice functionality (btn roll dice)
btnRoll.addEventListener('click', function(){
    if (playing){
        // *1. Generate a random dice roll (1 - 6)
        const dice = Math.trunc(Math.random() * 6) + 1;

        // *2. Display Dice number
        diceElement.classList.remove('hidden');
        diceElement.src = `./img/dice-${dice}.png`;

        // *3. Check for rolled 1: if true, switch to next player
        if(dice !== 1){
            // *add dice(number) to current status
            currentScore += dice;
            document.getElementById(`current${activePlayer}`).textContent = currentScore;
        } else {
            // *switch to next player
            switchPlayer()
        }
    }
});

// *Button Hold functionality (btn hold) / add current score to total score
btnHold.addEventListener('click', function(){
    if(playing) {
        // *1. Add current score to active player's score
        totalScore[activePlayer] += currentScore;
        document.getElementById(`score${activePlayer}`).textContent = totalScore[activePlayer];


        // *2. Check if player's score is >= 100
        if(totalScore[activePlayer] >= 100) {
            // *Finish game
            playing = false;
            diceElement.classList.add('hidden');
            document.querySelector(`.player${activePlayer}`).classList.add('playerWinner');
            document.querySelector(`.player${activePlayer}`).classList.remove('playerActive');
        } else {
            // *3. Switch to next player
            switchPlayer(); 
        }
    }
});

btnNewGame.addEventListener('click', function(){
    document.querySelector(`.player${activePlayer}`).classList.remove('playerWinner');
    document.querySelector(`.player${activePlayer}`).classList.remove('playerActive');
    activePlayer = 0;
    totalScore = [0, 0];
    currentScore = 0;
    playing = true;
    document.querySelector(`.player${activePlayer}`).classList.add('playerActive');
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    startCondition();    
})