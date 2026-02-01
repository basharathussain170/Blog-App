import { Router } from "express";
import {
  addBlog,
  deleteBlog,
  // deleteBlogImage,
  generateDescription,
  getAuthorBlogs,
  getBlog,
  getBlogs,
  updateBlog,
  // updateBlogDetails,
  // updateImage,
} from "../controllers/blog.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {
  addBlogSchema,
  updateBlogSchema,
} from "../validators/blog.validator.js";

const router = Router();

router.post(
  "/add",
  authenticate,
  validateBody(addBlogSchema),
  upload.single("image"),
  addBlog,
);
router.post("/generate-description", authenticate, generateDescription);
router.get("/all", getBlogs);
router.get("/author-blogs", authenticate, getAuthorBlogs);
router.delete("/delete-blog/:id", authenticate, deleteBlog);


router.get("/single/:id", authenticate,getBlog);

//when i do change the order then it works but why
// router.get("/:id", getBlog);
// router.get("/all", getBlogs);

// router.patch(
//   "/edit-blog/:id",
//   authenticate,
//   validateBody(updateBlogSchema),
//   upload.none(),
//   updateBlogDetails,
// );

// router.patch(
//   "/edit-image/:id",
//   authenticate,
//   validateBody(updateBlogSchema),
//   upload.single("image"),
//   updateImage,
// );

// router.patch("/delete-image/:id", authenticate, deleteBlogImage);

router.patch(
  "/edit-blog/:id",
  authenticate,
  validateBody(updateBlogSchema),
  upload.single("image"),
  updateBlog,
);


export default router;
