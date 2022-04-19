class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static retrieveBooks() {
    const books = JSON.parse(localStorage.getItem('Books'));
    document.getElementById('tbody').innerHTML = '';
    for (let i = 0; i < books.length; i += 1) {
      document.getElementById('tbody').innerHTML
            += `<tr ><td class="book-container">"${books[i].title}" by ${books[i].author} <button class="btn" type="button" onclick="Book.removeBook(${i})">Remove</button></td></tr>`;
    }
  }

  static createBook(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    const book = new Book(title, author);

    if (localStorage.getItem('Books') === null) {
      const books = [];
      books.push(book);
      localStorage.setItem('Books', JSON.stringify(books));
    } else {
      const books = JSON.parse(localStorage.getItem('Books'));
      books.push(book);
      localStorage.setItem('Books', JSON.stringify(books));
    }
    Book.retrieveBooks();
    document.getElementById('form').reset();
  }

  static removeBook(i) {
    const books = JSON.parse(localStorage.getItem('Books'));
    books.splice(i, 1);
    localStorage.setItem('Books', JSON.stringify(books));
    Book.retrieveBooks();
  }
}
document.getElementById('form').addEventListener('submit', Book.createBook);
Book.retrieveBooks();
