import asyncHandler from "express-async-handler";

import Tool from "../models/toolModel.js";
/**
 * @desc 		Get all products
 * @route		GET /api/products
 * @access	public
 */
const getTools = asyncHandler(async (req, res) => {
  const tools = await Tool.find({});
  res.json(tools);
});

/**
 * @desc 		Get single products
 * @route		GET /api/products/:id
 * @access	public
 */
const getToolById = asyncHandler(async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    res.json(tool);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc 		Delete a product
 * @route		DELETE /api/products/:id
 * @access	private/admin
 */
const deleteTool = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id);

  if (tool) {
    await Tool.deleteOne(tool);
    res.json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @desc 		Create a product
 * @route		POST /api/products
 * @access	private/admin
 */
const createTool = asyncHandler(async (req, res) => {
  const tool = new Tool({
    name: "Sample Product",
    image: "Tool Image",
    plan: "free/paid",
    charges: "$10/month",
    user: req.user._id,
    application: "Sample Application",
    category: "Sample category",
    numReviews: 0,
    description: "Sample description",
    toolUrl: "Tool Link",
  });

  const createdTool = await tool.save();
  res.status(201).json(createdTool);
});

/**
 * @desc 		Update a product
 * @route		PUT /api/products/:id
 * @access	private/admin
 */
const updateTool = asyncHandler(async (req, res) => {
  const {
    name,
    charges,
    plan,
    description,
    image,
    category,
    application,
    toolUrl,
  } = req.body;

  const tool = await Tool.findById(req.params.id);

  if (tool) {
    tool.name = name;
    tool.description = description;
    tool.image = image;
    tool.plan = plan;
    tool.category = category;
    tool.charges = charges;
    tool.application = application;
    tool.toolUrl = toolUrl;

    const updatedTool = await tool.save();
    res.json(updatedTool);
  } else {
    res.status(404);
    throw new Error("Tool not found");
  }
});

/**
 * @desc 		Create new review
 * @route		POST /api/products/:id/reviews
 * @access	private
 */
const createToolReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const tool = await Tool.findById(req.params.id);

  if (tool) {
    const alreadyReviewed = tool.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Tool already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: +rating,
      comment,
      user: req.user._id,
    };

    tool.reviews.push(review);
    tool.numReview = tool.reviews.length;

    tool.rating =
      tool.reviews.reduce((acc, currVal) => currVal.rating + acc, 0) /
      tool.reviews.length;

    await tool.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Tool not found");
  }
});

export {
  getToolById,
  getTools,
  deleteTool,
  createTool,
  updateTool,
  createToolReview,
};
