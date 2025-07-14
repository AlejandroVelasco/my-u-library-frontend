import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import api from "../../api";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

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
  const [form, setForm] = useState<Omit<Book, "id" | "available_copies">>({
    title: "",
    author: "",
    published_year: new Date().getFullYear(),
    genre: "",
    total_copies: 1,
  });

  const fetch = () => api.get<Book[]>("/books/").then(r => setBooks(r.data));
  useEffect(() => {
    fetch();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await api.post("/books/", form);
    fetch();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl mb-4">Manage Books</h1>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm(s => ({ ...s, title: e.target.value }))}
            required
          />
          <Input
            placeholder="Author"
            value={form.author}
            onChange={e => setForm(s => ({ ...s, author: e.target.value }))}
            required
          />
          <Input
            type="number"
            placeholder="Year"
            value={form.published_year}
            onChange={e =>
              setForm(s => ({ ...s, published_year: +e.target.value }))
            }
            required
          />
          <Input
            placeholder="Genre"
            value={form.genre}
            onChange={e => setForm(s => ({ ...s, genre: e.target.value }))}
          />
          <Input
            type="number"
            placeholder="Total Copies"
            value={form.total_copies}
            onChange={e =>
              setForm(s => ({ ...s, total_copies: +e.target.value }))
            }
            required
          />
        </div>
        <Button type="submit">Add Book</Button>
      </form>

      <ul className="space-y-2">
        {books.map(b => (
          <li key={b.id} className="p-2 border rounded">
            {b.title} — {b.author} ({b.genre}) [In stock: {b.available_copies}]
          </li>
        ))}
      </ul>
    </div>
  );
}
