// Define the maximum and minimum values for the counter
const MAX_NUMBER = 10;
const MIN_NUMBER = -10;

// Get the necessary DOM elements
const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');
const reset = document.querySelector('[data-key="reset"]');

// Event handler for subtract button click
const subtractHandler = () => {
  const newValue = parseInt(number.value) - 1;
  number.value = newValue;

  // Enable the add button if it was disabled
  if (add.disabled === true) {
    add.disabled = false;
  }

  // Disable the subtract button if the counter reaches the minimum value
  if (newValue <= MIN_NUMBER) {
    subtract.disabled = true;
  }
};

// Event handler for add button click
const addHandler = () => {
  const newValue = parseInt(number.value) + 1;
  number.value = newValue;

  // Enable the subtract button if it was disabled
  if (subtract.disabled === true) {
    subtract.disabled = false;
  }

  // Disable the add button if the counter reaches the maximum value
  if (newValue >= MAX_NUMBER) {
    add.disabled = true;
  }
};

// Event handler for reset button click
const resetHandler = () => {
  const resetMsg = document.getElementById('reset-message');
  resetMsg.textContent = 'The counter has been reset.';
  resetMsg.hidden = false;

  add.disabled = false;
  subtract.disabled = false;
  number.value = '0';

  setTimeout(() => {
    resetMsg.hidden = true;
  }, 1000);
};

// Attach event listeners to the subtract, add, and reset buttons
subtract.addEventListener('click', subtractHandler);
add.addEventListener('click', addHandler);
reset.addEventListener('click', resetHandler);
