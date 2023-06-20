import { BOOKS_PER_PAGE, authors, genres, books, html } from "./data";

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
  html.list.message.classList = 'list__message';

  const extracted = books.slice(index, index + BOOKS_PER_PAGE);
  const booksLeft = books.length - index;
  html.list.button.textContent = `Show More (${booksLeft})`;

  for (let i = index; i < index + BOOKS_PER_PAGE; i++) {
    const book = books[i];
    const { image, title, author: authorId, id } = book;

    const element = document.createElement('button');
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

  area.appendChild(fragment);
  index += extracted.length;
};

html.list.button.addEventListener('click', loadBooks);
window.addEventListener('load', loadBooks);

/**
 * Event listener that displays the book preview when a book is clicked.
 */
document.addEventListener('click', (event) => {
  if (html.list.overlay.active.hasAttribute('open')) {
    html.list.overlay.active.removeAttribute('open');
  } else {
    const button = event.target.closest('.preview');
    if (button == null) {
      return;
    }

    const book = books.find((book) => book.id === button.id);
    const year = new Date(book.published).getFullYear();

    const { title, image, description, author: authorId } = book;
    const titleElement = html.list.overlay.title;
    titleElement.innerText = title;

    const imageElement = document.querySelector('[data-list-image]');
    imageElement.src = image;

    const blurElement = document.querySelector('[data-list-blur]');
    blurElement.src = image;

    const descriptionElement = html.list.overlay.description;
    descriptionElement.innerText = description;

    const subtitleElement = html.list.overlay.subtitle;
    subtitleElement.innerText = `${authors[authorId]} (${year})`;

    html.list.overlay.active.setAttribute('open', true);
  }
});

/**
 * Opens and closes the search overlay.
 */
const handleSearchToggle = (event) => {
  event.preventDefault();
  if (html.search.dialog.hasAttribute('open')) {
    html.search.dialog.removeAttribute('open');
  } else {
    html.search.dialog.setAttribute('open', true);
  }
};

html.search.button.addEventListener('click', handleSearchToggle);
html.search.cancel.addEventListener('click', handleSearchToggle);

/**
 * Opens and closes the settings overlay.
 */
const handleSettingsToggle = (event) => {
  event.preventDefault();
  if (html.settings.dialog.hasAttribute('open')) {
    html.settings.dialog.removeAttribute('open');
  } else {
    html.settings.dialog.setAttribute('open', true);
  }
};

html.settings.button.addEventListener('click', handleSettingsToggle);
html.settings.cancel.addEventListener('click', handleSettingsToggle);

/**
 * Saves the selected theme and changes colors to light or dark
 * depending on the saved selection.
 */
const handleSettingsSave = (event) => {
  event.preventDefault();
  if (html.settings.theme.value === 'night') {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }
  html.settings.dialog.removeAttribute('open');
};

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

  html.search.genre.appendChild(fragment);
};

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

  html.search.author.appendChild(fragment);
};

html.search.author.addEventListener('click', createAuthorOptionsHtml);

/**
 * Searches for books based on the selected search criteria.
 */
const handleSearchSubmit = (event) => {
  event.preventDefault();
  const search = {
    title: html.search.title.value,
    author: html.search.author.value,
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

  html.search.genre.value = 'All genres';
  html.search.author.value = 'All authors';
  html.search.title.value = '';

  return handleSearchResults(found[0]);
};

html.search.submit.addEventListener('click', handleSearchSubmit);

/**
 * Displays the search results in the main body.
 * Shows an error message if no results are found.
 */
const handleSearchResults = (found) => {
  if (typeof found === 'undefined') {
    html.search.dialog.removeAttribute('open');
    return;
  } else if (found.length === 0) {
    area.innerHTML = '';
    html.list.message.classList = 'list__message_show';
  } else {
    html.list.message.classList = 'list__message';
    area.innerHTML = '';

    for (let i = 0; i < found.length; i++) {
      const book = found[i];
      const { image, title, author: authorId, id } = book;

      const element = document.createElement('button');
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

    area.appendChild(fragment);
  }

  html.search.dialog.removeAttribute('open');
};
