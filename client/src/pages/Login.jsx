import React, { useState, useEffect} from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login({ isOpen, onClose, onSwitchToRegister }) {

  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setMessage("")

    try {
      const res = await axios.post('/api/auth/login',{
        email, password
      })
      console.log(res.data)
      setMessage(res.data.message)

      localStorage.setItem('user', JSON.stringify(res.data.user))

      setEmail("")
      setPassword("")

      navigate('/userdashboard')

    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  }


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
    <div onClick={handleBackDropClick} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 text-gray-500 hover:text-gray-700 text-2xl font-bold cursor-pointer right-4"
        >
          x
        </button>
        <h2 className="text-3xl mb-6 font-bold text-gray-800">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 outline-gray-300 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 outline-gray-300 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex flex-center">
              <input type="checkbox" className="mr-2 cursor-pointer" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a className="text-sm text-yellow-600 hover:text-yellow-700 cursor-pointer">
              Forgot Password
            </a>
          </div>

          <button
            type="submit"
            className="bg-amber-400 w-full px-4 py-2 rounded-2xl cursor-pointer"
          >
            Login
          </button>
          {message &&(
            <p className="mt-3 text-center">{message}</p>
          )}
        </form>

        <div className="mt-5 text-center flex flex-row justify-center space-x-1">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <a onClick={onSwitchToRegister} className="text-sm text-yellow-500 hover:text-yellow-600 cursor-pointer ">
            Sign up
          </a>
        </div>
      </div>
    </div>
    
  );
}

export default Login;
