import React from "react";
import OwnerCard from "./OwnerCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Example data for demonstration
// const demoBlogs = [
//   {
//     title: "The Wonders of Science",
//     description:
//       "Explore the latest discoveries in science and how they impact our world today.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "science",
//     tags: "#science, #discovery",
//     likes: 12,
//     comments: [{}, {}],
//     createdBy: { name: "Alice" },
//     createdAt: "2026-01-28T10:00:00Z",
//   },
//   {
//     title: "Traveling the World",
//     description:
//       "A guide to the most beautiful places to visit and how to travel smart.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "travel",
//     tags: "#travel, #adventure",
//     likes: 8,
//     comments: [{}],
//     createdBy: { name: "Bob" },
//     createdAt: "2026-01-27T15:30:00Z",
//   },
//   {
//     title: "Healthy Foods for Life",
//     description:
//       "Discover the best foods to keep you healthy and energized every day.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "foods",
//     tags: "#food, #health",
//     likes: 20,
//     comments: [{}, {}, {}],
//     createdBy: { name: "Carol" },
//     createdAt: "2026-01-26T09:20:00Z",
//   },
//   {
//     title: "The Wonders of Science",
//     description:
//       "Explore the latest discoveries in science and how they impact our world today.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "science",
//     tags: "#science, #discovery",
//     likes: 12,
//     comments: [{}, {}],
//     createdBy: { name: "Alice" },
//     createdAt: "2026-01-28T10:00:00Z",
//   },
//   {
//     title: "Traveling the World",
//     description:
//       "A guide to the most beautiful places to visit and how to travel smart.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "travel",
//     tags: "#travel, #adventure",
//     likes: 8,
//     comments: [{}],
//     createdBy: { name: "Bob" },
//     createdAt: "2026-01-27T15:30:00Z",
//   },
//   {
//     title: "Healthy Foods for Life",
//     description:
//       "Discover the best foods to keep you healthy and energized every day.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "foods",
//     tags: "#food, #health",
//     likes: 20,
//     comments: [{}, {}, {}],
//     createdBy: { name: "Carol" },
//     createdAt: "2026-01-26T09:20:00Z",
//   },
//   {
//     title: "The Wonders of Science",
//     description:
//       "Explore the latest discoveries in science and how they impact our world today.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "science",
//     tags: "#science, #discovery",
//     likes: 12,
//     comments: [{}, {}],
//     createdBy: { name: "Alice" },
//     createdAt: "2026-01-28T10:00:00Z",
//   },
//   {
//     title: "Traveling the World",
//     description:
//       "A guide to the most beautiful places to visit and how to travel smart.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "travel",
//     tags: "#travel, #adventure",
//     likes: 8,
//     comments: [{}],
//     createdBy: { name: "Bob" },
//     createdAt: "2026-01-27T15:30:00Z",
//   },
//   {
//     title: "Healthy Foods for Life",
//     description:
//       "Discover the best foods to keep you healthy and energized every day.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "foods",
//     tags: "#food, #health",
//     likes: 20,
//     comments: [{}, {}, {}],
//     createdBy: { name: "Carol" },
//     createdAt: "2026-01-26T09:20:00Z",
//   },
//   {
//     title: "The Wonders of Science",
//     description:
//       "Explore the latest discoveries in science and how they impact our world today.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "science",
//     tags: "#science, #discovery",
//     likes: 12,
//     comments: [{}, {}],
//     createdBy: { name: "Alice" },
//     createdAt: "2026-01-28T10:00:00Z",
//   },
//   {
//     title: "Traveling the World",
//     description:
//       "A guide to the most beautiful places to visit and how to travel smart.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "travel",
//     tags: "#travel, #adventure",
//     likes: 8,
//     comments: [{}],
//     createdBy: { name: "Bob" },
//     createdAt: "2026-01-27T15:30:00Z",
//   },
//   {
//     title: "Healthy Foods for Life",
//     description:
//       "Discover the best foods to keep you healthy and energized every day.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "foods",
//     tags: "#food, #health",
//     likes: 20,
//     comments: [{}, {}, {}],
//     createdBy: { name: "Carol" },
//     createdAt: "2026-01-26T09:20:00Z",
//   },
//   {
//     title: "The Wonders of Science",
//     description:
//       "Explore the latest discoveries in science and how they impact our world today.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "science",
//     tags: "#science, #discovery",
//     likes: 12,
//     comments: [{}, {}],
//     createdBy: { name: "Alice" },
//     createdAt: "2026-01-28T10:00:00Z",
//   },
//   {
//     title: "Traveling the World",
//     description:
//       "A guide to the most beautiful places to visit and how to travel smart.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "travel",
//     tags: "#travel, #adventure",
//     likes: 8,
//     comments: [{}],
//     createdBy: { name: "Bob" },
//     createdAt: "2026-01-27T15:30:00Z",
//   },
//   {
//     title: "Healthy Foods for Life",
//     description:
//       "Discover the best foods to keep you healthy and energized every day.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "foods",
//     tags: "#food, #health",
//     likes: 20,
//     comments: [{}, {}, {}],
//     createdBy: { name: "Carol" },
//     createdAt: "2026-01-26T09:20:00Z",
//   },
//   {
//     title: "The Wonders of Science",
//     description:
//       "Explore the latest discoveries in science and how they impact our world today.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "science",
//     tags: "#science, #discovery",
//     likes: 12,
//     comments: [{}, {}],
//     createdBy: { name: "Alice" },
//     createdAt: "2026-01-28T10:00:00Z",
//   },
//   {
//     title: "Traveling the World",
//     description:
//       "A guide to the most beautiful places to visit and how to travel smart.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "travel",
//     tags: "#travel, #adventure",
//     likes: 8,
//     comments: [{}],
//     createdBy: { name: "Bob" },
//     createdAt: "2026-01-27T15:30:00Z",
//   },
//   {
//     title: "Healthy Foods for Life",
//     description:
//       "Discover the best foods to keep you healthy and energized every day.",
//     image: {
//       secure_url:
//         "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
//     },
//     category: "foods",
//     tags: "#food, #health",
//     likes: 20,
//     comments: [{}, {}, {}],
//     createdBy: { name: "Carol" },
//     createdAt: "2026-01-26T09:20:00Z",
//   },
// ];

function OwnerBlogs() {
  const { authorBlogs, userData } = useSelector((state) => state.user);
  const navigate=useNavigate();
  return (
    <div className="min-h-[80vh] py-8 px-2 sm:px-4 md:px-8 bg-linear-to-br from-white via-blue-50 to-pink-50 blogs-scrollbar">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-pink-500 to-purple-600 animate-pulse drop-shadow-lg mb-2">
          Welcome Back, <span className="capitalize">{userData.name}</span>! 🌟
        </h1>
        <p className="text-lg md:text-xl text-gray-700 font-medium mb-4">
          This is your personal blog showcase. Here you can see all{" "}
          <span className="font-extrabold  text-red-600">{authorBlogs.length}</span>{" "}
          of your published stories, thoughts, and adventures.
        </p>
        <div className="w-16 h-1 mx-auto bg-linear-to-r from-blue-400 via-pink-400 to-purple-400 rounded-full mb-6" />
        <p className="text-md md:text-lg text-gray-500 italic mb-2">
          "Your words have the power to inspire, inform, and ignite curiosity.
          Keep sharing your journey!"
        </p>
        <button className="mt-4 px-6 py-2 bg-linear-to-r from-blue-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer" onClick={()=>navigate("/add-blog")}>
          Write a New Blog
        </button>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {authorBlogs.map((blog, idx) => (
            <OwnerCard key={idx} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OwnerBlogs;
