import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/ErrorResponse.util.js";
import { generateJwtToken } from "../utils/jwt.util.js";
import UserModel from "../models/User.model.js";

export const register = asyncHandler(async (req, res, next) => {
  const { name, age, email, isMarried, password, role } = req.body;
  let newUser = await UserModel.create({
    name,
    age,
    email,
    role,
    isMarried,
    password /* : hashedPassword, */,
  });
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: newUser,
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser = await UserModel.findOne({ email });
  if (!existingUser) throw new ErrorResponse("Invalid Credentials", 404);

  // let isMatched = await bcryptjs.compare(password, existingUser.password);
  let isMatched = await existingUser.comparePassword(password);
  if (!isMatched) return next(new ErrorResponse("Invalid credentials", 400));

  let token = generateJwtToken(existingUser.name);

  res.cookie("token", token, {
    httpOnly: true, // JS cannot read it → more secure
    secure: process.env.NODE_ENV === "production", // true on production (HTTPS)
    sameSite: "None", // cross-site cookies allowed
    maxAge: 2*60 * 60 * 1000, // 1 hour
  });

  //? res.cookie("tokenName", "value", {options}); this will send cookies to the client's browser

  res.status(200).json({
    success: true,
    message: "User logged in",
    token,
  });
});

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const userId = req.myUser._id;
  const user = await UserModel.findById(userId);
  if (!user) return next(new ErrorResponse("User does not exist", 404));
  return res
    .status(200)
    .json({ success: true, messsage: "Curent user", payload: user });
});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    success: true,
    message: "User logged out",
  });
});

//these route will be used later by admin

export const getUsers = async (req, res, next) => {
  try {
    let allUsers = await UserModel.find();
    if (allUsers.length === 0) {
      // return res.status(404).json({
      //   success: false,
      //   message: "No users found",
      // });
      // throw new Error("No users found!!!!");
      // new ErrorResponse("msg", 404)
      throw new ErrorResponse("No users found", 404);
      // {message: "No users found", statusCode: 404}
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: allUsers.length,
      data: allUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    let userId = req.params.id;
    // let user = await UserModel.findOne({ _id: userId });
    let user = await UserModel.findById(userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    let userId = req.params.id;
    let updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true, // display the updated document
      runValidators: true, // to validate the updated data
    });

    if (!updatedUser)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  let userId = req.params.id;
  let deletedUser = await UserModel.findByIdAndDelete(userId);

  if (!deletedUser)
    return res.status(404).json({
      success: false,
      message: "No user found",
    });

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: deletedUser,
  });
};

export const getProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: req.myUser,
  });
});
