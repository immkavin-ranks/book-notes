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

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let books = [];

app.get("/", async (req, res) => {
  const sort = req.query.sort;

  let orderByClause;
  switch (sort) {
    case "high-rated":
      orderByClause = "rating DESC";
      break;
    case "most-recent":
      orderByClause = "updated_at DESC";
      break;
    default:
      orderByClause = "id ASC";
      break;
  }

  try {
    const response = await db.query(
      `SELECT * FROM books ORDER BY ${orderByClause}`
    );
    books = response.rows;
    res.render("index.ejs", { books: books });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.get("/book/:notes_link", async (req, res) => {
  const notes_link = req.params.notes_link;
  const book = books.find(
    (book) => book.title.replace(/[^a-zA-Z0-9]+/g, "") === notes_link
  );
  const response = await db.query("SELECT * FROM notes WHERE book_id = $1", [
    book.id,
  ]);
  const notes = response.rows;
  res.render("book.ejs", {
    book: book,
    notes: notes,
  });
});

app.get("/book", (req, res) => {
  res.render("add-book.ejs");
});

app.post("/book", async (req, res) => {
  const { title, author, isbn, rating, review } = req.body;

  if (
    !title.trim() ||
    !author.trim() ||
    !isbn.trim() ||
    !rating ||
    !review.trim()
  ) {
    res.render("add-book.ejs", {
      error: "Please fill in all fields",})
    return
  }

  try {
    const response = await db.query(
      "INSERT INTO books (title, author, isbn, rating, review) VALUES ($1, $2, $3, $4, $5)",
      [title, author, isbn, rating, review]
    );
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
});

app.put("/book", async (req, res) => {});
app.delete("/book", async (req, res) => {});

app.post("/note", async (req, res) => {});
app.put("/note", async (req, res) => {});
app.delete("/note", async (req, res) => {});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
