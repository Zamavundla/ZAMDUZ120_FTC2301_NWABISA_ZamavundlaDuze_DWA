// @ts-nocheck

import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

/**
 * Represents a BookStore.
 * @class
 */
class BookStore {
  /**
   * Create a BookStore.
   * @param {object} html - The HTML selectors for the book store.
   */
  constructor(html) {
    this.html = html;
    this.index = 0;
    this.fragment = document.createDocumentFragment();
    this.area = document.querySelector('[data-list-items]');
    this.loadBooks = this.loadBooks.bind(this);
  }

  /**
   * Loads the next set of books when the "Show More" button is clicked.
   * Displays BOOKS_PER_PAGE number of books each time.
   * Uses the index variable to track the number of books loaded so far.
   * 
   * @param {Event} event - The click event object.
   */
  loadBooks(event) {
    event.preventDefault();
    this.html.list.message.classList = 'list__message';

    const extracted = books.slice(this.index, this.index + BOOKS_PER_PAGE);
    const booksLeft = books.length - this.index;
    this.html.list.button.textContent = `Show More (${booksLeft})`;

    for (let i = this.index; i < this.index + BOOKS_PER_PAGE; i++) {
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

      this.fragment.appendChild(element);
    }

    this.area.appendChild(this.fragment);
    this.index += extracted.length;
  }

  /**
   * Event listener that displays the book preview when a book is clicked.
   * 
   * @param {MouseEvent} event - The click event object.
   */
  displayBookPreview(event) {
    if (this.html.list.overlay.active.hasAttribute('open')) {
      this.html.list.overlay.active.removeAttribute('open');
    } else {
      const button = event.target.closest('.preview');
      if (button == null) {
        return;
      }

      const book = books.find((book) => book.id === button.id);
      const year = new Date(book.published).getFullYear();

      const { title, image, description, author: authorId } = book;
      const titleElement = this.html.list.overlay.title;
      titleElement.innerText = title;

      const imageElement = this.html.list.overlay.image[0];
      imageElement.src = image;

      const blurElement = this.html.list.overlay.blur;
      blurElement.src = image;

      const descriptionElement = this.html.list.overlay.description;
      descriptionElement.innerText = description;

      const subtitleElement = this.html.list.overlay.subtitle;
      subtitleElement.innerText = `${authors[authorId]} (${year})`;

      this.html.list.overlay.active.setAttribute('open', true);
    }
  }

  /**
   * Opens and closes the search overlay.
   * 
   * @param {MouseEvent} event - The click event object.
   */
  toggleSearchOverlay(event) {
    event.preventDefault();
    if (this.html.search.dialog.hasAttribute('open')) {
      this.html.search.dialog.removeAttribute('open');
    } else {
      this.html.search.dialog.setAttribute('open', true);
    }
  }

  /**
   * Opens and closes the settings overlay.
   * 
   * @param {MouseEvent} event - The click event object.
   */
  toggleSettingsOverlay(event) {
    event.preventDefault();
    if (this.html.settings.dialog.hasAttribute('open')) {
      this.html.settings.dialog.removeAttribute('open');
    } else {
      this.html.settings.dialog.setAttribute('open', true);
    }
  }

  /**
   * Saves the selected theme and changes colors to light or dark
   * depending on the saved selection.
   * 
   * @param {MouseEvent} event - The click event object.
   */
  saveSettings(event) {
    event.preventDefault();
    if (this.html.settings.theme.value === 'night') {
      document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
      document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
      document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
      document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    this.html.settings.dialog.removeAttribute('open');
  }

  /**
   * Adds genre options to the select element on the search overlay.
   * 
   * @param {MouseEvent} event - The click event object.
   */
  createGenreOptionsHtml(event) {
    event.preventDefault();
    const fragment = document.createDocumentFragment();

    for (const [key, value] of Object.entries(genres)) {
      const option = document.createElement('option');
      option.value = key;
      option.innerText = value;
      fragment.appendChild(option);
    }

    this.html.search.genre.appendChild(fragment);
  }

  /**
   * Adds author options to the select element on the search overlay.
   * 
   * @param {MouseEvent} event - The click event object.
   */
  createAuthorOptionsHtml(event) {
    event.preventDefault();
    const fragment = document.createDocumentFragment();

    for (const [key, value] of Object.entries(authors)) {
      const option = document.createElement('option');
      option.value = key;
      option.innerText = value;
      fragment.appendChild(option);
    }

    this.html.search.author.appendChild(fragment);
  }

  /**
   * Searches for books based on the selected search criteria.
   * 
   * @param {MouseEvent} event - The click event object.
   */
  handleSearchSubmit(event) {
    event.preventDefault();
    const search = {
      title: this.html.search.title.value,
      author: this.html.search.author.value,
      genre: this.html.search.genre.value,
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

    this.html.search.genre.value = 'All genres';
    this.html.search.author.value = 'All authors';
    this.html.search.title.value = '';

    this.handleSearchResults(found[0]);
  }

  /**
   * Displays the search results in the main body.
   * Shows an error message if no results are found.
   * 
   * @param {Array} found - Array of found books.
   */
  handleSearchResults(found) {
    if (typeof found === 'undefined') {
      this.html.search.dialog.removeAttribute('open');
      return;
    } else if (found.length === 0) {
      this.html.list.items.innerHTML = '';
      this.html.list.message.classList = 'list__message_show';
    } else {
      this.html.search.dialog.removeAttribute('open');
      this.html.list.items.innerHTML = '';
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

        this.fragment.appendChild(element);
      });

      this.area.appendChild(this.fragment);
    }
  }
}

// Create an instance of the BookListApp class
const bookListApp = new BookListApp();

// Initialize the app
bookListApp.initialize();
