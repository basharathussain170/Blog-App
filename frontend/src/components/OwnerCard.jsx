import axios from "axios";
import { Server_URL } from "../main";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeAuthorBlog } from "../redux/userSlice";
import { useState } from "react";
import Loader from "./Loader";

// Example props: pass a blog object to this card
function OwnerCard({
  title,
  description,
  image = {
    secure_url:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  category,
  tags,
  _id,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const handleDelete = async () => {
    try {
      setLoader(true);
      const response = await axios.delete(
        `${Server_URL}/blogs/delete-blog/${_id}`,
        {
          withCredentials: true,
        },
      );
      dispatch(removeAuthorBlog(_id));
      console.log("Blog deleted successfully:", response.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Error deleting blog:", error);
    }
  };
  return (
    <div className="bg-white/90 rounded-2xl shadow-xl overflow-hidden flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300 border border-blue-100 hover:border-pink-200 ring-1 ring-blue-50 hover:ring-pink-100">
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
        {/* Edit & Delete Buttons */}
        <div className="flex gap-3 mt-4 w-full">
          <button
            className="w-1/2 px-4 py-2 text-sm font-semibold rounded-full bg-linear-to-r from-blue-500 to-pink-400 text-white shadow hover:from-pink-400 hover:to-blue-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
            title="Edit Blog"
            onClick={() => navigate(`/edit-blog/${_id}`)}
          >
            Edit
          </button>
          <button
            className=" w-1/2 px-4 py-2 text-sm font-semibold rounded-full bg-linear-to-r from-pink-500 to-red-400 text-white shadowhover:from-red-400 hover:to-pink-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer flex items-center justify-center"
            title="Delete Blog"
            onClick={handleDelete}
          >
            {loader ? <Loader /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OwnerCard;
