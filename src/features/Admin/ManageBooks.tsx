import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import api from "../../api";

interface Book {
  id: number;
  title: string;
  author: string;
  published_year: number;
  genre: string;
  total_copies: number;
  available_copies: number;
}

export default function ManageBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<
    Omit<Book, "id" | "available_copies"> & { id?: number }
  >({
    title: "",
    author: "",
    published_year: new Date().getFullYear(),
    genre: "",
    total_copies: 1,
    id: undefined,
  });

  // Load books
  const fetchBooks = () => {
    api
      .get<Book[]>("/books/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Failed to load books:", err));
  };

  useEffect(fetchBooks, []);

  // Create or update
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      author: form.author,
      published_year: form.published_year,
      genre: form.genre,
      total_copies: form.total_copies,
    };

    try {
      if (form.id) {
        // Update
        await api.put(`/books/${form.id}/`, payload);
      } else {
        // Create
        await api.post("/books/", payload);
      }
      // Reset form & refresh list
      setForm({
        title: "",
        author: "",
        published_year: new Date().getFullYear(),
        genre: "",
        total_copies: 1,
        id: undefined,
      });
      fetchBooks();
    } catch (err) {
      console.error("Error saving book:", err);
    }
  };

  // Populate form for edit
  const handleEdit = (b: Book) => {
    setForm({
      title: b.title,
      author: b.author,
      published_year: b.published_year,
      genre: b.genre,
      total_copies: b.total_copies,
      id: b.id,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl mb-4">
        {form.id ? "Edit Book" : "Add New Book"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm((s) => ({ ...s, title: e.target.value }))
            }
            required
          />
          <Input
            placeholder="Author"
            value={form.author}
            onChange={(e) =>
              setForm((s) => ({ ...s, author: e.target.value }))
            }
            required
          />
          <Input
            type="number"
            placeholder="Year"
            value={form.published_year}
            onChange={(e) =>
              setForm((s) => ({
                ...s,
                published_year: parseInt(e.target.value, 10),
              }))
            }
            required
          />
          <Input
            placeholder="Genre"
            value={form.genre}
            onChange={(e) =>
              setForm((s) => ({ ...s, genre: e.target.value }))
            }
          />
          <Input
            type="number"
            placeholder="Total Copies"
            value={form.total_copies}
            onChange={(e) =>
              setForm((s) => ({
                ...s,
                total_copies: parseInt(e.target.value, 10),
              }))
            }
            required
          />
        </div>
        <Button type="submit">
          {form.id ? "Update Book" : "Add Book"}
        </Button>
      </form>

      <ul className="space-y-2">
        {books.map((b) => (
          <li
            key={b.id}
            className="p-3 border rounded flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{b.title}</div>
              <div className="text-sm text-gray-600">
                {b.author} — {b.genre}
              </div>
              <div className="text-sm text-gray-600">
                In stock: {b.available_copies}/{b.total_copies}
              </div>
            </div>
            <Button onClick={() => handleEdit(b)}>
              Edit
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
