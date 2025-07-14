// src/App.tsx
import { AuthProvider } from "./features/Auth/AuthContext";
import AppRoutes from "./routes";
import { NavBar } from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
