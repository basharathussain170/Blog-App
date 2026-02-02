import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/index.js";
import UserModel from "../models/User.model.js";
import ErrorResponse from "../utils/ErrorResponse.util.js";

export const authenticate = async (req, res, next) => {
  // const  token = req?.cookies?.token;

  let token = req?.headers?.authorization?.split(" ")[1];

  if (!token)
    return next(new ErrorResponse("Please Login to access this resource", 401));
  let decodedToken = jwt.verify(token, JWT_SECRET_KEY);
  //? {iat:, exp:, id:"12bytes"}

  let user = await UserModel.findOne({ _id: decodedToken.userId });
  if (!user) return next(new ErrorResponse("Invalid Session", 401));

  req.myUser = user;
  next();
};
