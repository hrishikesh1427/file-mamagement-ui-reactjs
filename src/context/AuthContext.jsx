import React, { createContext, useState, useEffect, useContext } from "react";
import { mockAPI } from "../api/mock"; // 👈 use mock

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // fallback: infer from persisted mock user if exists
        const mock = localStorage.getItem("mockUser");
        if (mock) {
          const parsed = JSON.parse(mock);
          if (parsed?.username) {
            const username = parsed.username;
            localStorage.setItem("user", JSON.stringify({ username }));
            setUser({ username });
          }
        }
      }
    } finally {
      setReady(true);
    }
  }, []);

  const register = async (username, email, password) => {
    const data = await mockAPI.register(username, email, password);
    return data;
  };

  const login = async (username, password) => {
    const data = await mockAPI.login(username, password);
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("user", JSON.stringify({ username }));
    setUser({ username });
  };

  const logout = async () => {
    await mockAPI.logout();
    try {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      // intentionally keep mockUser/mockFiles for persistence across refreshes
    } catch {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
