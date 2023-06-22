//@ts-nocheck

import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

/**
 * @typedef {object} HTMLSelectors
 * @prop {HTMLButtonElement} button - The HTML button element.
 * @prop {HTMLDivElement} dialog - The HTML div element representing a dialog.
 * @prop {HTMLFormElement} form - The HTML form element.
 * @prop {HTMLSelectElement} theme - The HTML select element for theme selection.
 * @prop {HTMLButtonElement} cancel - The HTML button element for cancel action.
 * @prop {HTMLButtonElement} save - The HTML button element for save action.
 */

/**
 * @typedef {object} ListOverlayElements
 * @prop {HTMLElement} active - The active overlay element.
 * @prop {HTMLImageElement} blur - The HTML image element representing blur effect.
 * @prop {HTMLHeadingElement} title - The HTML heading element for book title.
 * @prop {HTMLParagraphElement} subtitle - The HTML paragraph element for book subtitle.
 * @prop {HTMLDivElement} description - The HTML div element for book description.
 * @prop {HTMLButtonElement} close - The HTML button element for closing the overlay.
 * @prop {NodeListOf<HTMLImageElement>} image - The HTML image elements representing book images.
 */

/**
 * @typedef {object} HTMLSections
 * @prop {HTMLSelectors} settings - The settings section HTML selectors.
 * @prop {HTMLSelectors} search - The search section HTML selectors.
 * @prop {object} list - The list section HTML selectors.
 * @prop {HTMLUListElement} list.items - The HTML ul element for list items.
 * @prop {HTMLDivElement} list.message - The HTML div element for list message.
 * @prop {HTMLButtonElement} list.button - The HTML button element for show more action.
 * @prop {NodeListOf<HTMLButtonElement>} list.preview - The HTML button elements for book preview.
 * @prop {ListOverlayElements} list.overlay - The elements of book preview overlay.
 */

/** @type {HTMLSections} */ `html`
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
  }
};

/** @type {DocumentFragment} */
const fragment = document.createDocumentFragment();

/** @type {HTMLElement} */
const area = document.querySelector('[data-list-items]');

/** @type {number} */
let index = 0;

/**
 * Loads books on page load or show more action.
 * @param {Event} event - The event object.
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
    element.innerHTML = `
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
 * Displays the books on the page.
 * @param {Array} booksArray - The array of book objects to display.
 */
const displayBooks = (booksArray) => {
  html.list.items.innerHTML = '';

  if (booksArray.length === 0) {
    html.list.message.classList.add('list__message_show');
  } else {
    html.list.message.classList.remove('list__message_show');

    booksArray.forEach((book) => {
      const { image, title, author, id } = book;

      const element = document.createElement('button');
      element.classList.add('preview');
      element.setAttribute('id', id);
      element.innerHTML = `
        <img class="preview__image" src="${image}" alt="Book cover"/>
        <div class="preview__info" data-box>
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>`;

      html.list.items.appendChild(element);
    });
  }
};

/**
 * Handles book preview.
 * @param {object} book - The book object.
 * @param {string} book.title - The title of the book.
 * @param {string} book.image - The image URL of the book.
 * @param {string} book.description - The description of the book.
 * @param {number} book.author - The author ID of the book.
 * @param {Date} book.published - The published date of the book.
 */
const handleBookPreview = (book) => {
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
};

document.addEventListener('click', (event) => {
  if (html.list.overlay.active.hasAttribute('open')) {
    html.list.overlay.active.removeAttribute('open');
  } else {
    const button = event.target.closest('.preview');
    if (button == null) {
      return;
    }

    const book = books.find((book) => book.id === button.id);
    handleBookPreview(book);
  }
});

/**
 * Toggles search section visibility.
 * @param {Event} event - The event object.
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
 * Toggles settings section visibility.
 * @param {Event} event - The event object.
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
 * Handles save action in settings section.
 * @param {Event} event - The event object.
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
 * Creates HTML options for genres in search section.
 * @param {Event} event - The event object.
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
 * 
 * @param {MouseEvent} event - The click event object.
 */
const createAuthorOptionsHtml = (event) => {
  event.preventDefault();
  const fragment = document.createDocumentFragment();

  // Add "All authors" option
  const allAuthorsOption = document.createElement('option');
  allAuthorsOption.value = '';
  allAuthorsOption.innerText = 'All authors';
  fragment.appendChild(allAuthorsOption);

  for (const [key, value] of Object.entries(authors)) {
    const option = document.createElement('option');
    option.value = key;
    option.innerText = value;
    fragment.appendChild(option);
  }

  html.search.author.innerHTML = '';
  html.search.author.appendChild(fragment);
};

html.search.button.addEventListener('click', createAuthorOptionsHtml);
window.addEventListener('DOMContentLoaded', createAuthorOptionsHtml);

/**
 * Searches for books based on the selected search criteria.
 * 
 * @param {MouseEvent} event - The click event object.
 */
const handleSearchSubmit = (event) => {
  event.preventDefault();
  const search = {
    title: html.search.title.value,
    author: html.search.author.value,
    genre: html.search.genre.value,
  };

  const found = books.filter((book) => {
    const { title, author: authorId, genres } = book;

    const isTitleMatch = title.toLowerCase().includes(search.title.toLowerCase());
    const isAuthorMatch = search.author === '' || search.author === authorId;
    const isGenreMatch = search.genre === '' || genres.includes(search.genre);

    return isTitleMatch && isAuthorMatch && isGenreMatch;
  });

  html.search.genre.value = '';
  html.search.author.value = '';
  html.search.title.value = '';

  handleSearchResults(found);
};

html.search.submit.addEventListener('click', handleSearchSubmit);
/**
 * Handles search results.
 * @param {object[]} found - The array of found books.
 */
const handleSearchResults = (found) => {
  if (typeof found === 'undefined') {
    html.search.dialog.removeAttribute('open');
    return;
  } else if (found.length === 0) {
    area.innerHTML = '';
    html.list.message.classList = 'list__message_show';
  } else {
    html.search.dialog.removeAttribute('open');
    area.innerHTML = '';
    found.forEach((book) => {
      const { image, title, author: authorId, id } = book;

      const element = document.createElement('button');
      element.classList = 'preview';
      element.setAttribute('id', id);
      element.innerHTML = `
        <img class="preview__image" src="${image}"/>
        <div class="preview__info" data-box>
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[authorId]}</div>
        </div>`;

      fragment.appendChild(element);
    });

    area.appendChild(fragment);
  }
};


/**
 * Filters the books based on search criteria.
 * @param {Event} event - The event object.
 */
const handleSearchFilter = (event) => {
  const titleFilter = html.search.title.value.toLowerCase();
  const genreFilter = html.search.genre.value;
  const authorFilter = html.search.author.value;

  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(titleFilter);
    const genreMatch = genreFilter === '' || book.genre === genreFilter;
    const authorMatch = authorFilter === '' || book.author === parseInt(authorFilter);

    return titleMatch && genreMatch && authorMatch;
  });

  displayBooks(filteredBooks);
};

html.search.title.addEventListener('keyup', handleSearchFilter);
html.search.genre.addEventListener('change', handleSearchFilter);
html.search.author.addEventListener('change', handleSearchFilter);

