import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/register";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">File Management</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {user && !isAuthPage && (
            <div className="flex items-center gap-2">
              {/* Mobile avatar */}
              <div className="sm:hidden inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white text-sm">
                {(user.username || "").charAt(0).toUpperCase()}
              </div>
              {/* Username pill on >= sm */}
              <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded border border-gray-300 dark:border-gray-700">
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white text-xs">
                  {(user.username || "").charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-800 dark:text-gray-200 truncate max-w-[10rem]">
                  {user.username}
                </span>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm rounded border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
          >
            {/* Icon on mobile */}
            <span className="sm:hidden" aria-hidden>{theme === "dark" ? "☀️" : "🌙"}</span>
            {/* Text on >= sm */}
            <span className="hidden sm:inline text-gray-800 dark:text-gray-100">{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>
          {user && !isAuthPage && (
            <button
              type="button"
              onClick={async () => {
                await logout();
                navigate("/");
              }}
              className="inline-flex items-center px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm rounded bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;


