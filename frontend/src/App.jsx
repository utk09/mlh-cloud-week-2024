import { useState } from "react";
import axios from "axios";
import "./App.css";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import DeleteBook from "./components/DeleteBook";
import ClearDatabase from "./components/ClearDatabase";

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

const App = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/api/books");
      const fetchedBooks = response.data.map((bookObj) => bookObj.value);
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="app">
      <h1>Book Library</h1>
      <hr />

      <div className="container">
        <div className="left-panel">
          <BookList books={books} fetchBooks={fetchBooks} />
        </div>

        <div className="right-panel">
          <AddBook fetchBooks={fetchBooks} />
          <DeleteBook fetchBooks={fetchBooks} />
          <ClearDatabase fetchBooks={fetchBooks} />
        </div>
      </div>
    </div>
  );
};

export default App;
