/* eslint-disable react/prop-types */

const BookList = ({ books, fetchBooks }) => {
  return (
    <div className="book-list-container">
      <h2>All Books</h2>
      <button onClick={fetchBooks}>Get All Books</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.id}. {book.title} - {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
