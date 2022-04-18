function retrieveBooks() {
  const books = JSON.parse(localStorage.getItem('Books'));
  document.getElementById('books-list').innerHTML = '';
  for (let i = 0; i < books.length; i += 1) {
    document.getElementById('books-list').innerHTML
          += `<p>${books[i].title}</p>
              <p>${books[i].author}</p>
              <button type="button" onclick="removeBook(${i})">Remove</button>
              <hr>
              `;
  }
}

function createBook(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  const book = {
    title,
    author,
  };

  if (localStorage.getItem('Books') === null) {
    const books = [];
    books.push(book);
    localStorage.setItem('Books', JSON.stringify(books));
  } else {
    const books = JSON.parse(localStorage.getItem('Books'));
    books.push(book);
    localStorage.setItem('Books', JSON.stringify(books));
  }
  retrieveBooks();
  document.getElementById('form').reset();
}

document.getElementById('form').addEventListener('submit', createBook);

retrieveBooks();
function removeBook(i) {
  const books = JSON.parse(localStorage.getItem('Books'));
  books.splice(i, 1);
  localStorage.setItem('Books', JSON.stringify(books));
  retrieveBooks();
}

removeBook(1000000);

