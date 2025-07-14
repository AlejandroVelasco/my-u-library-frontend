import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../features/Auth/AuthContext";
import Login from "../features/Auth/Login";
import BookList from "../features/Books/BookList";
import BookDetail from "../features/Books/BookDetail";
import MyCheckouts from "../features/Checkouts/MyCheckouts";
import ManageUsers from "../features/Admin/ManageUsers";
import ManageBooks from "../features/Admin/ManageBooks";
import ManageCheckouts from "../features/Admin/ManageCheckouts";
// … import other pages

export default function AppRoutes() {
  const auth = useContext(AuthContext);
  // 1. Not logged in → force to /login
  if (!auth || !auth.token) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // 2. Logged in but profile (role) still loading → show a spinner
  if (auth.token && auth.userRole === null) {
    return <div className="p-8 text-center">Loading your account…</div>;
  }
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        {auth?.token ? (
          <>
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/my-checkouts" element={<MyCheckouts />} />
            {auth.userRole === "librarian" && (
              <>
                <Route path="/manage/users" element={<ManageUsers />} />
                <Route path="/manage/books" element={<ManageBooks />} />
                <Route
                  path="/manage/checkouts"
                  element={<ManageCheckouts />}
                />
              </>
            )}
            <Route path="*" element={<Navigate to="/books" replace />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
  );
}
