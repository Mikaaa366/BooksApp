{
  'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
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
      const booksContainer = document.querySelector(select.containerOf.bookList);
      /*  add DOM elemnt*/
      booksContainer.appendChild(generateDOMElement);
    }
  };
  render();



}