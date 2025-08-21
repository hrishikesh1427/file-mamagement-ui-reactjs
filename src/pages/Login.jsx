import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(form.username, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4 mx-4"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Login</h2>
        {error && <p className="text-red-400 text-sm">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
          required
        />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Login
        </button>
        <div className="text-center text-sm text-gray-300">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
        </div>
      </form>
    </div>
  );
}
