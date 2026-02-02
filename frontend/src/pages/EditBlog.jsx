import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { updateAuthorBlog } from "../redux/userSlice";

const categories = [
  "science",
  "education",
  "sports",
  "gaming",
  "books",
  "foods",
  "travel",
];

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [descriptionLoader, setDescriptionLoader] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const [imageFile, setImageFile] = useState(null); // File
  const [imagePreview, setImagePreview] = useState(""); // URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setLoader(true);
      const response = await axios.patch(
        `${Server_URL}/blogs/edit-blog/${id}`,
        formData,
        {
          withCredentials: true,
        },
      );
      console.log("Blog edited successfully:", response.data);
      alert("Blog edited successfully!");
      setLoader(false);

      console.log("updated blog:", response?.data?.blog);
      dispatch(updateAuthorBlog(response?.data?.blog));

      navigate("/");
    } catch (error) {
      setLoader(false);
      console.log("Error editing blog:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to edit blog");
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${Server_URL}/blogs/single/${id}`, {
          // withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const blog = response?.data?.payload;
        setTitle(blog?.title);
        setDescription(blog?.description);
        setCategory(blog?.category);
        setTags(blog?.tags);

        setImagePreview(blog?.image?.secure_url); // direct URL
        setImageFile(null);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-300 py-8 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 relative">
        <div className="absolute top-3 left-3" onClick={() => navigate("/")}>
          <MdKeyboardBackspace
            size={28}
            className="
      text-red-500
      cursor-pointer
      transition-all duration-300 ease-in-out
      hover:scale-125
      hover:text-red-700
      active:scale-110
      drop-shadow-md
      hover:drop-shadow-lg
    "
          />
        </div>

        <div className="flex flex-col items-center mb-6">
          <FaPlus className="text-4xl text-blue-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">Edit Blog</h2>
          <p className="text-gray-500 text-sm mt-1">Update your blog post!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
                <FaHeading className="text-gray-400 mr-2" />
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-transparent outline-none text-gray-700"
                  placeholder="Enter blog title"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
                <FaList className="text-gray-400 mr-2" />
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full bg-transparent outline-none text-gray-700"
                >
                  <option value="">Select category</option>
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
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <div className="flex items-start border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
                <FaAlignLeft className="text-gray-400 mr-2 mt-1" />
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="w-full bg-transparent outline-none text-gray-700 resize-none"
                  placeholder="Write your blog description..."
                />
              </div>

              <button
                type="button"
                className="ml-2 mt-2 px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2
             bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500
             hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600
             transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.6)]
             hover:shadow-[0_0_25px_rgba(59,130,246,0.9)]
             active:scale-95 whitespace-nowrap cursor-pointer"
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
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tags
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
                <FaTags className="text-gray-400 mr-2" />
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700"
                  placeholder="e.g. react, node, webdev"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
                <FaImage className="text-gray-400 mr-2" />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-transparent outline-none text-gray-700"
                />
              </div>
              {imagePreview && (
                <img
                  src={imagePreview || image?.secure_url}
                  alt="Preview"
                  className="mt-2 rounded-lg h-32 object-cover w-full border"
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition mt-4 cursor-pointer"
          >
            {loader ? <Loader /> : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;
