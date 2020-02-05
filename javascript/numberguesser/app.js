/*
GAME FUNCTION:
- Player must guess a number between a min and a max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loss
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(),
    guessesLeft = 3;

// UI Elements
const gameWrapper = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
gameWrapper.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        guessInput.value = '';
    }
    // Check if won
    else if(guess == winningNum) {
        // Game over - Won
        gameOver(true, `${winningNum} is correct, YOU WIN!`)
    } else {
        guessesLeft -= 1;
        if(hasLost()) {
            // Game over - lost

            gameOver(false, `Sorry, you have lost. The correct answer was ${winningNum}`)
        } else {
            // Game continues - answer wrong

            // Change border color
            guessInput.style.borderColor = 'red';

            // Clear input
            guessInput.value = '';

            // Set message
            setMessage(`${guess} is not correct, please try again. You have ${guessesLeft} guesses left.`);
        }

    }
});

// won: Boolean
// msg: String
function gameOver(won, msg) {
    // Set border color
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.style.borderColor = color;

    // Disable input
    guessInput.disabled = true;

    // Set message
    setMessage(msg, color);

    // Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
};

// Check if player lost
function hasLost() {
    if(guessesLeft === 0) {
        return true;
    }
    return false;
};

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
};

// Get a random winning number
function getRandomNum() {
    return (Math.floor(Math.random() * max)) + min
}