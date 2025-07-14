import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../../api";

interface AuthContextType {
  token: string | null;
  userRole: "student" | "librarian" | null;
  userName: string | null;
  userId: number | null;
  userEmail: string | null;
  userFirstName: string | null;
  userLastName: string | null;
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [userRole, setUserRole] = useState<"student"|"librarian"|null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);

  
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api.get("/auth/profile/").then(response => {
        setUserRole(response.data.role);
        setUserName(response.data.username);
        setUserId(response.data.id);
        setUserEmail(response.data.email);
        setUserFirstName(response.data.first_name);
        setUserLastName(response.data.last_name);
      });
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    const { data } = await api.post("/auth/login/", { username, password });
    localStorage.setItem("token", data.token);
    setToken(data.token);

    api.defaults.headers.common["Authorization"] = `Token ${data.token}`;
    const profile = await api.get("/auth/profile/");
    setUserRole(profile.data.role);
    setUserName(profile.data.username);
    setUserId(profile.data.id);
    setUserEmail(profile.data.email);
    setUserFirstName(profile.data.first_name);
    setUserLastName(profile.data.last_name);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, userRole, userName, userId, userEmail, userFirstName, userLastName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
