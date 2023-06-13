//@ts-check

// Imports from other files.

import { 
    BOOKS_PER_PAGE,
    authors,
    genres,
    books,
} from './data';

import { 
    html,
    createBookButton,
    createMoreButton,
    setDisplayMode
} from './handlers';

/**
 * Current page number. Each page has 36 books.
 * 
 * @type {number}
 */
let page = 1;

if (!books || !books.length) {
    throw new Error ('Could not access books. Please reload the page.');
};

/**
 * A copy of the books array which can be used independently.
 * 
 * @type {Array}
 */
let matches = books;

/**
 * Document fragment of the first 36 books. Created on
 * initially loading the web app. This fragment contains books as buttons.
 * 
 * @type {DocumentFragment}
 */
const starting = document.createDocumentFragment();

createBookButton(starting, matches);

html.view.mainHtml.appendChild(starting);

/**
 * HTML fragment which will be appended to the search form.
 * Will be appended with the list of genres which are extracted from the
 * `genres` object using `id`.
 * 
 * @type {DocumentFragment}
 */
const genreHtml = document.createDocumentFragment();

/**
 * Creates an option from element which will be appended to
 * the genres fragment.
 * 
 * @type {HTMLOptionElement}
 */
const firstGenreElement = document.createElement('option');

firstGenreElement.value = 'any';
firstGenreElement.innerText = 'All Genres';
genreHtml.appendChild(firstGenreElement);

for (const [id, name] of Object.entries(genres)) {
    
    /**
     * Creates genres as from options on the genres fragment.
     * Genres are converted from `id` in
     * the `genres` object.
     * 
     * @type {HTMLOptionElement}
     */
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    genreHtml.appendChild(element);
};

html.search.searchGenres.appendChild(genreHtml);

/**
 * HTML fragment which will be appended to the search form.
 * Will be appended with the list of genres which are extracted from the
 * `authors` object using `id`.
 * 
 * @type {DocumentFragment}
 */
const authorsHtml = document.createDocumentFragment();

/**
 * Default author options element.
 * 
 * @type {HTMLOptionElement}
 */
const firstAuthorElement = document.createElement('option');
firstAuthorElement.value = 'any';
firstAuthorElement.innerText = 'All Authors';
authorsHtml.appendChild(firstAuthorElement);

for (const [id, name] of Object.entries(authors)) {
        
    /**
     * Author option element which will be appended to the search form.
     * This will be converted to author name using the name matching the
     * correspondong `id` on the authors object.
     * 
     * @type {HTMLOptionElement}
     */
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    authorsHtml.appendChild(element);
};

html.search.searchAuthors.appendChild(authorsHtml);

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.display.settingsTheme.value = 'night'
    setDisplayMode('night');
} else {
    html.display.settingsTheme.value.value = 'day';
    setDisplayMode('day');
}

html.scroll.moreButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;

html.search.searchCancel.addEventListener('click', () => {
    html.search.searchOverlay.open = false;
});

html.display.settingsCancel.addEventListener('click', () => {
    html.display.settingsOverlay.open = false;
});

html.search.searchButton.addEventListener('click', () => {
    html.search.searchOverlay.open = true ;
    html.search.seacrhTitle.focus();
});

html.display.settingButton.addEventListener('click', () => {
    html.display.settingsOverlay.open = true; 
});

html.preview.summaryClose.addEventListener('click', () => {
    html.preview.summaryOverlay.open = false;
});

html.display.settingsSubmit.addEventListener('submit', (event) => {
    event.preventDefault();

    /**
     * Empty formData object to store settings form input.
     * 
     * @type {FormData}
     */
    const formData = new FormData(event.target);

    /**
     * Object created from extracted `formData` entries.
     * 
     * @type {object}
     */
    const { theme } = Object.fromEntries(formData);

    setDisplayMode(theme);
    
    html.display.settingsOverlay.open = false;
});

html.search.searchSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    
    /**
     * Empty formData object to store search form input.
     * 
     * @type {FormData}
     */
    const formData = new FormData(event.target);

    /**
     * Object containg search form selections. Specifically title, author and genre.
     * This will be used to conduct a search.
     * 
     * @type {object}
     */
    const filters = Object.fromEntries(formData);

    /**
     * Empty array that will be used to store search results. Matching books
     * will be copied from the books array and into this array.
     * @type {Array}
     */
    const result = [];

    for (const book of books) {
        
        /**
         * Stores value to checks if the current book matches the genre specified
         * on the search form.
         * 
         * @type {boolean}
         */
        let genreMatch = filters.genre === 'any';

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true };
        };

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        };
    };

    page = 1;
    matches = result;

    if (result.length < 1) {
        html.search.seachMessage.classList.add('list__message_show')
    } else {
        html.search.seachMessage.classList.remove('list__message_show')
    };

    html.view.mainHtml.innerHTML = '';

    /**
     * Empty fragment which will be appended with search results.
     * @type {DocumentFragment}
     */
    const newItems = document.createDocumentFragment();

    createBookButton(newItems, result);

    html.view.mainHtml.appendChild(newItems)
    html.scroll.moreButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;

    createMoreButton(matches, page);

    window.scrollTo({top: 0, behavior: 'smooth'});
    html.search.searchOverlay.open = false
});

html.scroll.moreButton.addEventListener('click', () => {
    
    /**
     * Empty fragment which will be appended with 36 more books whenever the more button
     * is pressed.
     * 
     * @type {DocumentFragment}
     */
    const fragment = document.createDocumentFragment();

    createBookButton(fragment, matches);
    createMoreButton(matches, page);

    html.view.mainHtml.appendChild(fragment);
    page += 1;
});

html.view.mainHtml.addEventListener('click', (event) => {
    
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
            let result = null;
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            };
        
            active = result;
        };
    };
    
    if (active) {
        html.preview.summaryOverlay.open = true
        html.preview.summaryBlur.src = active.image
        html.preview.summaryImage.src = active.image
        html.preview.summaryTitle.innerText = active.title
        html.preview.summarySubTitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        html.preview.summaryDescription.innerText = active.description
    };
});