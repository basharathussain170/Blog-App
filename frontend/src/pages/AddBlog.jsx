import axios from "axios";
import React, { useState } from "react";
import {
  FaHeading,
  FaAlignLeft,
  FaImage,
  FaTags,
  FaList,
  FaPlus,
} from "react-icons/fa";
import { MdKeyboardBackspace } from "react-icons/md";
import { Server_URL } from "../main";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { addNewBlog } from "../redux/userSlice";

const categories = [
  "science",
  "education",
  "sports",
  "gaming",
  "books",
  "foods",
  "travel",
];

function AddBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [descriptionLoader, setDescriptionLoader] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const cleanDescription = description
      .trim() // remove spaces at start & end
      .replace(/\n\s*\n/g, "\n\n") // remove multiple empty lines
      .replace(/\s{2,}/g, " "); // replace multiple spaces with single space

    formData.append("title", title);
    formData.append("description", cleanDescription);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("image", image);

    try {
      setLoader(true);
      const response = await axios.post(`${Server_URL}/blogs/add`, formData, {
        withCredentials: true,
      });
      dispatch(addNewBlog(response?.data?.payload));

      setLoader(false);
      navigate("/");
    } catch (error) {
      setLoader(false);
      setError(error.response?.data?.message || "Failed to add blog");
    }
  };

  const generateDescription = async () => {
    try {
      if (!title) {
        alert("Please enter a title to generate description");
        return;
      }
      setDescriptionLoader(true);
      const response = await axios.post(
        `${Server_URL}/blogs/generate-description`,
        { title },
        { withCredentials: true },
      );
      const aiText =
        response?.data?.description?.candidates[0]?.content.parts[0]?.text;
      const cleanText = aiText.replace(/\*\*/g, "");
      setDescription(cleanText);
      setDescriptionLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(
        "Error generating description:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-300 py-8 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 relative">
        <div className="absolute top-3 left-3" onClick={() => navigate("/")}>
          <MdKeyboardBackspace
            size={28}
            className="text-red-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125 hover:text-red-700 active:scale-110 drop-shadow-mdhover:drop-shadow-lg"
          />
        </div>

        <div className="flex flex-col items-center mb-6">
          <FaPlus className="text-4xl text-blue-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">Add New Blog</h2>
          <p className="text-gray-500 text-sm mt-1">
            Share your thoughts with the world!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
              >
                Title
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 cursor-pointer">
                <FaHeading className="text-gray-400 mr-2" />
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-transparent outline-none text-gray-700 cursor-pointer"
                  placeholder="Enter blog title"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
              >
                Category
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 cursor-pointer">
                <FaList className="text-gray-400 mr-2" />
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full bg-transparent outline-none text-gray-700 cursor-pointer"
                >
                  <option value="" >Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
              >
                Description
              </label>
              <div className="flex items-start border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 cursor-pointer">
                <FaAlignLeft className="text-gray-400 mr-2 mt-1" />
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="w-full bg-transparent outline-none text-gray-700 resize-none cursor-pointer"
                  placeholder="Write your blog description..."
                />
              </div>

              <button
                type="button"
                className="ml-2 mt-2 px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.6)]hover:shadow-[0_0_25px_rgba(59,130,246,0.9)] active:scale-95 whitespace-nowrap cursor-pointer"
                onClick={generateDescription}
              >
                {descriptionLoader ? (
                  <Loader />
                ) : description ? (
                  "Regenerate Description"
                ) : (
                  "Generate Description"
                )}
              </button>
            </div>
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
              >
                Tags
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 cursor-pointer">
                <FaTags className="text-gray-400 mr-2" />
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 cursor-pointer"
                  placeholder="e.g. react, node, webdev"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
              >
                Image
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 cursor-pointer">
                <FaImage className="text-gray-400 mr-2" />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full bg-transparent outline-none text-gray-700 cursor-pointer"
                />
              </div>
              {image && (
                <img
                  src={image ? URL.createObjectURL(image) : ""}
                  alt="Preview"
                  className="mt-2 rounded-lg h-32 object-cover w-full border cursor-pointer"
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loader}
          >
            {loader ? <Loader /> : "Add Blog"}
          </button>
        </form>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
}

export default AddBlog;
