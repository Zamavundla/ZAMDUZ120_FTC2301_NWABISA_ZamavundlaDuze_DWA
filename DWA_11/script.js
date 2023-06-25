/**
 * The maximum value allowed for the counter.
 * @constant {number}
 */
const MAX_NUMBER = 10;

/**
 * The minimum value allowed for the counter.
 * @constant {number}
 */
const MIN_NUMBER = -10;

/**
 * The input element for displaying the counter value.
 * @type {HTMLInputElement}
 */
const number = document.querySelector('[data-key="number"]');

/**
 * The subtract button element.
 * @type {HTMLButtonElement}
 */
const subtract = document.querySelector('[data-key="subtract"]');

/**
 * The add button element.
 * @type {HTMLButtonElement}
 */
const add = document.querySelector('[data-key="add"]');

/**
 * The reset button element.
 * @type {HTMLButtonElement}
 */
const reset = document.querySelector('[data-key="reset"]');

/**
 * Handles the subtract button click event.
 */
const subtractHandler = () => {
  myStore.publish({ type: 'MINUS' });
  console.log(myStore.getState());

  const newValue = parseInt(number.value) - 1;
  number.value = newValue;

  if (number.value <= MIN_NUMBER) {
    subtract.disabled = true;
    add.disabled = false;
  }
};

/**
 * Handles the add button click event.
 */
const addHandler = () => {
  myStore.publish({ type: 'ADD' });
  console.log(myStore.getState());

  const newValue = parseInt(number.value) + 1;
  number.value = newValue;

  if (number.value >= MAX_NUMBER) {
    add.disabled = true;
    subtract.disabled = false;
  }
};

/**
 * Handles the reset button click event.
 */
const resetHandler = () => {
  myStore.publish({ type: 'RESET' });
  console.log(myStore.getState());

  const resetMsg = document.getElementById('reset-message');
  resetMsg.hidden = false;
  setTimeout(() => {
    resetMsg.hidden = true;
  }, 1250);

  add.disabled = false;
  subtract.disabled = false;
  number.value = 0;
};

subtract.addEventListener('click', subtractHandler);
add.addEventListener('click', addHandler);
reset.addEventListener('click', resetHandler);

/* STATE MANAGEMENT CODE */

/**
 * Creates a Redux-inspired store.
 * @param {Function} reducer - The reducer function to handle state updates.
 * @returns {object} An object with methods for getting the current state and dispatching actions.
 */
const store = (reducer) => {
  let state;
  let handlers = [];

  /**
   * Retrieves the current state of the store.
   * @returns {*} The current state.
   */
  const fetchState = () => state;

  /**
   * Dispatches an action to update the state.
   * @param {object} action - The action object containing the type and payload.
   */
  const publish = (action) => {
    state = reducer(state, action);
    handlers.unshift(state);
    console.log(handlers);
  };

  /**
   * Retrieves the current state of the store.
   * @returns {*} The current state.
   */
  const getState = () => fetchState();

  return {
    getState,
    publish
  };
};

/**
 * Reducer function to handle state updates based on actions.
 * @param {*} state - The current state.
 * @param {object} action - The action object containing the type and payload.
 * @returns {*} The updated state.
 */
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'MINUS':
      return state - 1;
    case 'RESET':
      return (state = 0);
    default:
      return state;
  }
};

/**
 * The store instance for managing the state.
 */
const myStore = store(reducer);
