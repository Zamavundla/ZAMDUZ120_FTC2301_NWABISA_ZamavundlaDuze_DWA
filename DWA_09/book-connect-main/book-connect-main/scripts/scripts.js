//@ts-check

import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

//These are query selectors for each user story which makes the bookconnect works.
const html = {
  
  settings: {
    button: document.querySelector('[data-header-settings]'),
    dialog: document.querySelector('[data-settings-overlay]'),
    form: document.querySelector('[data-settings-form]'),
    theme: document.querySelector('[data-settings-theme]'),
    cancel: document.querySelector('[data-settings-cancel]'),
    save: document.querySelector('[data-settings-save]')
  },
 
  search: {
      button: document.querySelector('[data-header-search]'),
      dialog: document.querySelector('[data-search-overlay]'),
      cancel: document.querySelector('[data-search-cancel]'),
      form: document.querySelector('[data-search-form]'),
      title: document.querySelector('[data-search-title]'),
      genre: document.querySelector('[data-search-genres]'),
      author: document.querySelector('[data-search-authors]'),
      submit: document.querySelector('[data-search-submit]')
  },
  
  list: {
    items: document.querySelector('[data-list-items]'),
    message: document.querySelector('[data-list-message]'),
    button: document.querySelector('[data-list-button]'),
    preview: document.querySelectorAll('.preview'),
    overlay: {
      active: document.querySelector('[data-list-active]'),
      blur: document.querySelector('[data-list-blur]'),
      title: document.querySelector('[data-list-title]'),
      subtitle: document.querySelector('[data-list-subtitle]'),
      description: document.querySelector('[data-list-description]'),
      close: document.querySelector('[data-list-close]'),
      image: document.querySelectorAll('[data-list-image]')

  }
  },
}



// Variables with global scope to use across functions
const fragment = document.createDocumentFragment();
const area = document.querySelector('[data-list-items]');
let index = 0;

/**
 * Loads the next set of books when the "Show More" button is clicked.
 * Displays BOOKS_PER_PAGE number of books each time.
 * Uses the global index variable to track the number of books loaded so far.
 */
const loadBooks = (event) => {
  event.preventDefault();
  // @ts-ignore
  html.list.message.classList = 'list__message';

  const extracted = books.slice(index, index + BOOKS_PER_PAGE);
  const booksLeft = books.length - index;
  // @ts-ignore
  html.list.button.textContent = `Show More (${booksLeft})`;

  for (let i = index; i < index + BOOKS_PER_PAGE; i++) {
    const book = books[i];
    const { image, title, author: authorId, id } = book;

    const element = document.createElement('button');
    // @ts-ignore
    element.classList = 'preview';
    element.setAttribute('id', id);
    element.innerHTML = /* html */ `
      <img class="preview__image" src="${image}"/>
      <div class="preview__info" data-box>
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[authorId]}</div>
      </div>`;

    fragment.appendChild(element);
  }

  // @ts-ignore
  area.appendChild(fragment);
  index += extracted.length;
};

// @ts-ignore
html.list.button.addEventListener('click', loadBooks);
window.addEventListener('load', loadBooks);

/**
 * Event listener that displays the book preview when a book is clicked.
 */
document.addEventListener('click', (event) => {
  // @ts-ignore
  if (html.list.overlay.active.hasAttribute('open')) {
    // @ts-ignore
    html.list.overlay.active.removeAttribute('open');
  } else {
    // @ts-ignore
    const button = event.target.closest('.preview');
    if (button == null) {
      return;
    }

    const book = books.find((book) => book.id === button.id);
    // @ts-ignore
    const year = new Date(book.published).getFullYear();

    // @ts-ignore
    const { title, image, description, author: authorId } = book;
    const titleElement = html.list.overlay.title;
    // @ts-ignore
    titleElement.innerText = title;

    const imageElement = document.querySelector('[data-list-image]');
    // @ts-ignore
    imageElement.src = image;

    const blurElement = document.querySelector('[data-list-blur]');
    // @ts-ignore
    blurElement.src = image;

    const descriptionElement = html.list.overlay.description;
    // @ts-ignore
    descriptionElement.innerText = description;

    const subtitleElement = html.list.overlay.subtitle;
    // @ts-ignore
    subtitleElement.innerText = `${authors[authorId]} (${year})`;

    // @ts-ignore
    html.list.overlay.active.setAttribute('open', true);
  }
});

/**
 * Opens and closes the search overlay.
 */
const handleSearchToggle = (event) => {
  event.preventDefault();
  // @ts-ignore
  if (html.search.dialog.hasAttribute('open')) {
    // @ts-ignore
    html.search.dialog.removeAttribute('open');
  } else {
    // @ts-ignore
    html.search.dialog.setAttribute('open', true);
  }
};

// @ts-ignore
html.search.button.addEventListener('click', handleSearchToggle);
// @ts-ignore
html.search.cancel.addEventListener('click', handleSearchToggle);

/**
 * Opens and closes the settings overlay.
 */
const handleSettingsToggle = (event) => {
  event.preventDefault();
  // @ts-ignore
  if (html.settings.dialog.hasAttribute('open')) {
    // @ts-ignore
    html.settings.dialog.removeAttribute('open');
  } else {
    // @ts-ignore
    html.settings.dialog.setAttribute('open', true);
  }
};

// @ts-ignore
html.settings.button.addEventListener('click', handleSettingsToggle);
// @ts-ignore
html.settings.cancel.addEventListener('click', handleSettingsToggle);

/**
 * Saves the selected theme and changes colors to light or dark
 * depending on the saved selection.
 */
const handleSettingsSave = (event) => {
  event.preventDefault();
  // @ts-ignore
  if (html.settings.theme.value === 'night') {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }
  // @ts-ignore
  html.settings.dialog.removeAttribute('open');
};

// @ts-ignore
html.settings.save.addEventListener('click', handleSettingsSave);

/**
 * Adds genre options to the select element on the search overlay.
 */
const createGenreOptionsHtml = (event) => {
  event.preventDefault();
  const fragment = document.createDocumentFragment();

  for (const [key, value] of Object.entries(genres)) {
    const option = document.createElement('option');
    option.value = key;
    option.innerText = value;
    fragment.appendChild(option);
  }

  // @ts-ignore
  html.search.genre.appendChild(fragment);
};

// @ts-ignore
html.search.button.addEventListener('click', createGenreOptionsHtml);

/**
 * Adds author options to the select element on the search overlay.
 */
const createAuthorOptionsHtml = (event) => {
  event.preventDefault();
  const fragment = document.createDocumentFragment();

  for (const [key, value] of Object.entries(authors)) {
    const option = document.createElement('option');
    option.value = key;
    option.innerText = value;
    fragment.appendChild(option);
  }

  // @ts-ignore
  html.search.author.appendChild(fragment);
};

// @ts-ignore
html.search.author.addEventListener('click', createAuthorOptionsHtml);

/**
 * Searches for books based on the selected search criteria.
 */
const handleSearchSubmit = (event) => {
  event.preventDefault();
  const search = {
    // @ts-ignore
    title: html.search.title.value,
    // @ts-ignore
    author: html.search.author.value,
    // @ts-ignore
    genre: html.search.genre.value,
  };

  const found = [];
  for (let x in search) {
    if (
      search[x] === '' ||
      search[x] === 'all authors' ||
      search[x] === 'all genres'
    ) {
      continue; // Skip this search field
    }

    let match = books.filter((book) => {
      if (x === 'title') {
        return book.title.toLowerCase().includes(search[x].toLowerCase());
      } else if (x === 'genre') {
        return book.genres.includes(search[x]);
      } else {
        return book[x] === search[x];
      }
    });

    if (match !== null && !found.includes(match)) {
      found.push(match);
    }
  }

  // @ts-ignore
  html.search.genre.value = 'All genres';
  // @ts-ignore
  html.search.author.value = 'All authors';
  // @ts-ignore
  html.search.title.value = '';

  return handleSearchResults(found[0]);
};

// @ts-ignore
html.search.submit.addEventListener('click', handleSearchSubmit);

/**
 * Displays the search results in the main body.
 * Shows an error message if no results are found.
 */
const handleSearchResults = (found) => {
  if (typeof found === 'undefined') {
    // @ts-ignore
    html.search.dialog.removeAttribute('open');
    return;
  } else if (found.length === 0) {
    // @ts-ignore
    area.innerHTML = '';
    // @ts-ignore
    html.list.message.classList = 'list__message_show';
  } else {
    // @ts-ignore
    html.list.message.classList = 'list__message';
    // @ts-ignore
    area.innerHTML = '';

    for (let i = 0; i < found.length; i++) {
      const book = found[i];
      const { image, title, author: authorId, id } = book;

      const element = document.createElement('button');
      // @ts-ignore
      element.classList = 'preview';
      element.setAttribute('id', id);
      element.innerHTML = /* html */ `
        <img class="preview__image" src="${image}"/>
        <div class="preview__info" data-box>
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[authorId]}</div>
        </div> `;
      fragment.appendChild(element);
    }

    // @ts-ignore
    area.appendChild(fragment);
  }

  // @ts-ignore
  html.search.dialog.removeAttribute('open');
};


