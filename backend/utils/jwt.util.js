import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/index.js";

export const generateJwtToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: "1d" }); //? claims
};
