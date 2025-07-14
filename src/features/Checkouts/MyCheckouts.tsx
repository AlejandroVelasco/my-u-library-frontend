import { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

interface Checkout {
  id: number;
  book: number;
  checked_out_at: string;
  returned_at: string | null;
  book_detail?: { title: string };
}

export default function MyCheckouts() {
  const [items, setItems] = useState<Checkout[]>([]);

  useEffect(() => {
    api.get<Checkout[]>("/checkouts/").then(res => setItems(res.data));
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-xl mb-4">My Checkouts</h1>
      <ul className="space-y-2">
        {items.map(c => (
          <li key={c.id} className="p-3 border rounded">
            <Link to={`/books/${c.book}`} className="font-semibold">
              {c.book_detail?.title || `Book #${c.book}`}
            </Link>
            <div>Out: {new Date(c.checked_out_at).toLocaleDateString()}</div>
            <div>Status: {c.returned_at ? "Returned" : "Out"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
