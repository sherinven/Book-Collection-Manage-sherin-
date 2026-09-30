function Book({ book, onDetail, onEdit, onDelete }) {
  return (
    <div className="book-card">
      <img
        src={book.image}
        alt={book.title}
        className="book-image"
      />

      <div className="book-info">
        <h2>{book.title}</h2>

        <p className="author">{book.author}</p>

        <div className="book-meta">
          <span>{book.genre}</span>
          <span>{book.year}</span>
        </div>

        <div className="book-actions">
          <button onClick={() => onDetail(book)}>View</button>
          <button onClick={() => onEdit(book)}>Edit</button>
          <button
            className="delete-button"
            onClick={() => onDelete(book)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Book;