/* eslint-disable react/prop-types */
import axios from "axios";

const ClearDatabase = ({ fetchBooks }) => {
  const handleClearDatabase = async () => {
    try {
      await axios.delete("/api/books");
      fetchBooks();
    } catch (error) {
      alert(error.response?.data || "Error clearing the database");
    }
  };

  return (
    <div className="clear-database-container">
      <button onClick={handleClearDatabase}>Delete Database</button>
    </div>
  );
};

export default ClearDatabase;
