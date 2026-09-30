import { useEffect, useState } from "react";

function BookForm({ book, onSubmit, onClose }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "",
        year: book.year || "",
        description: book.description || "",
        image: book.image || "",
      });
    } else {
      setForm({
        title: "",
        author: "",
        genre: "",
        year: "",
        description: "",
        image: "",
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.author ||
      !form.genre ||
      !form.year ||
      !form.description ||
      !form.image
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const data = {
      ...form,
      year: Number(form.year),
    };

    onSubmit(data);
  };

  return (
    <div className="modal-background">
      <div className="modal">
        <h2>{book ? "Edit Book" : "Add a Book"}</h2>

        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />

          <label>Author</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Enter author"
          />

          <label>Genre</label>
          <select
            name="genre"
            value={form.genre}
            onChange={handleChange}
          >
            <option value="">Select genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
          </select>

          <label>Year</label>
          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="1943"
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write a short description..."
          />

          <label>Image URL</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
          />

          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="image-preview"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}

          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="primary-button">
              {book ? "Save changes" : "Add book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookForm;