const [navList, navAdd, navContact] = document.querySelectorAll('.link');
const allBooks = document.querySelector('.book-list');
const addBook = document.querySelector('.form-title-add');
const contact = document.querySelector('.contact');
const datetime = document.getElementById('current-date');

navList.addEventListener('click', () => {
  allBooks.classList.remove('hidden');
  addBook.classList.add('hidden');
  contact.classList.add('hidden');
  navList.classList.add('active');
  navAdd.classList.remove('active');
  navContact.classList.remove('active');
});

navAdd.addEventListener('click', () => {
  addBook.classList.remove('hidden');
  allBooks.classList.add('hidden');
  contact.classList.add('hidden');
  navAdd.classList.add('active');
  navList.classList.remove('active');
  navContact.classList.remove('active');
});

navContact.addEventListener('click', () => {
  contact.classList.remove('hidden');
  allBooks.classList.add('hidden');
  addBook.classList.add('hidden');
  navContact.classList.add('active');
  navList.classList.remove('active');
  navAdd.classList.remove('active');
});

window.onload = function () {
  contact.classList.add('hidden');
  allBooks.classList.add('hidden');
  addBook.classList.remove('hidden');
};

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

const currentDate = new Date();
const date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)}-${currentDate.getDate()}`;
const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
const dateCurrentTime = `${date}, ${time}`;
datetime.innerHTML = dateCurrentTime;
