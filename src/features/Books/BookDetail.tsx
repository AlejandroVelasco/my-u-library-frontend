import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { Button } from "../../components/Button";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  available_copies: number;
}

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    api.get<Book>(`/books/${id}/`).then(res => setBook(res.data));
  }, [id]);

  const handleCheckout = async () => {
    try {
      await api.post("/checkouts/", { book: book!.id });
      setMessage("Checkout successful!");
      setBook(b => b ? { ...b, available_copies: b.available_copies - 1 } : b);
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "Error");
    }
  };

  if (!book) return <div>Loading…</div>;
  return (
    <div className="max-w-lg mx-auto p-4 border rounded">
      <h1 className="text-2xl mb-2">{book.title}</h1>
      <p className="mb-1">Author: {book.author}</p>
      <p className="mb-1">Genre: {book.genre}</p>
      <p className="mb-4">In Stock: {book.available_copies}</p>
      {message && <div className="mb-2 text-green-600">{message}</div>}
      <Button onClick={handleCheckout} disabled={book.available_copies < 1}>
        {book.available_copies > 0 ? "Check Out" : "Out of stock"}
      </Button>
    </div>
  );
}
