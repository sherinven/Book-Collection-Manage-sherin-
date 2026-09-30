function BookDetail({ book, onClose }) {
  return (
    <div className="modal-background">
      <div className="detail-modal">
        <img src={book.image} alt={book.title} />

        <div>
          <p className="detail-genre">{book.genre}</p>

          <h2>{book.title}</h2>

          <p>
            <strong>Author:</strong> {book.author}
          </p>

          <p>
            <strong>Year:</strong> {book.year}
          </p>

          <p className="description">
            {book.description}
          </p>

          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;