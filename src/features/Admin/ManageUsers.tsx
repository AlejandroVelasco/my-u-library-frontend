import { useState, useEffect, FormEvent } from "react";
import api from "../../api";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "student" | "librarian";
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<Omit<User, "id"> & { password: string }>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "student",
    password: "",
  });

  const fetch = () => api.get<User[]>("/users/").then(r => setUsers(r.data));
  useEffect(() => {
    fetch();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await api.post("/users/", form);
    setForm({ ...form, username: "" }); // reset partially
    fetch();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl mb-4">Manage Users</h1>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Username"
            value={form.username}
            onChange={e => setForm(s => ({ ...s, username: e.target.value }))}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm(s => ({ ...s, password: e.target.value }))}
            required
          />
          <Input
            placeholder="First Name"
            value={form.first_name}
            onChange={e => setForm(s => ({ ...s, first_name: e.target.value }))}
          />
          <Input
            placeholder="Last Name"
            value={form.last_name}
            onChange={e => setForm(s => ({ ...s, last_name: e.target.value }))}
          />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm(s => ({ ...s, email: e.target.value }))}
          />
          <select
            className="border rounded px-3 py-2"
            value={form.role}
            onChange={e => setForm(s => ({ ...s, role: e.target.value as any }))}
          >
            <option value="student">Student</option>
            <option value="librarian">Librarian</option>
          </select>
        </div>
        <Button type="submit">Add User</Button>
      </form>

      <ul className="space-y-2">
        {users.map(u => (
          <li key={u.id} className="p-2 border rounded">
            {u.username} — {u.email} ({u.role})
          </li>
        ))}
      </ul>
    </div>
  );
}
