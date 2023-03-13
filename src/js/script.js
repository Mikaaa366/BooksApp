
{
  'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    book: {
      image: '.books-list .book__image',
    },
  };
  const classFav = {
    favorite: 'favorite',
  };
  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };
  
  const render = function() {
    for(const book of dataSource.books){
    /* generate html */
      const generatedHTML = templates.books(book);
      /* create DOM */
      const generateDOMElement = utils.createDOMFromHTML(generatedHTML);
      /* find books */
      const booksContainer = document.querySelector(select.containerOf.booksList);
      /*  add DOM elemnt*/
      booksContainer.appendChild(generateDOMElement);
    }
  };
  const favoriteBooks = [];

  function initActions(){
    const bookList = document.querySelectorAll(select.book.image);
    for(let book of bookList){
      book.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookId = book.getAttribute('data-id');
        if(!favoriteBooks.includes(bookId)){

          book.classList.add(classFav.favorite);
        
          favoriteBooks.push(bookId);
        } else {
          book.classList.remove(classFav.favorite);
          const bookIndex = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(bookIndex, 1);
        }
      });
    }
  }
  render();
  initActions();

}