CREATE TABLE book_notes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    author TEXT,
    isbn TEXT,
    rating INTEGER,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    review TEXT
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES book_notes(id),
    notes TEXT
);