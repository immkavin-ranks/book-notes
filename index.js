import express from "express";

const app = express();
const port = 3000;

const books = [
  {
    id: 1,
    title: "Book 1",
    author: "Author 1",
    isbn: "1234567890",
    rating: 4,
    updated_at: new Date(),
    review: "This is a review for Book 1",
  },
  {
    id: 2,
    title: "Book 2",
    author: "Author 2",
    isbn: "0987654321",
    rating: 3,
    updated_at: new Date(),
    review: "This is a review for Book 2",
  },
  {
    id: 3,
    title: "Book 3",
    author: "Author 3",
    isbn: "9876543210",
    rating: 5,
    updated_at: new Date(),
    review: "This is a review for Book 3",
  },
];

const notes = [
  {
    id: 1,
    book_id: 1,
    notes: "This is a note for Book 1",
  },
  {
    id: 2,
    book_id: 2,
    notes: "This is a note for Book 2",
  },
  {
    id: 3,
    book_id: 3,
    notes: "This is a note for Book 3",
  },
  {
    id: 4,
    book_id: 1,
    notes: "This is a note 2 for Book 1",
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs", { books: books });
});

app.get("/book/:notes_link", (req, res) => {
  const notes_link = req.params.notes_link;
  const book = books.find(
    (book) => book.title.replace(/[^a-zA-Z0-9]+/g, "") === notes_link
  );
  const book_notes = notes.filter((note) => note.book_id === book.id);
  res.render("book.ejs", { book: book, notes: book_notes });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
