/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const DeleteBook = ({ fetchBooks }) => {
  const [id, setId] = useState("");

  const handleDeleteBook = async () => {
    try {
      await axios.delete(`/api/books/${id}`);
      setId("");
      fetchBooks();
    } catch (error) {
      alert(error.response?.data || "Error deleting book");
    }
  };

  return (
    <div className="delete-book-container">
      <h2>Delete a Book</h2>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDeleteBook}>Delete Book</button>
    </div>
  );
};

export default DeleteBook;
