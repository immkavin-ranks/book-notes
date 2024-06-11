CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT NOT NULL,
    rating INTEGER NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    review TEXT
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(id),
    note TEXT NOT NULL
);