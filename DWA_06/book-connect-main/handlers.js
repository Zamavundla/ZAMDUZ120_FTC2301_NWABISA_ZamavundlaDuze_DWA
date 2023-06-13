//@ts-check

import { authors, books, BOOKS_PER_PAGE } from './data.js';

// DOM Data

/**
 * @type {object} - An object containg the HTML's DOM elemnts
 * using the querySerlector method.
 * @prop {object} view - DOM elemnts that are related to the main HTML contents.
 * @prop {object} scroll - DOM elements that affect the 'show more' button which is
 * used to show the next 36 books.
 * @prop {object} preview - DOM elements to put together the book preview which are
 * displayed whenever a book button is clicked. The preview contains the title, subtitle,
 *  author, year of publication and image of the book.
 * @prop {object} display - DOM elements to manipulate the settings overlay which appears
 * when the settings button is clicked. Display setting determine the current theme to view
 * the web-app. Night or day.
 * @prop {object} search - DOM elements to manipulay the search overlay which eppears when
 * the search button is clicked. The search overlay has a search form with input for title,
 * and options for author and genre.
 */
export const html = {
    view: {
        mainHtml: document.querySelector('[data-list-items]'),
    },
    scroll: {
        moreButton: document.querySelector('[data-list-button]'),
    },
    preview: {
        summaryList: document.querySelectorAll('[data-preview]'),
        summaryOverlay: document.querySelector('[data-list-active]'),
        summaryBlur: document.querySelector('[data-list-blur]'),
        summaryImage: document.querySelector('[data-list-image]'),
        summaryTitle: document.querySelector('[data-list-title]'),
        summarySubTitle: document.querySelector('[data-list-subtitle]'),
        summaryDescription: document.querySelector('[data-list-description]'),
        summaryClose: document.querySelector('[data-list-close]'),
    },
    display: {
        settingsOverlay: document.querySelector('[data-settings-overlay]'),
        settingButton: document.querySelector('[data-header-settings]'),
        settingsTheme: document.querySelector('[data-settings-theme]'),
        settingsCancel: document.querySelector('[data-settings-cancel]'),
        settingsSubmit: document.querySelector('[data-settings-form]'),
    },
    search: {
        searchCancel: document.querySelector('[data-search-cancel]'),
        searchButton: document.querySelector('[data-header-search]'),
        searchOverlay: document.querySelector('[data-search-overlay]'),
        seacrhTitle: document.querySelector('[data-search-title]'),
        searchSubmit: document.querySelector('[data-search-form]'),
        searchAuthors: document.querySelector('[data-search-authors]'),
        searchGenres: document.querySelector('[data-search-genres]'),
        seachMessage: document.querySelector('[data-list-message]'),
    },
};

/**
 * Creates a button for a specififc slice of 36 books. Each button contains an
 * image, book title and author.
 * 
 * @param {DocumentFragment} child - An HTML fragment on which the buttons are
 *                              to be appended.
 * @param {array} books - A slice of the books array containing books as
 *                          objects.
 * @returns {DocumentFragment}
 */
export const createBookButton = (child, books) => {
    for (const { author, id, image, title } of books.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

        child.appendChild(element);
    };
    return child;
};

/**
 * Creates the more buttom HTML element. This is updated with
 * the number of books remaining to be shown everytime it is clicked. 
 * 
 * @param {array} booksArray - An array containing books as objects.
 * @param {number} page - The current page that is shown. Each page shows
 * 36 book at a time.
 */
export const createMoreButton = (booksArray, page) => {
    html.scroll.moreButton.innerHTML = 
    `
        <span>Show more</span>
        <span class="list__remaining"> (${(booksArray.length - (page * BOOKS_PER_PAGE)) > 0 ? (booksArray.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `
    html.scroll.moreButton.disabled = (booksArray.length - (page * BOOKS_PER_PAGE)) <= 0;
};

/**
 * Changes display settings on the HTML settings overlay.
 * 
 * @param {'day' | 'night'} theme  
 */
export const setDisplayMode = (theme) => {
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
};