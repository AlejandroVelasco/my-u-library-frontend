// src/components/NavBar.tsx
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../features/Auth/AuthContext";
import { Button } from "./Button";

export function NavBar() {
  const auth = useContext(AuthContext)!;
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    auth.logout();        // clears token & role
    nav("/login", { replace: true });
  };

  const links = [
    { to: "/books", label: "Books" },
    { to: "/my-checkouts", label: "My Checkouts" },
    // only for librarians:
    ...(auth.userRole === "librarian"
      ? [
          { to: "/manage/users", label: "Users" },
          { to: "/manage/books", label: "Books (Admin)" },
          { to: "/manage/checkouts", label: "Checkouts (Admin)" },
        ]
      : []),
  ];

  return (
  <header className="bg-gray-100 border-b">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <Link to="/books" className="text-xl font-bold">
          My U Library
        </Link>

        {/* desktop links */}
        <nav className="hidden md:flex space-x-4 items-center">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-blue-600"
            >
              {l.label}
            </Link>
          ))}
          {auth.token && (
            <Button onClick={handleLogout} className="ml-4">
              Logout
            </Button>
          )}
        </nav>

        {/* mobile hamburger */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setOpen((o) => !o)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <nav className="md:hidden bg-gray-50 border-t">
          <ul className="flex flex-col divide-y">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {auth.token && (
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
