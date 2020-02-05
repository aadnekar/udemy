// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Local Storage Constructor
function Store() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x</a></td>
  `;

  list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function (msg, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(msg));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert alert as div before the form.
  container.insertBefore(div, form);

  // Timeout after 3 sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);

};

// Delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

// Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// Static method for Store to add book
Store.prototype.constructor.addBook = function(book) {
  const books = Store.getBooks();
  console.log(books);
  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
};

// Static method for Store to get book from LS
Store.prototype.constructor.getBooks = function() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books =  JSON.parse(localStorage.getItem('books'));
  }
  return books;
};

// Static method to display all books in LS
Store.prototype.constructor.displayBooks = function() {
  const books = Store.getBooks();

  books.forEach(book => {
    const ui = new UI;

    // Add book to UI
    ui.addBookToList(book);
  });
};

// Static method to delete a book from LS
Store.prototype.constructor.removebook = function(isbn) {
  const books = Store.getBooks();

  books.forEach( function(book, index) {
    if(book.isbn === isbn) {
      books.splice(index, 1);
    }
  })

  localStorage.setItem('books', JSON.stringify(books));
};

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e) {

  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiate a book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add book to LS
    Store.addBook(book);

    // Show success
    ui.showAlert('Book Added!', 'success');

    // Clear fields
    ui.clearFields();
  }


  e.preventDefault();
})

// Event Listener for delete book
document.getElementById('book-list').addEventListener('click', function (e) {
  // Instantiate UI
  const ui = new UI();

  // Delete ui book
  ui.deleteBook(e.target);

  // Remove book from LS
  Store.removebook(e.target.parentElement.previousElementSibling.textContent);

  // Show success alert
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault()
});