import React, { useState } from "react";
import {
  FaHome,
  FaBlog,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaRegFileAlt } from "react-icons/fa";
import { Server_URL } from "./../main";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Nav() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${Server_URL}/users/logout`,
        {},
        { withCredentials: true },
      );
      dispatch(setUserData(null));
      navigate("/signin");
    } catch (error) {
      console.error("Error while logout:", error);
    }
  };

  return (
    <nav className="backdrop-blur-md bg-white/70 shadow-lg fixed w-full z-50 top-0 left-0 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div
            className="shrink-0 flex items-center text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-pink-400 cursor-pointer drop-shadow-md"
            onClick={() => navigate("/")}
          >
            <FaBlog className="mr-2 text-blue-500" /> BlogApp
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="flex items-center px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:bg-linear-to-r hover:from-blue-100 hover:to-pink-100 hover:text-blue-700 transition shadow-sm"
              onClick={() => setOpen(false)}
            >
              <FaHome className="mr-2" /> Home
            </Link>
            <Link
              to="/blogs"
              className="flex items-center px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:bg-linear-to-r hover:from-blue-100 hover:to-pink-100 hover:text-blue-700 transition shadow-sm"
              onClick={() => setOpen(false)}
            >
              <FaBlog className="mr-2" /> Blogs
            </Link>
            {userData?.role == "author" && (
              <>
                <Link
                  to="/add-blog"
                  className="flex items-center px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:bg-linear-to-r hover:from-green-100 hover:to-blue-100 hover:text-green-700 transition shadow-sm"
                  onClick={() => setOpen(false)}
                >
                  <MdOutlineAddPhotoAlternate className="mr-2" size={20} /> Add
                  Blog
                </Link>
                {userData?.blogs?.length > 0 && (
                  <Link
                    to="/total-blogs"
                    className="flex items-center px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:bg-linear-to-r hover:from-green-100 hover:to-blue-100 hover:text-green-700 transition shadow-sm"
                    onClick={() => setOpen(false)}
                  >
                    <FaRegFileAlt className="mr-2" size={20} /> My Blogs
                  </Link>
                )}
              </>
            )}
            {userData ? (
              <button
                className="flex items-center px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:bg-linear-to-r hover:from-pink-100 hover:to-blue-100 hover:text-pink-700 transition shadow-sm cursor-pointer"
                onClick={handleLogout}
              >
                <FaSignInAlt className="mr-2" /> Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="flex items-center px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:bg-linear-to-r hover:from-blue-100 hover:to-pink-100 hover:text-blue-700 transition shadow-sm"
                  onClick={() => setOpen(false)}
                >
                  <FaSignInAlt className="mr-2" /> Sign In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center px-4 py-2 rounded-full text-base font-medium text-white bg-linear-to-r from-blue-500 to-pink-400 hover:from-pink-400 hover:to-blue-500 transition shadow-lg"
                  onClick={() => setOpen(false)}
                >
                  <FaUserPlus className="mr-2" /> Sign Up
                </Link>
              </>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="text-2xl text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}

      {open && (
        <div className="md:hidden bg-white/90 shadow-lg animate-slide-down rounded-b-xl">
          <div className="px-2 pt-2 pb-3 space-y-2 flex flex-col">
            <Link
              to="/"
              className="flex items-center px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:bg-linear-to-r hover:from-blue-100 hover:to-pink-100 hover:text-blue-700 transition shadow-sm"
              onClick={() => setOpen(false)}
            >
              <FaHome className="mr-2" /> Home
            </Link>
            <Link
              to="/blogs"
              className="flex items-center px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:bg-linear-to-r hover:from-blue-100 hover:to-pink-100 hover:text-blue-700 transition shadow-sm"
              onClick={() => setOpen(false)}
            >
              <FaBlog className="mr-2" /> Blogs
            </Link>
            {userData?.role == "author" && (
              <>
                <Link
                  to="/add-blog"
                  className="flex items-center px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:bg-linear-to-r hover:from-green-100 hover:to-blue-100 hover:text-green-700 transition shadow-sm"
                  onClick={() => setOpen(false)}
                >
                  <MdOutlineAddPhotoAlternate className="mr-2" size={20} /> Add
                  Blog
                </Link>

                {userData?.blogs?.length > 0 && (
                  <Link
                    to="/total-blogs"
                    className="flex items-center px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:bg-linear-to-r hover:from-green-100 hover:to-blue-100 hover:text-green-700 transition shadow-sm"
                    onClick={() => setOpen(false)}
                  >
                    <FaRegFileAlt className="mr-2" size={20} /> My Blogs
                  </Link>
                )}
              </>
            )}
            {userData ? (
              <button
                className="flex items-center px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:bg-linear-to-r hover:from-pink-100 hover:to-blue-100 hover:text-pink-700 transition shadow-sm cursor-pointer"
                onClick={handleLogout}
              >
                <FaSignInAlt className="mr-2" /> Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="flex items-center px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:bg-linear-to-r hover:from-blue-100 hover:to-pink-100 hover:text-blue-700 transition shadow-sm"
                  onClick={() => setOpen(false)}
                >
                  <FaSignInAlt className="mr-2" /> Sign In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center px-4 py-2 rounded-full text-base font-medium text-white bg-linear-to-r from-blue-500 to-pink-400 hover:from-pink-400 hover:to-blue-500 transition shadow-lg"
                  onClick={() => setOpen(false)}
                >
                  <FaUserPlus className="mr-2" /> Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
