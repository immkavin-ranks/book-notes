import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "booknotes",
  password: "pg",
  port: 5432,
});

db.connect();

app.use(express.static("public"));

let books = [];

app.get("/", async (req, res) => {
  const response = await db.query("SELECT * FROM books");
  books = response.rows;
  res.render("index.ejs", { books: books });
});

app.get("/:notes_link", async (req, res) => {
  const notes_link = req.params.notes_link;
  const book = books.find(
    (book) => book.title.replace(/[^a-zA-Z0-9]+/g, "") === notes_link
  );
  // const book_notes = notes.filter((note) => note.book_id === book.id);
  const response = await db.query("SELECT * FROM notes WHERE book_id = $1", [
    book.id,
  ]);
  const notes = response.rows;
  res.render("book.ejs", {
    book: book,
    notes: notes,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
