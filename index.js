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
  }

  try {
    const response = await db.query(
      `SELECT * FROM books ORDER BY ${orderByClause}`
    );
    const books = response.rows;

    res.render("index.ejs", { books: books });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.get("/book/:title", async (req, res) => {
  const title = req.params.title;

  try {
    const match = await db.query("SELECT * FROM books WHERE title = $1", [
      title,
    ]);
    const book = match.rows[0];

    const response = await db.query("SELECT * FROM notes WHERE book_id = $1", [
      book.id,
    ]);
    const notes = response.rows;

    res.render("book.ejs", {
      book: book,
      notes: notes,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.get("/addbook", (req, res) => {
  res.render("book-description.ejs");
});

app.post("/addbook", async (req, res) => {
  const { title, author, isbn, rating, review } = req.body;

  if (
    !title.trim() ||
    !author.trim() ||
    !isbn.trim() ||
    !rating ||
    !review.trim()
  ) {
    res.render("book-description.ejs", {
      error: "Please fill in all fields",
    });
    return;
  }

  try {
    await db.query(
      "INSERT INTO books (title, author, isbn, rating, review) VALUES ($1, $2, $3, $4, $5)",
      [title, author, isbn, rating, review]
    );
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.get("/editbook/:title", async (req, res) => {
  const title = req.params.title;

  try {
    const match = await db.query("SELECT * FROM books WHERE title = $1", [
      title,
    ]);
    const book = match.rows[0];
    res.render("book-description-edit.ejs", { book: book });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.post("/editbook", async (req, res) => {
  const { id, title, author, isbn, rating, review } = req.body;

  if (
    !title.trim() ||
    !author.trim() ||
    !isbn.trim() ||
    !rating ||
    !review.trim()
  ) {
    res.render("book-description-edit.ejs", {
      error: "Please fill in all fields",
    });

    return;
  }

  try {
    await db.query(
      "UPDATE books SET title = $1, author = $2, isbn = $3, rating = $4, review = $5, updated_at = NOW() WHERE id = $6",
      [title, author, isbn, rating, review, id]
    );
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.delete("/book", async (req, res) => {});

app.post("/note", async (req, res) => {});

app.put("/note", async (req, res) => {});

app.delete("/note", async (req, res) => {});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
