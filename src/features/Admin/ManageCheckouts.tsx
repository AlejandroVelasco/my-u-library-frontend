import { useState, useEffect } from "react";
import api from "../../api";
import { Button } from "../../components/Button";

interface Checkout {
  id: number;
  user: string;
  book: number;
  checked_out_at: string;
  returned_at: string | null;
}

export default function ManageCheckouts() {
  const [items, setItems] = useState<Checkout[]>([]);

  const fetch = () => api.get<Checkout[]>("/checkouts/").then(r => setItems(r.data));
  useEffect(() => {
    fetch();
  }, []);

  const handleReturn = async (id: number) => {
    await api.post(`/checkouts/${id}/return/`);
    fetch();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl mb-4">All Checkouts</h1>
      <ul className="space-y-2">
        {items.map(c => (
          <li key={c.id} className="p-3 border rounded flex justify-between">
            <div>
              <div><strong>User:</strong> {c.user}</div>
              <div><strong>Book ID:</strong> {c.book}</div>
              <div><strong>Out:</strong> {new Date(c.checked_out_at).toLocaleDateString()}</div>
              <div><strong>Returned:</strong> {c.returned_at ? new Date(c.returned_at).toLocaleDateString() : "Not returned yet"}</div>
              <div><strong>Status:</strong> {c.returned_at ? "Returned" : "Out"}</div>
            </div>
            {!c.returned_at && (
              <Button onClick={() => handleReturn(c.id)}>Return</Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
