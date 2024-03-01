import express from "express";

import {
  getBlogById,
  getBlogs,
  deleteBlog,
  createBlog,
  updateBlog,
  createBlogReview,
} from "../controllers/blogController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getBlogs).post(protect, admin, createBlog);
router.route("/:id/reviews").post(protect, admin, createBlogReview);
router
  .route("/:id")
  .get(getBlogById)
  .delete(protect, admin, deleteBlog)
  .put(protect, admin, updateBlog);

export default router;
