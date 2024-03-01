import express from "express";

import {
  getToolById,
  getTools,
  deleteTool,
  createTool,
  updateTool,
  createToolReview,
} from "../controllers/toolController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getTools).post(protect, admin, createTool);
router.route("/:id/reviews").post(protect, admin, createToolReview);
router
  .route("/:id")
  .get(getToolById)
  .delete(protect, admin, deleteTool)
  .put(protect, admin, updateTool);

export default router;
