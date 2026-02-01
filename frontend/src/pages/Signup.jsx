import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaHashtag,
  FaHeart,
  FaUserPlus,
} from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Server_URL } from "../main";
import Loader from "../components/Loader";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [age, setAge] = useState("");
  const [isMarried, setIsMarried] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const response = await axios.post(
        `${Server_URL}/users/register`,
        {
          name,
          email,
          password,
          role,
          age: Number(age),
          isMarried,
        },
        { withCredentials: true },
      );

      setLoader(false);
      navigate("/signin");
    } catch (error) {
      setLoader(false);
      setError(error.response?.data?.message || "Failed to signup");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-300 py-8 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 relative">
        <div className="absolute top-3 left-3" onClick={() => navigate("/")}>
          <MdKeyboardBackspace
            size={28}
            className=" text-red-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125 hover:text-red-700 active:scale-110 drop-shadow-md hover:drop-shadow-lg "
          />
        </div>
        <div className="flex items-start bg-linear-to-r from-yellow-200 via-yellow-100 to-yellow-50 mt-4 p-4 mb-4 rounded-xl shadow-lg border-l-4 border-yellow-500 transition transform hover:scale-105 hover:shadow-2xl">
          <FaUserTag className="text-yellow-600 mr-3 mt-1 text-2xl" />
          <p className="font-medium text-yellow-900 text-sm md:text-base">
            Want to write your own blogs? Choose{" "}
            <span className="font-extrabold text-yellow-800 bg-yellow-300 px-2 rounded-lg animate-pulse shadow-sm">
              Author
            </span>{" "}
            as your role now!
          </p>
        </div>

        <div className="flex flex-col items-center mb-6">
          <FaUserPlus className="text-4xl text-blue-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>
          <p className="text-gray-500 text-sm mt-1">
            Create your account to get started!
          </p>
        </div>
        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
              >
                Name
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 cursor-pointer">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-transparent outline-none text-gray-700 cursor-pointer"
                  placeholder="Enter your name"
                />
              </div>
              {error.name && <p className="text-red-500">{error.name}</p>}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
              >
                Email
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 cursor-pointer ">
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
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
              >
                Role
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 cursor-pointer">
                <FaUserTag className="text-gray-400 mr-2" />
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full bg-transparent outline-none text-gray-700 cursor-pointer"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="author">Author</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
              >
                Age
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 cursor-pointer">
                <FaHashtag className="text-gray-400 mr-2" />
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  min="0"
                  className="w-full bg-transparent outline-none text-gray-700 cursor-pointer"
                  placeholder="Enter your age"
                />
              </div>
            </div>
            <div className="flex items-center mt-6 md:mt-0">
              <input
                type="checkbox"
                id="isMarried"
                name="isMarried"
                checked={isMarried}
                onChange={(e) => setIsMarried(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="isMarried"
                className="ml-2  text-sm text-gray-700 flex items-center cursor-pointer"
              >
                <FaHeart className="mr-1 text-pink-400" /> Married
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={loader}
          >
            {loader ? (
              <Loader />
            ) : (
              <>
                <FaUserPlus className="mr-2" /> Sign Up
              </>
            )}
          </button>
        </form>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
