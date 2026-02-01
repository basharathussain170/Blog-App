import asyncHandler from "express-async-handler";
import UserModel from "../models/user.model.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../config/index.js";

export const dataSeeding = asyncHandler(async () => {
  const admin = await UserModel.findOne({ email: ADMIN_EMAIL });

  if (!admin) {
    const seedingData = await UserModel.insertOne({
      name: "Basharat",
      age: 20,
      role: "admin",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    if (!seedingData) {
      return next(new ErrorResponse("Data seeding failed", 500));
    }
    console.log("data seeding successfully");
  }
});
