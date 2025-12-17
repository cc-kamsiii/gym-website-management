import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../config/axiosConfig";

function Register({ isOpen, onClose, onSwitchToLogin }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        name,
      });

      console.log(res.data);
      setMessage(res.data.message);

      setTimeout(() => {
        setEmail("");
        setPassword("");
        setName("");
        setMessage("");
        onSwitchToLogin();
      }, 1500);

    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackDropClick}
      className="fixed inset-0  bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 text-gray-500 hover:text-gray-700 text-2xl font-bold cursor-pointer right-4"
        >
          x
        </button>
        <h2 className="text-3xl mb-6 font-bold text-gray-800">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="registerName"
              className="block text-sm font-medium mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="registerName"
              placeholder="Juan Dela Cruz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 outline-gray-300 border border-gray-300 rounded-md"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label
              htmlFor="registerEmail"
              className="block text-sm font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="registerEmail"
              placeholder="example@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 outline-gray-300 border border-gray-300 rounded-md"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="registerPassword">Password</label>
            <input
              type="password"
              id="registerPassword"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 outline-gray-300 border border-gray-300 rounded-md"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="bg-amber-400 w-full px-4 py-2 rounded-2xl cursor-pointer"
          >
            Register
          </button>
          {message && <p className="mt-3 text-center">{message}</p>}
        </form>

        <div className="mt-5 text-center flex flex-row justify-center space-x-1">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <a
            onClick={onSwitchToLogin}
            className="text-sm text-yellow-500 hover:text-yellow-600 cursor-pointer "
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
