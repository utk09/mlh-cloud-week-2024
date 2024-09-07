require("dotenv").config();
const express = require("express");
const Database = require("@replit/database");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const REPLIT_DB_URL = process.env.REPLIT_DB_URL; // Get the database URL from the environment variables

// Create a new database instance
const db = new Database(REPLIT_DB_URL);

// Function to generate the next ID
const getNextId = async () => {
  const keysObj = await db.list();
  const keys = (keysObj.value || []).map(Number).filter((key) => !isNaN(key));
  return keys.length > 0 ? String(Math.max(...keys) + 1) : "1";
};

// GET all books
app.get("/api/books", (req, res) => {
  db.list()
    .then((keysObj) => {
      const keys = keysObj.value || [];
      return Promise.all(keys.map((key) => db.get(key)));
    })
    .then((books) => res.json(books))
    .catch((error) => res.status(500).send("Error retrieving books"));
});

// GET a single book
app.get("/api/books/:id", (req, res) => {
  db.get(req.params.id)
    .then((bookObj) => {
      const book = bookObj.value;
      if (!book) return res.status(404).send("Book not found");
      res.json(book);
    })
    .catch((error) => res.status(500).send("Error retrieving the book"));
});

// POST a new book
app.post("/api/books", (req, res) => {
  getNextId()
    .then((id) => {
      const book = {
        id,
        title: req.body.title,
        author: req.body.author,
      };

      return db.set(id, book).then(() => {
        console.log(`Inserted Book:`, { [id]: book });
        res.status(201).json(book);
      });
    })
    .catch((error) => res.status(500).send("Error saving the book"));
});

// PUT (update) a book
app.put("/api/books/:id", (req, res) => {
  db.get(req.params.id)
    .then((bookObj) => {
      const book = bookObj.value; // Access the nested 'value' object
      if (!book) return res.status(404).send("Book not found");

      book.title = req.body.title || book.title;
      book.author = req.body.author || book.author;

      return db.set(req.params.id, book).then(() => {
        console.log(`Updated Book:`, { [req.params.id]: book });
        res.json(book);
      });
    })
    .catch((error) => res.status(500).send("Error updating the book"));
});

// DELETE a book
app.delete("/api/books/:id", (req, res) => {
  db.get(req.params.id)
    .then((bookObj) => {
      const book = bookObj.value;
      console.log(book);
      if (!book) return res.status(404).send("Book not found");

      return db.delete(req.params.id).then(() => res.status(204).send());
    })
    .catch((error) => res.status(500).send("Error deleting the book"));
});

// DELETE all books (Clear the database)
app.delete("/api/books", (req, res) => {
  db.list()
    .then((keysObj) => {
      const keys = keysObj.value || [];
      return Promise.all(keys.map((key) => db.delete(key)));
    })
    .then(() => {
      console.log("Database cleared");
      res.status(204).send();
    })
    .catch((error) => res.status(500).send("Error clearing the database"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
