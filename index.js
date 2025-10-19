const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
// 1st bug I changed const to let in maxNumber of Attempts
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// 8th bug need to declare function hideAllMessage before calling in checkGuess () function 
function hideAllMessages() {
// 4th bug removed =
  for (let elementIndex = 0; elementIndex <= messages.length-1; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}
function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  // make sure guess is a number >
  if (guess < 1 || isNaN(guess)|| guess>99) {
    alert("Please enter a whole number with a minimum value of 1 and maximum value of 99.")
    guessInput.value = "";
    // 11th bug I put return false before end of checkGuess() function so input outside of range won't kick out program
    return false;
  }
  attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      // 2nd bug both were tooLowMessage so changed to tooHighMessage
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    // Stretch goal make singular guess
    if (attempts===(maxNumberOfAttempts-1)){
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
    }else{
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    }
  }
  
// 3rd bug took out extra =
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';
  resetButton.style.display = '';
  // 10thbug added return false so the page won't kick out when guess is not within specific range of numbers
  return false;
}

// 5th bug function misspelled 
function setup() {
  // 9th buggadded attempts =0 since the setup after reset button is clicked was causing negative numbers to occur
  attempts=0;
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);
  // 6th bug removed reset number of maxNumberOfAttempts=0; line 

  // Enable the input and submit button
// 7thbug changed disabeld to disabled for submitButton
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

// 12 optional change was to comment out submit button, because I already made a submit portion on the input area

// submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);


setup();
