import React from "react";
import Blogs from "../components/Blogs";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-pink-50 to-green-50 pt-16">
      <Nav/>
      <section className="pt-16 pb-20 text-center px-4">
        
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 tracking-tight leading-tight">
          Welcome to BlogApp
        </h1>
        
        <div className="max-w-2xl mx-auto mb-10">
          <p className="text-xl md:text-2xl text-gray-700 font-light italic mb-4">
            "Words have the power to change the world"
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Discover, create, and share amazing stories. Dive into a world of
            knowledge, inspiration, and creativity!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-blue-200 text-blue-700 font-medium hover:scale-105 transition-transform">
            ✨ Inspiring Stories
          </div>
          <div className="px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-pink-200 text-pink-700 font-medium hover:scale-105 transition-transform">
            💡 Fresh Ideas
          </div>
          <div className="px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-green-200 text-green-700 font-medium hover:scale-105 transition-transform">
            🌍 Global Voices
          </div>
        </div>
        
        
         <button onClick={() => navigate("/blogs")}
          className="inline-block px-12 py-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-pink-500/50 hover:scale-110 hover:-rotate-2 transition-all duration-300 transform active:scale-95 cursor-pointer"
        >
          Explore Blogs
        </button>

        <div className="mt-16 max-w-3xl mx-auto bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100">
          <p className="text-lg md:text-xl text-gray-700 italic font-light">
            "Every great story starts with a single word. Your journey begins here."
          </p>
        </div>
      </section>
      
      <div id="blogs" className="scroll-mt-20">
        <Blogs />
      </div>
    </div>
  );
}

export default Home;