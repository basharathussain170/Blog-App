import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Example props: pass a blog object to this card
function BlogCard({
  title = "Blog Title",
  description = "This is a short description of the blog post. It should be concise and engaging.",
  image = {
    secure_url:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  category = "science",
  tags = "#tag1, #tag2",
  likes = 0,
  createdBy = {name:"Author"},
  comments = [],
  createdAt = new Date().toISOString(),
  _id
}) {
  const navigate=useNavigate();
  return (
    <div className="bg-white/90 rounded-2xl shadow-xl overflow-hidden flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300 border border-blue-100 hover:border-pink-200 ring-1 ring-blue-50 hover:ring-pink-100 cursor-pointer" onClick={()=>navigate(`/get-blog/${_id}`)}>
      <div className="h-52 w-full overflow-hidden relative group">
        <img
          src={image?.secure_url || null}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-3 py-1 bg-linear-to-r from-blue-500 to-pink-400 text-white text-xs font-semibold rounded-full shadow-lg uppercase tracking-wide">
          {category}
        </span>
      </div>
      <div className="flex-1 flex flex-col p-6">
        <h2 className="text-xl font-bold mb-2 text-blue-700 line-clamp-2 drop-shadow-sm">
          {title}
        </h2>
        <p className="text-gray-600 text-base mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags &&
            tags.split(",").map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-linear-to-r from-blue-100 to-pink-100 text-blue-700 px-3 py-1 rounded-full shadow"
              >
                {tag.trim()}
              </span>
            ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-blue-50">
          <div className="flex items-center gap-4 text-gray-500">
            <span className="flex items-center gap-1 text-pink-500 font-semibold">
              <FaRegHeart /> {likes}
            </span>
            <span className="flex items-center gap-1 text-blue-500 font-semibold">
              <FaRegComment /> {comments.length}
            </span>
          </div>
          <div className="text-xs text-gray-400 flex flex-col items-end">
            <span>by {createdBy?.name || "Unknown"}</span>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
