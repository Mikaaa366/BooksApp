
{
  'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
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
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = ratingBgc * 10;
      book.ratingBgc = ratingBgc;
      book.ratingWidth = ratingWidth;
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
    const bookList = document.querySelector(select.containerOf.booksList);
    bookList.addEventListener('dblclick', function(event){
      event.preventDefault();
      const clickOnBook = event.target;
      if (clickOnBook.offsetParent.classList.contains('book__image')){
        const bookId = clickOnBook.offsetParent.getAttribute('data-id');
        if(!favoriteBooks.includes(bookId)){
          clickOnBook.offsetParent.classList.add(classFav.favorite);
          favoriteBooks.push(bookId);
        } else {
          clickOnBook.offsetParent.classList.remove(classFav.favorite);
          const bookIndex = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(bookIndex, 1);
        }
      }
    });
    checkbox.addEventListener('click', function(event){
      const bookFilter = event.target;
      if (bookFilter.tagName == 'INPUT' && bookFilter.name == 'filter' && bookFilter.type == 'checkbox'){
        const filterValue = bookFilter.value;
        console.log(filterValue);
        if(bookFilter.checked == true){
          filters.push(filterValue);
        } else {
          const checkedValue = filters.indexOf(filterValue);
          filters.splice(checkedValue, 1);
        }
        console.log('filters', filters);
      }
      filterBooks();
    });
  }
  const filters = [];
  const checkbox = document.querySelector(select.containerOf.filters);
  const filterBooks = function(){
    for(const book of dataSource.books) {
      let shouldBeHidden = false;
      const selectImage = document.querySelector('.book__image[data-id="'+ book.id +'"]');
      for( const filter of filters) {
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        selectImage.classList.add('hidden');
      } else {
        selectImage.classList.remove('hidden');  
      }
      console.log(selectImage);
    }
  };
  function determineRatingBgc(rating) {
    let ratingBgc = '';
    if (rating < 6) {
      ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
    } else if (rating > 6 && rating <= 8) {
      ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';
    } else if (rating > 8 && rating <= 9) {
      ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
    } else if (rating > 9) {
      ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
    }
    return ratingBgc;
  }
  render();
  initActions();
  determineRatingBgc();

}