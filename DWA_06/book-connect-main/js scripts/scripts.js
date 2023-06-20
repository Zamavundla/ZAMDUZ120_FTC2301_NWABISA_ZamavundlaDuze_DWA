import { BOOKS_PER_PAGE, authors, genres, books, html } from "./data.js";

/**
 * Display book previews on the webpage.
 * @param {Array} books - Array of book objects to display as previews.
 */
const displayBookPreviews = (books) => {
  const fragment = document.createDocumentFragment();
  const area = document.querySelector('[data-list-items]');

  area.innerHTML = '';

  books.forEach((book) => {
    const { image, title, author, id } = book;

    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('id', id);
    element.innerHTML = `
      <img class="preview__image" src="${image}" />
      <div class="preview__info" data-box>
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>`;

    fragment.appendChild(element);
  });

  area.appendChild(fragment);
};

/**
 * Load and display a batch of books on the webpage.
 * @param {Event} event - The click event triggered by the "Show More" button.
 */
const loadBooks = (event) => {
  event.preventDefault();
  html.list.message.classList = 'list__message';

  const extracted = books.slice(index, index + BOOKS_PER_PAGE);
  const booksLeft = Math.min(BOOKS_PER_PAGE, books.length - index);

  html.list.button.textContent = `Show More (${booksLeft})`;
  displayBookPreviews(extracted);

  index += extracted.length;
};

html.list.button.addEventListener('click', loadBooks);
window.addEventListener('load', loadBooks);

document.addEventListener('click', (event) => {
  const button = event.target.closest('.preview');
  if (button === null) {
    return;
  } else {
    const book = books.find((book) => book.id === button.id);
    const year = new Date(book.published).getFullYear();
    const title = html.list.overlay.title;
    title.innerText = book.title;
    const image = book.image;
    const imageElement = document.querySelector('[data-list-image]');
    imageElement.src = image;
    const blurElement = document.querySelector('[data-list-blur]');
    blurElement.src = image;
    const description = html.list.overlay.description;
    description.innerText = book.description;
    const subtitle = html.list.overlay.subtitle;
    subtitle.innerText = `${authors[book.author]} (${year})`;
    html.list.overlay.active.setAttribute('open', true);
  }
});

/**
 * Toggle the search dialog's visibility.
 * @param {Event} event - The click event triggered by the search button or cancel button.
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
 * Toggle the settings dialog's visibility.
 * @param {Event} event - The click event triggered by the settings button or cancel button.
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
 * Save the settings and update the theme.
 * @param {Event} event - The click event triggered by the save button.
 */
const handleSettingsSave = (event) => {
  event.preventDefault();
  const selectedTheme = html.settings.theme.value;
  localStorage.setItem('theme', selectedTheme);
  applyTheme(selectedTheme);
  handleSettingsToggle(event);
};

html.settings.save.addEventListener('click', handleSettingsSave);

/**
 * Apply the selected theme to the webpage.
 * @param {string} theme - The selected theme to apply.
 */
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};

/**
 * Create the genre options in the search dialog.
 * @param {Event} event - The click event triggered by the search button.
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
 * Create the author options in the search dialog.
 * @param {Event} event - The change event triggered by the author select element.
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

html.search.author.addEventListener('change', createAuthorOptionsHtml);

/**
 * Handle the search form submission and display search results.
 * @param {Event} event - The submit event triggered by the search form.
 */
const handleSearchSubmit = (event) => {
  event.preventDefault();
  const search = {
    title: html.search.title.value.toLowerCase(),
    author: html.search.author.value,
    genre: html.search.genre.value,
  };

  const found = books.filter((book) => {
    const { title, author, genres } = book;
    const lowercasedTitle = title.toLowerCase();
    const lowercasedAuthor = authors[author].toLowerCase();
    const lowercasedGenre = genres.map((genre) => genre.toLowerCase());

    const isTitleMatch = search.title === "" || lowercasedTitle.includes(search.title);
    const isAuthorMatch = search.author === "" || lowercasedAuthor.includes(search.author.toLowerCase());
    const isGenreMatch = search.genre === "" || lowercasedGenre.includes(search.genre.toLowerCase());

    return isTitleMatch && isAuthorMatch && isGenreMatch;
  });

  handleSearchResults(found);
};

html.search.submit.addEventListener('click', handleSearchSubmit);

/**
 * Handle the search results and display book previews or an error message.
 * @param {Array} found - Array of books that match the search criteria.
 */
const handleSearchResults = (found) => {
  if (typeof found === 'undefined') {
    html.search.dialog.removeAttribute('open');
    return;
  } else if (found.length === 0) {
    const area = document.querySelector('[data-list-items]');
    area.innerHTML = '';
    html.list.message.classList = 'list__message_show';
  } else {
    html.list.message.classList = 'list__message';
    displayBookPreviews(found);
  }

  html.search.dialog.removeAttribute('open');
};

// Initial theme setup
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
}
