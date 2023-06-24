/* eslint-disable */

import { books, genres, authors, BOOKS_PER_PAGE } from './data.js';

import { descriptionOverlay } from './functions.js';

const previewTemplate = document.createElement('template');
previewTemplate.innerHTML = `
  <style>
  :root {
    --color-blue: 0, 150, 255;
    --color-force-dark: 10, 10, 20;
    --color-force-light: 255, 255, 255;
    --color-dark: 10, 10, 20;
    --color-light: 255, 255, 255;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --color-dark:  255, 255, 255; 
      --color-light: 10, 10, 20;
    }
  }
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    min-height: 100vh;
    min-width: 100%;
    font-family: Roboto, sans-serif;
    color: rgba(var(--color-dark), 0.9);
    background: linear-gradient(0deg, rgba(var(--color-dark), 0.2), rgba(var(--color-dark), 0.1)), rgba(var(--color-light), 1);
  }
  @keyframes enter {
    from {
      transform: translateY(10rem);
    }
    to {
      transform: translateY(0);
    }
  }
  .list {
    padding-bottom: 10rem;
  }
  .list__message {
    display: none;
    padding: 10rem 4rem 2rem;
    text-align: center;
  }
  .list__message_show {
    display: block;
  }
  .list__items {
    display: grid;
    padding: 2rem 1rem;
    grid-template-columns: 1fr;
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
    margin: 0 auto;
    width: 100%;
  }
  @media (min-width: 50rem) {
    .list__items {
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 0.75rem;
      grid-row-gap: 0.75rem;
    }
  }
  @media (min-width: 100rem) {
    .list__items {
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 0.75rem;
      grid-row-gap: 0.75rem;
    }
  }
  @media (min-width: 150rem) {
    .list__items {
      grid-template-columns: repeat(8, 1fr);
      grid-column-gap: 0.75rem;
      grid-row-gap: 0.75rem;
    }
  }
  .list__button {
    font-family: Roboto, sans-serif;
    transition: background-color 0.1s;
    border-width: 0;
    border-radius: 6px;
    height: 2.75rem;
    cursor: pointer;
    width: 50%;
    background-color: rgba(var(--color-blue), 1);
    color: rgba(var(--color-force-light), 1);
    font-size: 1rem;
    border: 1px solid rgba(var(--color-blue), 1);
    max-width: 10rem;
    margin: 0 auto;
    display: block;
  }
  .list__remaining {
    opacity: 0.5;
  }
  .list__button:not(:disabled) hover {
    background-color: rgba(var(--color-blue), 0.8);
    color: rgba(var(--color-force-light), 1);
  }
  .list__button:disabled {
    cursor: not-allowed;
    opacity: 0.2;
  }

  /* preview */
  .preview {
    border-width: 0;
    width: 100%;
    font-family: Roboto, sans-serif;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    text-align: left;
    border-radius: 8px;
    border: 1px solid rgba(var(--color-dark), 0.15);
    background: rgba(var(--color-light), 1);
  }
  @media (min-width: 60rem) {
    .preview {
      padding: 1rem;
    }
  }
  .preview_hidden {
    display: none;
  }

  .preview:hover {
    background: rgba(var(--color-blue), 0.05);
  }

  .preview__image {
    width: 48px;
    height: 70px;
    object-fit: cover;
    background: grey;
    border-radius: 2px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  }
  .preview__info {
    padding: 1rem;
  }
  .preview__title {
    margin: 0 0 0.5rem;
    font-weight: bold;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    color: rgba(var(--color-dark), 0.8)
  }
  .preview__author {
    color: rgba(var(--color-dark), 0.4);
  }
  /* overlay */

  .overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-width: 0;
    box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
    animation-name: enter;
    animation-duration: 0.6s;
    z-index: 10;
    background-color: rgba(var(--color-light), 1);
  }

  @media (min-width: 30rem) {
    .overlay {
      max-width: 30rem;
      left: 0%;
      top: 0;
      border-radius: 8px;;
    }
  }

  .overlay__form {
    padding-bottom: 0.5rem;
    margin: 0 auto;
  }

  .overlay__row {
    display: flex;
    gap: 0.5rem;
    margin: 0 auto;
    justify-content: center;
  }

  .overlay__button {
    font-family: Roboto, sans-serif;
    background-color: rgba(var(--color-blue), 0.1);
    transition: background-color 0.1s;
    border-width: 0;
    border-radius: 6px;
    height: 2.75rem;
    cursor: pointer;
    width: 50%;
    color: rgba(var(--color-blue), 1);
    font-size: 1rem;
    border: 1px solid rgba(var(--color-blue), 1);
  }

  .overlay__button_primary {
    background-color: rgba(var(--color-blue), 1);
    color: rgba(var(--color-force-light), 1);
  }

  .overlay__button:hover {
    background-color: rgba(var((var(--color-blue))), 0.2);
  }


  .overlay__button_primary:hover {
    background-color: rgba(var(--color-blue), 0.8);
    color: rgba(var(--color-force-light), 1);
  }

  .overlay__input {
    width: 100%;
    margin-bottom: 0.5rem;
    background-color: rgba(var(--color-dark), 0.05);
    border-width: 0;
    border-radius: 6px;
    width: 100%;
    height: 4rem;
    color: rgba(var(--color-dark), 1);
    padding: 1rem 0.5rem 0 0.75rem;
    font-size: 1.1rem;
    font-weight: bold;
    font-family: Roboto, sans-serif;
    cursor: pointer;
  }

  .overlay__input_select {
    padding-left: 0.5rem;
  }

  .overlay__field {
    position: relative;
    display: block;
  }

  .overlay__label {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    font-size: 0.85rem;
    color: rgba(var(--color-dark), 0.4);
  }

  .overlay__input:hover {
    background-color: rgba(var(--color-dark), 0.1);
  }

  .overlay__title {
    padding: 1rem 0 0.25rem;
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1;
    letter-spacing: -0.1px;
    max-width: 25rem;
    margin: 0 auto;
    color: rgba(var(--color-dark), 0.8)
  }

  .overlay__blur {
    width: 100%;
    height: 200px;
    filter: blur(10px);
    opacity: 0.5;
    transform: scale(2);
  }

  .overlay__image {
    max-width: 10rem;
    position: absolute;
    top: 1.5m;
    left: calc(50% - 5rem);
    border-radius: 2px;
    box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
  }

  .overlay__data {
    font-size: 0.9rem;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    color: rgba(var(--color-dark), 0.8)
  }

  .overlay__data_secondary {
    color: rgba(var(--color-dark), 0.6)
  }

  .overlay__content {
    padding: 2rem 1.5rem;
    text-align: center;
    padding-top: 3rem;
  }

  .overlay__preview {
    overflow: hidden;
    margin: -1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay__background {
    background: rgba(var(--color-dark), 0.6);
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }
  /* backdrop */
  .backdrop {
    display: none;
    background: rgba(var(--color-dark), 0.3);
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }
  .overlay[open] ~ .backdrop {
    display: block;
  }
  </style>
  <main class="list">
        <div class="list__items" data-list-items></div>
        <div class="list__message" data-list-message>No results found. Your filters might be too narrow.</div>
        <button class="list__button" data-list-button></button>
  </main>
`;

/**
 * This class is the custom HTML element for the main section
 * of the page that holds the book previews.
 */
class BookPreview extends HTMLElement {
  constructor() {
    super();

    // Create the variables to hold the DOM elements in the constructor.
    this.FRAGMENT = document.createDocumentFragment();
    this.HOME_PAGE = null;
    this.SHOW_MORE_BTN = null;
    this.BOOK_SUMMARY = null;

    // Use this on functions to bind them to this class and 
    //the bind keyword.
    this.createBookButtons = this.createBookButtons.bind(this);
    this.updateBooksLeft = this.updateBooksLeft.bind(this);
    this.appendBooks = this.appendBooks.bind(this);
    this.showMoreAction = this.showMoreAction.bind(this);
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(previewTemplate.content.cloneNode(true));

    // Get references to the necessary elements
    this.HOME_PAGE = shadowRoot.querySelector('[data-list-items]');
    this.SHOW_MORE_BTN = shadowRoot.querySelector('[data-list-button]');

    // Load initial books
    this.appendBooks(books);

    // Attach event listener to the show more button
    this.SHOW_MORE_BTN.addEventListener('click', this.showMoreAction);
  }

  /**
   * @typedef {object} Div
   */
  /**
   * This creates the button element then loads the book information
   * before displaying it on the html page.
   *
   * @param {Array} book
   * @returns {Div} FRAGMENT
   */
  createBookButtons = (book) => {
    /* create a button element for the books so each book is
      in its own card */
    const button = document.createElement('button');
    // create a class and call it preview
    button.classList.add('preview');
    // Set the button's data-preview attribute to the book's id.
    button.dataset.preview = book.id;
    // Set the button's inner HTML to the book's title and author.
    // eslint-disable-next-line operator-linebreak
    button.innerHTML = /* HTML markup for the book cards */
      `
	 <img class="preview__image" src="${book.image}" />
	 <div class="preview__info">
	   <h3 class="preview__title">${book.title}</h3>
	   <div class="preview__author">${authors[book.author]}</div>
	 </div>
   `;
    // Append the button to the FRAGMENT.
    this.FRAGMENT.appendChild(button);

    button.addEventListener('click', () => {
      descriptionOverlay(book);
    })
    return this.FRAGMENT;
  };

  /**
   * This function updates the number of books left and then prints
   * that number on the button used to show more books.
   * @returns {Number} - booksLeft is the number of books left that haven't been
   * loaded to the page
   */
  updateBooksLeft = () => {
    const booksOnPageCount = this.HOME_PAGE.children.length;
    const booksLeft = books.length - booksOnPageCount;
    return { booksLeft, booksOnPageCount };
  };

  /**
 * This function loads the home page of the website with
 * the books shown in a list of 36 at a time.
 * @param {object} books
 */
  appendBooks = (books) => {

    books.slice(0, BOOKS_PER_PAGE).forEach((book) => {
      this.createBookButtons(book);
    });

    // Append the fragment to the data-list-items div.
    this.HOME_PAGE.appendChild(this.FRAGMENT);
    this.SHOW_MORE_BTN.disabled = false;
    const { booksLeft } = this.updateBooksLeft();
    this.SHOW_MORE_BTN.innerHTML = `Show more <span class = "list__remaining">(${booksLeft})</span>`;
  };

  /**
     * This function will add more books to the page and update
     * the number in the show more button everytime it is clicked
     * until there are no more books left in the books object.
     *@param { Event } event
     */
  showMoreAction = (event) => {
    event.preventDefault();
    const { booksLeft, booksOnPageCount } = this.updateBooksLeft();

    if (booksLeft > 36) {
      books.slice(booksOnPageCount, booksOnPageCount + 36).forEach((book) => {
        this.createBookButtons(book);
      });
    } else {
      books.slice(booksOnPageCount).forEach((book) => {
        this.createBookButtons(book);
      });
    }

    this.HOME_PAGE.appendChild(this.FRAGMENT);
    const { booksLeft: updatedBooksLeft } = this.updateBooksLeft();
    if (updatedBooksLeft === 0) {
      this.SHOW_MORE_BTN.innerHTML = `Show more <span class="list__remaining">(${updatedBooksLeft})</span>`;
      this.SHOW_MORE_BTN.disabled = true;
    } else {
      this.SHOW_MORE_BTN.innerHTML = `Show more <span class="list__remaining">(${updatedBooksLeft})</span>`;
    };
  };
}
customElements.define('book-preview-list', BookPreview);
