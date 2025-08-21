import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GuestRoute({ children }) {
  const { user, ready } = useAuth();
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300">
        Loading…
      </div>
    );
  }
  return user ? <Navigate to="/dashboard" replace /> : children;
}

export default GuestRoute;


