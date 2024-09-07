/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const AddBook = ({ fetchBooks }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleAddBook = async () => {
    try {
      await axios.post("/api/books", { title, author });
      setTitle("");
      setAuthor("");
      fetchBooks();
    } catch (error) {
      alert(error.response?.data || "Error adding book");
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
};

export default AddBook;
