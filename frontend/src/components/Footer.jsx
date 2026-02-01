import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TbCircleDottedLetterB } from "react-icons/tb";

function Footer() {
  const { userData } = useSelector((state) => state.user);
  const navigate=useNavigate();

  return (
    <footer className="w-full bg-linear-to-br from-blue-50 via-pink-50 to-green-50 text-gray-700 md:py-10 py-2 border-t border-blue-100 shadow-md transition-all duration-300">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 
        gap-y-2 md:gap-y-0 gap-x-6">

        {/* Logo */}
        <div className="flex items-center gap-3 font-extrabold tracking-tight cursor-pointer 
          hover:scale-105 transition-transform duration-300" onClick={()=>navigate("/")}>
          
          <TbCircleDottedLetterB className="text-4xl text-purple-600" />

          <span className="text-2xl text-transparent bg-clip-text 
            bg-linear-to-r from-blue-600 via-purple-600 to-pink-600">
            BlogApp
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-8 text-base font-medium">
          <Link to="/" className="footer-link">
            Home
          </Link>
          <Link to="/blogs" className="footer-link">
            Blogs
          </Link>
          {userData?.role === "author" && (
            <Link to="/add-blog" className="footer-link">
              Add Blog
            </Link>
          )}
        </div>

        {/* Crafted with love */}
        <div className="text-sm md:text-base font-medium text-gray-600 flex items-center gap-2 
          bg-white/60 backdrop-blur-md px-5 py-2 rounded-full shadow-md border border-pink-200 
          hover:scale-105 transition-transform">
          
          <span>
            Crafted with <span className="text-red-500 animate-pulse">❤️</span> by{" "}
            <span className="font-bold bg-clip-text text-transparent 
              bg-linear-to-r from-blue-600 via-purple-600 to-pink-600">
              Basharat
            </span>
          </span>
        </div>

        {/* Copyright */}
        <div className="text-sm text-black font-light">
          &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
        </div>
      </div>

      {/* Footer link animation */}
      <style>{`
        .footer-link {
          position: relative;
          color: #64748b;
          text-decoration: none;
          transition: color 0.2s, transform 0.2s;
          padding: 0 0.25rem;
        }

        .footer-link:hover {
          color: #2563eb;
          text-decoration: underline;
          transform: scale(1.1) translateY(-2px);
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .footer-link::after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #60a5fa, #f472b6);
          transition: width 0.3s;
          border-radius: 2px;
          margin-top: 2px;
        }

        .footer-link:hover::after {
          width: 100%;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
