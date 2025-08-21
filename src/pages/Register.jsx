import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      alert("Registration successful!");
      navigate("/"); // redirect to login
    } catch (err) {
      const serverData = err.response?.data;
      const detail =
        (typeof serverData === "string" && serverData) ||
        serverData?.detail ||
        serverData?.message ||
        (serverData && JSON.stringify(serverData)) ||
        "Registration failed";
      console.error("Registration error:", err);
      alert("Error: " + detail);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100 dark:bg-gray-900">
      <form method="post" onSubmit={handleSubmit} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-4 w-full max-w-md mx-4">
        <h2 className="text-xl text-gray-900 dark:text-white text-center">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
