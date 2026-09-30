import { useEffect, useState } from "react";

import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "./api/bookapi";

import Book from "./components/Book";
import BookForm from "./components/BookForm";
import BookDetail from "./components/BookDetail";
import BookDelete from "./components/BookDelete";

import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const [selectedBook, setSelectedBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);

  const loadBooks = async () => {
    try {
      setLoading(true);

      const data = await getBooks();

      setBooks(data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data buku.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleAdd = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (editingBook) {
        await updateBook(editingBook.id, data);
      } else {
        await createBook(data);
      }

      setShowForm(false);
      setEditingBook(null);

      await loadBooks();

      alert(
        editingBook
          ? "Book updated successfully!"
          : "Book added successfully!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Gagal menyimpan buku.\n\nCek URL MockAPI di file .env dan pastikan resource bernama books."
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBook(deletingBook.id);

      setDeletingBook(null);

      await loadBooks();

      alert("Book deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus buku.");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Book Collection Manager</h1>

          <p>
            Every book you've saved, borrowed, or want to bring about —
            <br />
            keep it all in one place.
          </p>
        </div>

        <button className="add-button" onClick={handleAdd}>
          + Add a book
        </button>
      </header>

      <main className="book-container">
        {loading ? (
          <p className="loading">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="empty">
            No books yet. Add your first book!
          </p>
        ) : (
          <div className="book-grid">
            {books.map((book) => (
              <Book
                key={book.id}
                book={book}
                onDetail={setSelectedBook}
                onEdit={handleEdit}
                onDelete={setDeletingBook}
              />
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <BookForm
          book={editingBook}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingBook(null);
          }}
        />
      )}

      {selectedBook && (
        <BookDetail
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}

      {deletingBook && (
        <BookDelete
          book={deletingBook}
          onConfirm={handleDelete}
          onClose={() => setDeletingBook(null)}
        />
      )}
    </div>
  );
}

export default App;