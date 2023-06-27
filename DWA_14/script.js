// scripts.js

// Constants for the minimum and maximum values
const MAX_NUMBER = 10;
const MIN_NUMBER = -10;

// Get references to the HTML elements
const numberInput = document.querySelector('[data-key="number"]');
const subtractButton = document.querySelector('[data-key="subtract"]');
const addButton = document.querySelector('[data-key="add"]');
const resetButton = document.querySelector('[data-key="reset"]');
const resetMessage = document.getElementById('reset-message');

// Counter state variables
let counterValue = 0;
let counterState = 'Normal';

// Subtract button click event handler
const subtractHandler = () => {
  counterValue--;
  numberInput.value = counterValue;

  if (counterValue <= MIN_NUMBER) {
    subtractButton.disabled = true;
    addButton.disabled = false;
  }
};

// Add button click event handler
const addHandler = () => {
  counterValue++;
  numberInput.value = counterValue;

  if (counterValue >= MAX_NUMBER) {
    addButton.disabled = true;
    subtractButton.disabled = false;
  }
};

// Reset button click event handler
const resetHandler = () => {
  counterValue = 0;
  numberInput.value = counterValue;
  counterState = 'Normal';

  resetMessage.hidden = false;
  setTimeout(() => {
    resetMessage.hidden = true;
  }, 1250);

  subtractButton.disabled = false;
  addButton.disabled = false;
};

// Add event listeners to the buttons
subtractButton.addEventListener('click', subtractHandler);
addButton.addEventListener('click', addHandler);
resetButton.addEventListener('click', resetHandler);
