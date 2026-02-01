import React from "react";
import BlogCard from "./BlogCard";
import { useSelector } from "react-redux";

// Example data for demonstration
const demoBlogs = [
  {
    title: "The Wonders of Science",
    description:
      "Explore the latest discoveries in science and how they impact our world today.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
    category: "science",
    tags: "#science, #discovery",
    likes: 12,
    comments: [{}, {}],
    createdBy: { name: "Alice" },
    createdAt: "2026-01-28T10:00:00Z",
  },
  {
    title: "Traveling the World",
    description:
      "A guide to the most beautiful places to visit and how to travel smart.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    category: "travel",
    tags: "#travel, #adventure",
    likes: 8,
    comments: [{}],
    createdBy: { name: "Bob" },
    createdAt: "2026-01-27T15:30:00Z",
  },
  {
    title: "Healthy Foods for Life",
    description:
      "Discover the best foods to keep you healthy and energized every day.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    category: "foods",
    tags: "#food, #health",
    likes: 20,
    comments: [{}, {}, {}],
    createdBy: { name: "Carol" },
    createdAt: "2026-01-26T09:20:00Z",
  },
  {
    title: "The Wonders of Science",
    description:
      "Explore the latest discoveries in science and how they impact our world today.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
    category: "science",
    tags: "#science, #discovery",
    likes: 12,
    comments: [{}, {}],
    createdBy: { name: "Alice" },
    createdAt: "2026-01-28T10:00:00Z",
  },
  {
    title: "Traveling the World",
    description:
      "A guide to the most beautiful places to visit and how to travel smart.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    category: "travel",
    tags: "#travel, #adventure",
    likes: 8,
    comments: [{}],
    createdBy: { name: "Bob" },
    createdAt: "2026-01-27T15:30:00Z",
  },
  {
    title: "Healthy Foods for Life",
    description:
      "Discover the best foods to keep you healthy and energized every day.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    category: "foods",
    tags: "#food, #health",
    likes: 20,
    comments: [{}, {}, {}],
    createdBy: { name: "Carol" },
    createdAt: "2026-01-26T09:20:00Z",
  },
  {
    title: "The Wonders of Science",
    description:
      "Explore the latest discoveries in science and how they impact our world today.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
    category: "science",
    tags: "#science, #discovery",
    likes: 12,
    comments: [{}, {}],
    createdBy: { name: "Alice" },
    createdAt: "2026-01-28T10:00:00Z",
  },
  {
    title: "Traveling the World",
    description:
      "A guide to the most beautiful places to visit and how to travel smart.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    category: "travel",
    tags: "#travel, #adventure",
    likes: 8,
    comments: [{}],
    createdBy: { name: "Bob" },
    createdAt: "2026-01-27T15:30:00Z",
  },
  {
    title: "Healthy Foods for Life",
    description:
      "Discover the best foods to keep you healthy and energized every day.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    category: "foods",
    tags: "#food, #health",
    likes: 20,
    comments: [{}, {}, {}],
    createdBy: { name: "Carol" },
    createdAt: "2026-01-26T09:20:00Z",
  },
  {
    title: "The Wonders of Science",
    description:
      "Explore the latest discoveries in science and how they impact our world today.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
    category: "science",
    tags: "#science, #discovery",
    likes: 12,
    comments: [{}, {}],
    createdBy: { name: "Alice" },
    createdAt: "2026-01-28T10:00:00Z",
  },
  {
    title: "Traveling the World",
    description:
      "A guide to the most beautiful places to visit and how to travel smart.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    category: "travel",
    tags: "#travel, #adventure",
    likes: 8,
    comments: [{}],
    createdBy: { name: "Bob" },
    createdAt: "2026-01-27T15:30:00Z",
  },
  {
    title: "Healthy Foods for Life",
    description:
      "Discover the best foods to keep you healthy and energized every day.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    category: "foods",
    tags: "#food, #health",
    likes: 20,
    comments: [{}, {}, {}],
    createdBy: { name: "Carol" },
    createdAt: "2026-01-26T09:20:00Z",
  },
  {
    title: "The Wonders of Science",
    description:
      "Explore the latest discoveries in science and how they impact our world today.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
    category: "science",
    tags: "#science, #discovery",
    likes: 12,
    comments: [{}, {}],
    createdBy: { name: "Alice" },
    createdAt: "2026-01-28T10:00:00Z",
  },
  {
    title: "Traveling the World",
    description:
      "A guide to the most beautiful places to visit and how to travel smart.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    category: "travel",
    tags: "#travel, #adventure",
    likes: 8,
    comments: [{}],
    createdBy: { name: "Bob" },
    createdAt: "2026-01-27T15:30:00Z",
  },
  {
    title: "Healthy Foods for Life",
    description:
      "Discover the best foods to keep you healthy and energized every day.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    category: "foods",
    tags: "#food, #health",
    likes: 20,
    comments: [{}, {}, {}],
    createdBy: { name: "Carol" },
    createdAt: "2026-01-26T09:20:00Z",
  },
  {
    title: "The Wonders of Science",
    description:
      "Explore the latest discoveries in science and how they impact our world today.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
    category: "science",
    tags: "#science, #discovery",
    likes: 12,
    comments: [{}, {}],
    createdBy: { name: "Alice" },
    createdAt: "2026-01-28T10:00:00Z",
  },
  {
    title: "Traveling the World",
    description:
      "A guide to the most beautiful places to visit and how to travel smart.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    category: "travel",
    tags: "#travel, #adventure",
    likes: 8,
    comments: [{}],
    createdBy: { name: "Bob" },
    createdAt: "2026-01-27T15:30:00Z",
  },
  {
    title: "Healthy Foods for Life",
    description:
      "Discover the best foods to keep you healthy and energized every day.",
    image: {
      secure_url:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    category: "foods",
    tags: "#food, #health",
    likes: 20,
    comments: [{}, {}, {}],
    createdBy: { name: "Carol" },
    createdAt: "2026-01-26T09:20:00Z",
  },
];

function Blogs() {
  const { allBlogs } = useSelector((state) => state.user);
  const blogs = allBlogs && allBlogs.length > 0 ? allBlogs : demoBlogs;

  return (
    <div className="relative min-h-[90vh] py-10 px-2 sm:px-4 md:px-8 bg-linear-to-br from-blue-100 via-pink-100 to-yellow-50 overflow-x-hidden">
      

      <div className="max-w-7xl mx-auto">
        {/* Glassmorphism Header */}
        <div className="flex flex-col items-center mb-12 mt-4 animate-fade-in">
          <div className="relative px-8 py-7 bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-200 max-w-3xl mx-auto text-center">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl select-none opacity-20 pointer-events-none">
              ✍️
            </span>
            <blockquote className="text-2xl md:text-3xl font-bold text-blue-700 italic drop-shadow-sm">
              "A blog is not just a story, it's a journey of thoughts."
            </blockquote>
            <span className="block mt-3 text-base text-gray-500 font-medium">
              — BlogApp Community
            </span>
            <div className="mt-7 flex flex-col items-center gap-2">
              <span className="text-xl md:text-2xl font-semibold text-gray-700 flex items-center gap-2">
                <span className="inline-block animate-bounce text-pink-500 text-3xl md:text-4xl font-extrabold bg-white/80 px-4 py-2 rounded-xl border-2 border-pink-200 shadow-lg">
                  {blogs.length}
                </span>
                <span className="ml-2 font-bold text-blue-600">Blogs</span>
              </span>
              <span className="text-lg md:text-xl text-pink-600 font-semibold mt-1 animate-fade-in-slow">
                You can{" "}
                <span className="font-extrabold underline decoration-blue-400 decoration-2">
                  explore
                </span>{" "}
                all these amazing stories today!
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-10">
          <div className="grow h-0.5 bg-linear-to-r from-pink-300 via-blue-200 to-yellow-200 opacity-60 rounded-full" />
          <span className="mx-4 text-lg text-gray-400 font-bold tracking-widest uppercase">
            Discover
          </span>
          <div className="grow h-0.5 bg-linear-to-l from-pink-300 via-blue-200 to-yellow-200 opacity-60 rounded-full" />
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, idx) => (
            <div
              key={idx}
              className="transform hover:-translate-y-3 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl rounded-2xl bg-white/80 backdrop-blur-md border border-blue-100"
              style={{ minHeight: "100%" }}
            >
              <BlogCard {...blog} />
            </div>
          ))}
        </div>

        {/* Fun Footer Section */}
        <div className="mt-16 flex flex-col items-center gap-2 animate-fade-in-slow">
          <span className="text-gray-500 text-base font-medium">
            Keep scrolling for more inspiration ✨
          </span>
          <span className="text-xs text-gray-400">
            BlogApp &copy; {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
