import { books } from './data.js';

import {
  appendBooks,
  showMoreAction,
  searchBooks,
  changeTheme,
  handleSearchOverlay,
  searchDialog,
  lightToggleDialog,
  data,
  ROOT,
  SHOW_MORE_BTN,
  HOME_PAGE,
} from './functions.js';

// GLOBAL VARIABLES 

const {
  home: {
    logoText: LOGO,
    search: HOME_SEARCH_BTN,
    themeBtn: HOME_THEME_BTN,
  },
} = data;
const SEARCH_BTN = searchDialog.querySelectorAll('button')[1];
const SEARCH_CANCEL_BTN = searchDialog.querySelectorAll('button')[0];
const SAVE_CHANGES_BTN = lightToggleDialog.querySelectorAll('button')[1];
const CANCEL_CHANGE_BTN = lightToggleDialog.querySelectorAll('button')[0];

/** HOME PAGE DISPLAY
 *  calling of the function to load the page with book list using an event
listener for when the page first loads  */
ROOT.addEventListener('load', appendBooks(books));

/* use event listener to make button load more books with the
showMoreAction function */
SHOW_MORE_BTN.addEventListener('click', showMoreAction);

/* this event listener return to home button when you click on the book connect
text and logo */
LOGO.addEventListener('click', (event) => {
  event.preventDefault();
  // Clear the book list on the homepage
  HOME_PAGE.innerHTML = '';
  // call this function to load the page again
  appendBooks(books);
});

//SEARCH

HOME_SEARCH_BTN.addEventListener('click', handleSearchOverlay);

// this is to carry out the book search when the search button is clicked
SEARCH_BTN.addEventListener('click', (event) => {
  event.preventDefault();
  searchBooks(event);
  searchDialog.close();
});
SEARCH_CANCEL_BTN.addEventListener('click', (event) => {
  event.preventDefault();
  searchDialog.close();
});

/** LIGHT/DARK TOGGLE
 *  This is the event listener that shows the light/dark toggle overlay*/

HOME_THEME_BTN.addEventListener('click', (event) => {
  event.preventDefault();
  lightToggleDialog.showModal();
});

//event listener for the save button in the light/dark toggle dialog 
SAVE_CHANGES_BTN.addEventListener('click', changeTheme);

// event listener for cancel button to remove overlay 
CANCEL_CHANGE_BTN.addEventListener('click', (event) => {
  event.preventDefault();
  lightToggleDialog.close();
});
