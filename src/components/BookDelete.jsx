function BookDelete({ book, onConfirm, onClose }) {
  return (
    <div className="modal-background">
      <div className="delete-modal">
        <h2>Remove this book?</h2>

        <p>
          Are you sure you want to delete{" "}
          <strong>{book.title}</strong>?
        </p>

        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>

          <button
            className="delete-confirm"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDelete;