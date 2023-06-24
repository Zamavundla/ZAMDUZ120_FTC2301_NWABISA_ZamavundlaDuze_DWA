import {
  books, genres, authors } from './data.js';

/** DOM ELEMENT FUNCTIONS

 * Fetch the DOM element
 *
 * @param {string} elementId
 * @returns
 */
export const getHtml = (elementId) => {
  const htmlElemenet = document.querySelector(elementId);
  return htmlElemenet;
};
/**
 * Will fetch a Node list of elements
 *
 * @param {string} nodeId
 * @returns {NodeList}
 */
export const getHtmlArray = (nodeId) => {
  const htmlElemenet = document.querySelectorAll(nodeId);
  return htmlElemenet;
};

/** DOM ELEMENTS STORAGE OBJECT
 * this object has the query selectors for all the DOM elements used in the javascript
 */
export const data = {
  home: {
    root: document.documentElement,
    main: getHtml('[data-list-items]'),
    showMoreBtn: getHtml('[data-list-button]'),
    logoText: getHtml('.header__logo'),
    search: getHtml('[data-header-search]'),
    themeBtn: getHtml('[data-header-settings]'),
  },
  summary: {
    overlay: document.querySelector('[data-list-active]'),
    close: document.querySelector('[data-list-close]'),
  },
};

// GLOBAL VARIABLES
export const {
  home: {
    root: ROOT,
    main: HOME_PAGE,
    showMoreBtn: SHOW_MORE_BTN,
  },
  summary: {
    overlay: BOOK_SUMMARY,
  },
} = data;
const FRAGMENT = document.createDocumentFragment();

// BOOK SUMMARY OVERLAY

/**
 * This handler shows the book description overlay when the book is clicked on
 * @param event
 */
export const descriptionOverlay = (button) => {
//create summary html
document.querySelector('[data-list-active]').innerHTML = /* html */
  `<div class="overlay__preview">
  <img class="overlay__blur" data-list-blur="" src="${button.image}">
  <img class="overlay__image" data-list-image="" src="${button.image}">
  </div>
  <div class="overlay__content">
  <h3 class="overlay__title" data-list-title="">${button.title} (${new Date(button.published).getFullYear()})</h3>
  <div class="overlay__data" data-list-subtitle="">${authors[button.author]}</div>
  <p class="overlay__data overlay__data_secondary" data-list-description="">${button.description}</p>
  </div>
  <div class="overlay__row">
  <button class="overlay__button overlay__button_primary" data-list-close="">Close</button>
  </div>`;

//show the modal on the page
  BOOK_SUMMARY.showModal();
//close the modal when the close button is clicked.
  getHtml('[data-list-close]').addEventListener('click', () => {
    BOOK_SUMMARY.close();
  });
};

/** SEARCH
 * This is an array of the values of the genres object.
 */
const genreArray = Object.values(genres);
genreArray.unshift('All Genres');

/**
 * This is an array of the values of the authors object.
 */
const authorArray = Object.values(authors);
authorArray.unshift('All Authors');

/**
 * This is the dialog box for the search overlay html
 */
export const searchDialog = getHtml('[data-search-overlay]');

searchDialog.innerHTML = /* html */
  `<div class="overlay__content">
      <form class="overlay__form" data-search-form="" id="search">
        <label class="overlay__field">
          <div class="overlay__label">Title</div>
          <input class="overlay__input" data-search-title="" name="title" placeholder="Any">
        </label>
  
        <label class="overlay__field">
          <div class="overlay__label">Genre</div>
          <select class="overlay__input overlay__input_select" data-search-genres="" name="genre">${genreArray.map((genreArray) => `<option value="${genreArray}">${genreArray}</option>`)}</select>
        </label>
  
        <label class="overlay__field">
          <div class="overlay__label">Author</div>
          <select class="overlay__input overlay__input_select" data-search-authors="" name="author">${authorArray.map((authorArray) => `<option value="${authorArray}">${authorArray}</option>`)}</select>
        </label>
      </form>
  
      <div class="overlay__row">
        <button class="overlay__button" data-search-cancel="">Cancel</button>
        <button class="overlay__button overlay__button_primary" type="submit" form="search">Search</button>
      </div>
    </div>`;

/**
 * This handler shows the search overlay when the search button in
 * the header is clicked.
 * @param event
 */
export const handleSearchOverlay = (event) => {
  event.preventDefault();
  searchDialog.showModal();
  getHtml('[data-search-title]').focus();
};

/**
 * This handler will run the search through the books object
 * and create new buttons with the search results then print them to the
 * html page.
 * If multiple criteria has been selected, it will show list of books that meet all the conditions
 * @param event
 * @returns
 */
export const searchBooks = (event) => {
  event.preventDefault();

  const searchText = getHtml('[data-search-title]').value.toLowerCase().trim();
  const selectedGenre = getHtml('[data-search-genres]').value;
  const selectedAuthor = getHtml('[data-search-authors]').value;

  let filteredBooks = books;

  if (selectedGenre !== 'All Genres') {
    const genreId = Object.keys(genres).find((key) => genres[key] === selectedGenre);
    filteredBooks = filteredBooks.filter((book) => book.genres.includes(genreId.toString()));
  }
  if (selectedAuthor !== 'All Authors') {
    const authorId = Object.keys(authors).find((key) => authors[key] === selectedAuthor);
    filteredBooks = filteredBooks.filter((book) => book.author.includes(authorId));
  }
  if (searchText !== '') {
    filteredBooks = filteredBooks.filter((book) => book.title.toLowerCase().includes(searchText));
  }
  const booksFound = filteredBooks.length > 0;
  if ((!booksFound) || ((!searchText) && (selectedAuthor === 'All Authors') && (selectedGenre === 'All Genres'))) {
    HOME_PAGE.innerHTML = '';
    HOME_PAGE.innerHTML = `<div class = "list__message list__message_show" data-list-message = "">
                                                              <p>No results found.
                                                              Your filters may be too narrow, try again</p>
                                                          </div>`;

    SHOW_MORE_BTN.disabled = true;
    return filteredBooks;
  }
  HOME_PAGE.innerHTML = '';
  appendBooks(filteredBooks);
  HOME_PAGE.appendChild(FRAGMENT);
  SHOW_MORE_BTN.disabled = true;
  // the search results summary overlay
  const searchResultList = HOME_PAGE.querySelectorAll('button');
  for (const singleResult of searchResultList) {
    singleResult.addEventListener('click', descriptionOverlay);
  }
};

/** TOGGLE LIGHT/DARK MODE
 * This variable is the dialog box for the light/dark toggle overlay
 */
export const lightToggleDialog = getHtml('[data-settings-overlay]');

lightToggleDialog.innerHTML = /* html */
  `<div class="overlay__content">
                            <form class="overlay__form" data-settings-form="" id="settings">
                            <label class="overlay__field">
                              <div class="overlay__label">Theme</div>
  
                              <select class="overlay__input overlay__input_select" data-settings-theme="" name="theme">
                                <option value="day">Day</option>
                                <option value="night">Night</option>
                              </select>
                            </label>
                            </form>
  
                            <div class="overlay__row">
                            <button class="overlay__button" data-settings-cancel="">Cancel</button>
                            <button class="overlay__button overlay__button_primary" type="submit" form="settings">Save</button>
                            </div>
                            </div>`;

/**
 * This handler will switch the theme of the webpage when clicked.
 * It fetch the value attribute of each of the options and check whether they were
 * the selected option when the save button was clicked then change the theme.
 * @param event
 */
export const changeTheme = (event) => {
  event.preventDefault();

  const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
  };
  const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
  };
  const themeOption = getHtml('[data-settings-theme]').querySelectorAll('option');
  // first find the selected theme
  let selectedTheme = null;
  for (const singleOption of themeOption) {
    if (singleOption.selected) {
      selectedTheme = singleOption.value;
    }
  }

  if (selectedTheme.toLocaleLowerCase() !== 'night') {
    ROOT.style.setProperty('--color-dark', day.dark);
    ROOT.style.setProperty('--color-light', day.light);
  } else {
    ROOT.style.setProperty('--color-dark', night.dark);
    ROOT.style.setProperty('--color-light', night.light);
  }
  //  close the toggle overlay
  lightToggleDialog.close();
};
