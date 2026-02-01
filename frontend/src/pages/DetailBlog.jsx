import { useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
  FaShareAlt,
  FaArrowLeft,
  FaRegThumbsUp,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";

// ─── Dummy Data ──────────────────────────────────────────────
const BLOG = {
  likes: 248,
  comments: [
    {
      id: 1,
      user: { name: "Raj Mehta", avatar: "https://i.pravatar.cc/150?img=12" },
      text: "This is incredibly well-written. The section on healthcare AI really hit home — my sister works in radiology and has seen firsthand how these tools are changing diagnostics.",
      date: "2025-01-28",
      likes: 34,
    },
    {
      id: 2,
      user: {
        name: "Sofia Larsson",
        avatar: "https://i.pravatar.cc/150?img=44",
      },
      text: "Great perspective, but I'd love to see more discussion on the ethical frameworks being proposed. The EU's AI Act is a fascinating starting point.",
      date: "2025-01-29",
      likes: 21,
    },
    {
      id: 3,
      user: {
        name: "Kai Nakamura",
        avatar: "https://i.pravatar.cc/150?img=68",
      },
      text: "Bookmarked this immediately. Sharing with my entire study group — we're writing a paper on exactly this topic.",
      date: "2025-01-30",
      likes: 18,
    },
  ],
};

// ─── Sub Components ──────────────────────────────────────────
function CommentInput({ onSubmit }) {
  const [text, setText] = useState("");
  return (
    <div className="flex gap-3 items-end">
      <div className="flex-1 relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a thoughtful comment..."
          rows={2}
          className="w-full bg-white border border-blue-100 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 rounded-xl px-4 py-3 pr-12 text-sm text-gray-700 placeholder-gray-400 resize-none outline-none transition-all duration-300"
        />
      </div>
      <button
        onClick={() => {
          if (text.trim()) {
            onSubmit(text);
            setText("");
          }
        }}
        className="shrink-0 w-11 h-11 bg-linear-to-br from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <FiSend size={18} />
      </button>
    </div>
  );
}

function CommentCard({ comment }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  return (
    <div className="flex gap-3 group">
      <img
        src={comment.user.avatar}
        alt={comment.user.name}
        className="w-9 h-9 rounded-full object-cover border-2 border-blue-100 group-hover:border-pink-200 transition-colors duration-300 shrink-0 mt-0.5"
      />
      <div className="flex-1 bg-white border border-blue-50 hover:border-pink-100 rounded-xl p-4 transition-all duration-300 hover:shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-semibold text-blue-700">
            {comment.user.name}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(comment.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{comment.text}</p>
        <button
          onClick={() => {
            setLiked(!liked);
            setLikes(liked ? likes - 1 : likes + 1);
          }}
          className="mt-2.5 flex items-center gap-1.5 text-xs text-gray-400 hover:text-pink-500 transition-colors duration-200"
        >
          {liked ? (
            <FaHeart size={11} className="text-pink-500" />
          ) : (
            <FaRegThumbsUp size={11} />
          )}
          <span className={liked ? "text-pink-500 font-semibold" : ""}>
            {likes}
          </span>
        </button>
      </div>
    </div>
  );
}

// ─── Main BlogDetail Component ───────────────────────────────
export default function DetailBlog() {
  const { id } = useParams();

  const { allBlogs } = useSelector((state) => state.user);

  const blog = allBlogs.find((blog) => blog._id === id);

  const allBlogsOfThisAuthor = allBlogs.filter(
    (b) => b.createdBy.email == blog?.createdBy.email,
  );

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(BLOG.likes);
  const [comments, setComments] = useState(BLOG.comments);
  const [showShareToast, setShowShareToast] = useState(false);
  const navigate = useNavigate();

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const handleAddComment = (text) => {
    setComments([
      {
        id: Date.now(),
        user: { name: "You", avatar: "https://i.pravatar.cc/150?img=1" },
        text,
        date: new Date().toISOString().split("T")[0],
        likes: 0,
      },
      ...comments,
    ]);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-pink-50 relative">
      {/* Toast */}
      <div
        className={`fixed top-6 right-6 z-50 bg-linear-to-r from-blue-600 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xl flex items-center gap-2 transition-all duration-500 ${showShareToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
      >
        ✓ Link copied to clipboard!
      </div>

      {/* Back Button */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <button
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-pink-600 font-medium transition-colors duration-300 hover:gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft size={13} /> Back to Blogs
        </button>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 mt-4">
        <div className="relative h-72 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={blog?.image?.secure_url || null}
            alt={blog?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-lienar-to-t from-black/60 via-black/10 to-transparent" />
          <span className="absolute top-4 left-4 text-xs bg-linear-to-r from-blue-500 to-pink-400 text-white px-3.5 py-1 rounded-full font-bold uppercase tracking-widest shadow-lg">
            {blog?.category}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 mt-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Body */}
          <article className="flex-1">
            {/* Title & Meta */}
            <h1 className="text-3xl font-extrabold text-blue-800 leading-snug tracking-tight">
              {blog?.title}
            </h1>

            {/* Action Bar */}
            <div className="flex items-center justify-between mt-5 pt-4 pb-4 border-t border-b border-blue-100">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setLiked(!liked);
                    setLikes(liked ? likes - 1 : likes + 1);
                  }}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold transition-all duration-300 ${liked ? "bg-pink-50 border-pink-200 text-pink-600" : "bg-white border-gray-200 text-gray-500 hover:border-pink-200 hover:text-pink-500"}`}
                >
                  {liked ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
                  <span>{likes}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:text-blue-500 text-sm font-semibold transition-all duration-300">
                  <FaRegComment size={14} />
                  <span>{comments.length}</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-2 rounded-full border transition-all duration-300 ${bookmarked ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-white border-gray-200 text-gray-500 hover:border-blue-200 hover:text-blue-500"}`}
                >
                  {bookmarked ? (
                    <FaBookmark size={15} />
                  ) : (
                    <FaRegBookmark size={15} />
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-pink-200 hover:text-pink-500 transition-all duration-300"
                >
                  <FaShareAlt size={15} />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="mt-6 text-base text-gray-600 italic border-l-4 border-gradient border-blue-300 pl-4 bg-blue-50/40 py-3 pr-4 rounded-r-lg leading-relaxed">
              {blog?.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {blog?.tags.split(",").map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-linear-to-r from-blue-100 to-pink-100 text-blue-700 hover:text-pink-600 px-3.5 py-1.5 rounded-full shadow-sm border border-blue-50 hover:border-pink-200 cursor-pointer transition-all duration-300 hover:shadow-md font-medium"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>

            {/* Author Card */}
            <div className="mt-10 p-5 bg-white rounded-2xl border border-blue-100 shadow-sm flex items-start gap-4">
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt={blog?.createdBy.name || "Author"}
                className="w-16 h-16 rounded-full object-cover border-2 border-gradient border-blue-200 shadow-md shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-blue-700">
                    {blog?.createdBy?.name}
                  </span>
                  <span className="text-xs bg-linear-to-r from-blue-500 to-pink-400 text-white px-2 py-0.5 rounded-full">
                    Author
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Something about the author—coming soon.
                </p>
                <button className="mt-2.5 text-xs font-semibold text-blue-600 hover:text-pink-600 transition-colors duration-300 border border-blue-200 hover:border-pink-300 px-3 py-1 rounded-full hover:bg-pink-50">
                  + Follow
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12">
              <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2">
                <FaRegComment size={18} className="text-pink-500" />
                Comments{" "}
                <span className="text-sm font-normal text-gray-400">
                  ({comments.length})
                </span>
              </h3>

              <div className="mt-4">
                <CommentInput onSubmit={handleAddComment} />
              </div>

              <div className="mt-5 space-y-3">
                {comments.map((c) => (
                  <CommentCard key={c.id} comment={c} />
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-6 space-y-6">
              {/* Related Posts */}
              <div>
                <h4 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
                  All Blogs of {blog?.createdBy?.name}
                </h4>
                <div className="space-y-4">
                  {allBlogsOfThisAuthor.map((blog, i) => (
                    // <RelatedCard key={i} blog={b} />
                    <BlogCard key={i} {...blog} />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
