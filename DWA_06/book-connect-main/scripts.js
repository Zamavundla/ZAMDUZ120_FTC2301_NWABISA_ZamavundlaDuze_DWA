import { BOOKS_PER_PAGE, authors, genres, books, html } from "./data.js";

//variables with global scope to use across functions
const fragment = document.createDocumentFragment();
const area = document.querySelector('[data-list-items]')
let index = 0
html.list.button.textContent = "Show More" + "(" + books.length + ")"
/**Loads first 36 books when page loads. Each time the 'show more' button
 * is clicked then another 36 will load until the end of the list.
 * Uses the global index variable, initally set to 0, to track
 * how many books have been loaded so far.
 */
const loadBooks = (event) => {
    event.preventDefault()
    html.list.message.classList = 'list__message'
    const extracted = books.slice(index, index + BOOKS_PER_PAGE);
    const booksLeft = books.length - index
    html.list.button.textContent = "Show More" + "(" + booksLeft + ")"
    for (let i = index; i < index + BOOKS_PER_PAGE; i++) {
        const book = books[i]
        const image = book.image
        const title = book.title
        const authorId = book.author
        const id = book.id
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('id', id)
        element.innerHTML = /* html */ `
            <img class="preview__image"src="${image}"/>
            <div class="preview__info" data-box>
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div> `
        fragment.appendChild(element)   
    }
    area.appendChild(fragment)
    index += extracted.length;
}
html.list.button.addEventListener('click', loadBooks)
window.addEventListener('load', loadBooks)

/**Event listener which displays the preview for each book that is 
 * displayed in window. Function is defined inside the event listener
 * because it needs to work for multiple buttons.
 */
document.addEventListener('click', (event) => {
    if (html.list.overlay.active.hasAttribute('open')) {
        html.list.overlay.active.removeAttribute('open')
        
    } else {
        const button = event.target.closest('.preview')
        if (button == null) {
            return;
        }
        const book = books.find(book => book.id === button.id)
        const year = new Date(book.published).getFullYear()
        const title = html.list.overlay.title
        title.innerText = book.title
        const image = book.image
        const imageElement = document.querySelector('[data-list-image]')
        imageElement.src = image
        const blurElement = document.querySelector('[data-list-blur]')
        blurElement.src=image
        const description = html.list.overlay.description
        description.innerText = book.description
        const subtitle = html.list.overlay.subtitle
        subtitle.innerText = `${authors[book.author]} (` + `${year})`
        html.list.overlay.active.setAttribute('open', true)
    }
})
  
/**Opens and closes search overlay */
const handleSearchToggle = (event) => {
    event.preventDefault();
    if (html.search.dialog.hasAttribute('open')) {
        html.search.dialog.removeAttribute('open')
    } else {
        html.search.dialog.setAttribute('open', true)
    }
}
html.search.button.addEventListener('click', handleSearchToggle)
html.search.cancel.addEventListener('click', handleSearchToggle)

/**Opens and closes settings overlay */
const handleSettingsToggle = (event) => {
    event.preventDefault();
    if (html.settings.dialog.hasAttribute('open')) {
        html.settings.dialog.removeAttribute('open')
    } else {
        html.settings.dialog.setAttribute('open', true)
    }
}
html.settings.button.addEventListener('click', handleSettingsToggle)
html.settings.cancel.addEventListener('click', handleSettingsToggle)

/**Saves selected theme and changes colors to light or dark 
 * depending on saved selection */
const handleSettingsSave = (event) => {
    event.preventDefault();
    console.log(html.settings.theme.value)
    if (html.settings.theme.value == 'night') {
        document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } else {
        document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty("--color-light", "255, 255, 255");
    }
    html.settings.dialog.removeAttribute('open')

}
html.settings.save.addEventListener('click', handleSettingsSave)

/**Adds values from the genres object in data.js to the select
 * element on the search overlay
  */
const createGenreOptionsHtml = (event) => {
    event.preventDefault();
    const fragment = document.createDocumentFragment();

    for (const [key, value] of Object.entries(genres)) {
        const option = document.createElement('option')
        option.value = key;
        option.innerText = value;
        fragment.appendChild(option)
    }

    html.search.genre.appendChild(fragment);
};
html.search.button.addEventListener('click', createGenreOptionsHtml)

/**Adds values from the authors object in data.js to the select
 * element on the search overlay */
const createAuthorOptionsHtml = (event) => {
    event.preventDefault();
    const fragment = document.createDocumentFragment();

    for (const [key, value] of Object.entries(authors)) {
        const option = document.createElement('option')
        option.value = key;
        option.innerText = value;
        fragment.appendChild(option)
        
    }
    html.search.author.appendChild(fragment);
   
};
html.search.author.addEventListener('click', createAuthorOptionsHtml)

/**Creates an array of search results by taking the input values from the search 
 * overlay and creates an object named 'search'. Filters through title, genre and author
 * and selects matches from the books object in data.js
*/
const handleSearchSubmit = (event) => {
    event.preventDefault();
    const search = {
      "title": html.search.title.value,
      "author": html.search.author.value,
      "genre": html.search.genre.value
    };
    const found = [];
    for (let x in search) {
      if (search[x] === "" || search[x] === "all authors" || search[x] === "all genres") {
        continue; // skip this search field
      }
      let match = books.filter(book => {
        if (x === "title") {
          return book.title.toLowerCase().includes(search[x].toLowerCase()); // check if title includes search phrase
        } else if (x === "genre") {
          return book.genres.includes(search[x]); // check if search value is included in genre array
        } else {
          return book[x] === search[x];
        }
      });  
      if (match !== null && !found.includes(match)) {
          found.push(match);
      }
    }
    html.search.genre.value = 'All genres'
    html.search.author.value = 'All authors'
    html.search.title.value = ''
    console.log(found)
    return handleSearchResults(found[0])
}
html.search.submit.addEventListener('click', handleSearchSubmit)

/**Creates search result elements using the results from handleSearchSubmit(). 
 * Shows the results in the main body, unless no results are found in which case
 * an error message shall appear
 */
const handleSearchResults = (found) => {

    if (typeof found === 'undefined') {
        html.search.dialog.removeAttribute('open')
        return;
    } else if (found.length === 0) {
        area.innerHTML = ''
        html.list.message.classList = 'list__message_show'
         
    } else {
        html.list.message.classList = 'list__message'
        area.innerHTML = ''
        for (let i = 0; i < found.length; i++) {
            const book = found[i]
            const image = book.image
            const title = book.title
            const authorId = book.author
            const id = book.id
            const element = document.createElement('button')
            element.classList = 'preview'
            element.setAttribute('id', id)
            element.innerHTML = /* html */ `
            <img class="preview__image"src="${image}"/>
            <div class="preview__info" data-box>
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div> `
       fragment.appendChild(element)
         
        }

        area.appendChild(fragment)
        
    } 
    html.search.dialog.removeAttribute('open')
}



