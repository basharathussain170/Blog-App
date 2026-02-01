import asyncHandler from "express-async-handler";
import BlogModel from "../models/Blog.model.js";

import { deleteImage, uploadImage } from "../utils/cloudinary.util.js";
import ErrorResponse from "../utils/ErrorResponse.util.js";
import { generateBlogDescription } from "../utils/gemini.util.js";
import UserModel from "../models/User.model.js";

const getDataURL = (bufferValue, mimetype) => {
  const b64 = bufferValue.toString("base64");
  return `data:${mimetype};base64,${b64}`;
};

// data:fileType;base64,buffer value in base 64 format
export const generateDescription = asyncHandler(async (req, res, next) => {
  const { title } = req.body;

  const description = await generateBlogDescription(title);

  res.json({
    success: true,
    message: "Description generated successfully",
    description,
  });
});

export const addBlog = asyncHandler(async (req, res, next) => {
  const { title, description, category, tags } = req.body;
  const userId = req.myUser._id;

  let secure_url = "";
  let public_id = "";

  if (req.file) {
    let dataURL = getDataURL(req.file.buffer, req.file.mimetype);

    let uploadedImage = await uploadImage(dataURL);
    if (uploadedImage) {
      secure_url = uploadedImage.secure_url;
      public_id = uploadedImage.public_id;
    }
  }

  let newBlog = await BlogModel.create({
    title,
    description,
    category,
    tags,
    image: { secure_url, public_id },
    createdBy: userId,
  });

  newBlog=await newBlog.populate({path:"createdBy",select:"name email totalBlogs -_id"})

  await UserModel.updateOne(
    { _id: userId },
    {
      $inc: { totalBlogs: 1 },
    },
  );

  await UserModel.updateOne(
    { _id: userId },
    { $push: { blogs: { blogId: newBlog._id } } },
  );

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    payload: newBlog,
  });
});

export const getBlogs = asyncHandler(async (req, res, next) => {
  let blogs = await BlogModel.find().populate({
    path: "createdBy",
    select: "email name totalBlogs -_id", //? "name -_id"
  });

  if (blogs.length === 0) return next(new ErrorResponse("No Blogs found", 404));

  res.status(200).json({
    success: true,
    message: "Blogs fetched successfully",
    count: blogs.length,
    payload: blogs,
  });
});

export const getAuthorBlogs = asyncHandler(async (req, res, next) => {
  const userId = req.myUser._id;
  const authorBlogs = await BlogModel.find({ createdBy: userId });
  if (authorBlogs.length == 0)
    return next(new ErrorResponse("Blogs not found", 404));
  res
    .status(200)
    .json({ success: true, message: "All blogs are", payload: authorBlogs });
});

export const deleteBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;
  const userId = req.myUser._id;

  const blog = await BlogModel.findOne({ _id: blogId, createdBy: userId });
  if (!blog) {
    return next(new ErrorResponse("Blog not found", 404));
  }
  const oldPublicId=blog?.image?.public_id;
  if(oldPublicId){
    await deleteImage(oldPublicId);
  }

  const deletedBlog = await BlogModel.findOneAndDelete({
    _id: blogId,
    createdBy: userId,
  });
  if (!deletedBlog) {
    return next(new ErrorResponse("Error while delete blog", 500));
  }

  await UserModel.findByIdAndUpdate(userId, {
    $inc: { totalBlogs: -1 },
    $pull: { blogs: { blogId: blogId } },
  });

  return res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
    blog: deletedBlog,
  });
});

export const updateBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;
  const userId = req.myUser._id;
  const blog = await BlogModel.findOne({ _id: blogId, createdBy: userId });
  if (!blog) return next(new ErrorResponse("Blog not found", 404));

  let oldPublicId = blog?.image?.public_id;

  let secure_url = "";
  let public_id = "";

  if (req.file) {
    let dataURL = getDataURL(req.file.buffer, req.file.mimetype);

    let uploadedImage = await uploadImage(dataURL);
    if (uploadedImage) {
      secure_url = uploadedImage.secure_url;
      public_id = uploadedImage.public_id;
    }
  }
  const newBlog = await BlogModel.findOneAndUpdate(
    { _id: blogId, createdBy: userId },
    { ...req.body, image: { secure_url, public_id } },
    { new: true, runValidators: true },
  );
  if (oldPublicId) {
    await deleteImage(oldPublicId);
  }
  res
    .status(200)
    .json({ success: true, message: "updated blog", blog: newBlog });
});

export const getBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;

  const blog = await BlogModel.findById(blogId).populate({
    path: "createdBy",
    select: "email name totalBlogs -_id", //? "name -_id"
  });
  // const blog = await BlogModel.findById(blogId).populate("createdBy");

  if (!blog) return next(new ErrorResponse("Blog not found", 404));
  res.status(200).json({
    success: true,
    message: "Blog fetched successfully",
    payload: blog,
  });
});





// export const updateBlogDetails = asyncHandler(async (req, res, next) => {
//   let userId = req.myUser._id;
//   let blogId = req.params.id;

//   let blog = await BlogModel.findOneAndUpdate(
//     { _id: blogId, createdBy: userId }, // filter
//     req.body, // updation value
//     {
//       new: true,
//       runValidators: true, // options
//     },
//   );

//   if (!blog) return next(new ErrorResponse("Blog not found", 404));

//   res.status(200).json({
//     success: true,
//     message: "Blog updated successfully",
//     payload: blog,
//   });
// });

// export const updateImage = asyncHandler(async (req, res, next) => {
//   let blogId = req.params.id;
//   let userId = req.myUser._id;

//   let blog = await BlogModel.findOne({ _id: blogId, createdBy: userId }); // filter
//   if (!blog) return next(new ErrorResponse("Blog not found", 404));

//   let oldPublicId = blog?.image?.public_id;

//   //! new image ---> upload
//   // let path = req?.file?.path;
//   // let { secure_url, public_id } = await uploadImage(path);

//   let secure_url = "";
//   let public_id = "";

//   if (req.file) {
//     let dataURL = getDataURL(req.file.buffer, req.file.mimetype);

//     let uploadedImage = await uploadImage(dataURL);
//     if (uploadedImage) {
//       secure_url = uploadedImage.secure_url;
//       public_id = uploadedImage.public_id;
//     }
//   }

//   blog.image.secure_url = secure_url;
//   blog.image.public_id = public_id;

//   await blog.save();
//   console.log("blog: ", blog);

//   console.log("oldPublicId: ", oldPublicId);
//   await deleteImage(oldPublicId);

//   res.status(200).json({
//     success: true,
//     message: "Image updated Successfully",
//   });
// });

// export const deleteBlogImage = asyncHandler(async (req, res, next) => {
//   const blogId = req.params.id;
//   const userId = req.myUser._id;

//   let blog = await BlogModel.findOne({ _id: blogId, createdBy: userId });
//   if (!blog) return next(new ErrorResponse("Blog Not Found!!!", 404));

//   let imageId = blog.image.public_id;

//   let resp = await deleteImage(imageId);
//   if (resp.result == "ok") {
//     res.status(200).json({
//       success: true,
//       message: "Image deleted successfully",
//     });
//   } else {
//     res.status(200).json({
//       success: false,
//       message: "Image not deleted",
//     });
//   }
// });

// https://github.com/Wolfgang281/TypeIT-BlogApp

// https://excalidraw.com/#json=1cGWSYHIvaQP37vyUe1ym,GidcqZK0SYxklH-MZhU1mA

//! google ai studio >> get an api key >> create api key >> create a variable in .env and paste the api key
// ? then install npm install @google/genai
