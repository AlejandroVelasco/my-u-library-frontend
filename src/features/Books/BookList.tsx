import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { Input } from "../../components/Input";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  available_copies: number;
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data } = await api.get<Book[]>("/books/", {
      params: { search: q },
    });
    setBooks(data);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <form onSubmit={handleSearch} className="flex mb-4">
        <Input
          placeholder="Search by title, author or genre"
          value={q}
          onChange={e => setQ(e.target.value)}
          className="flex-grow mr-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Search
        </button>
      </form>
      <ul className="space-y-3">
        {books.map(b => (
          <li
            key={b.id}
            className="p-4 border rounded hover:bg-gray-50 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{b.title}</h2>
              <p>{b.author} — {b.genre}</p>
            </div>
            <Link
              to={`/books/${b.id}`}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
