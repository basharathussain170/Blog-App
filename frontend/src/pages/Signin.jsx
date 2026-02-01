import axios from "axios";
import React, { useState } from "react";
import { FaSignInAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { MdKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Server_URL } from "../main";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import Loader from "../components/Loader";

function Signin() {
  const getCurrentUser = useGetCurrentUser();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await axios.post(
        `${Server_URL}/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log("Signin successful:", response.data);
      await getCurrentUser();
      setLoader(false);
      navigate("/");
    } catch (error) {
      setLoader(false);
      setError(error.response?.data?.message || "Failed to signin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-300 py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 relative">
        <div className="absolute top-3 left-3" onClick={() => navigate("/")}>
          <MdKeyboardBackspace
            size={28}
            className="
      text-red-500
      cursor-pointer
      transition-all duration-300 ease-in-out
      hover:scale-125
      hover:text-red-700
      active:scale-110
      drop-shadow-md
      hover:drop-shadow-lg
    "
          />
        </div>
        <div className="flex flex-col items-center mb-6">
          <FaSignInAlt className="text-4xl text-blue-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back! Please sign in to your account.
          </p>
        </div>
        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
            >
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 cursor-pointer">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-gray-700 cursor-pointer"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
            >
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 cursor-pointer">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-gray-700 cursor-pointer"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-2 text-xs text-blue-500 hover:underline focus:outline-none cursor-pointer"
              >
                {showPassword ? (
                  <FaEye className="text-red-600" size={20} />
                ) : (
                  <FaEyeSlash className="text-green-600" size={20} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={loader}
          >
            {loader ? (
              <Loader />
            ) : (
              <>
                <FaSignInAlt className="mr-2" />
                Sign in
              </>
            )}
          </button>
        </form>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
