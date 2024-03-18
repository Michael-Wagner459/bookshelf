const books = [];

document.querySelector('.search').addEventListener('click', function () {
  const search = document.querySelector('#search-query').value;

  fetchBooks(search);
  document.querySelector('#search-query').value = '';
});

const fetchBooks = function (query) {
  const url = 'https://www.googleapis.com/books/v1/volumes?q=' + query;
  fetch(url, {
    method: 'GET',
    datatype: 'json'
  })
    .then(data => data.json())
    .then(data => addBooks(data));
};

const addBooks = function (data) {
  for (let i = 0; i < data.items.length; i++) {
    const bookData = data.items[i];

    const book = {
      title: bookData.volumeInfo.title || null,
      author: bookData.volumeInfo.authors ? bookData.volumeInfo.authors[0]: null,
      pageCount: bookData.volumeInfo.pageCount || null,
      isbn: bookData.volumeInfo.industryIdentifiers ? bookData.volumeInfo.industryIdentifiers[0].identifier: null,
      imageURL: bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.thumbnail: null
    }
    books.push(book);
  }

  renderBooks();
};

const renderBooks = function () {
  document.querySelector('.books').replaceChildren();

 

  for (let i = 0; i < books.length; i++) {
    let book = books[i];

    const template = `
    <div class="book col-md-6">
      <h4>${book.title}</h4>
      <div>Author: <strong>${book.author}</strong></div>
      <div>Pages: <strong>${book.pageCount}</strong></div>
      <div>ISBN <strong>${book.isbn}</strong></div>
      <img src="${book.imageURL}" alt= "">
    </div>`;

    document.querySelector('.books').insertAdjacentHTML("beforeend", template);
  }
};

renderBooks();