import asyncHandler from "express-async-handler";

import Blog from "../models/blogModel.js";
/**
 * @desc 		Get all blogs
 * @route		GET /api/blogs
 * @access	public
 */
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

/**
 * @desc 		Get single blogs
 * @route		GET /api/blogs/:id
 * @access	public
 */
const getBlogById = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc 		Delete a Blog
 * @route		DELETE /api/blogs/:id
 * @access	private/admin
 */
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await Blog.deleteOne(blog);
    res.json({ message: "Blog deleted" });
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

/**
 * @desc 		Create a Blog
 * @route		POST /api/blogs
 * @access	private/admin
 */
const createBlog = asyncHandler(async (req, res) => {
  const blog = new Blog({
    title: "Blog Title",
    image: "Blog Image",
    content: "Blog Content",
    description: "Blog description",
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

/**
 * @desc 		Update a Blog
 * @route		PUT /api/blogs/:id
 * @access	private/admin
 */
const updateBlog = asyncHandler(async (req, res) => {
  const { title, image, content, description } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title;
    blog.description = description;
    blog.image = image;
    blog.content = content;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

/**
 * @desc 		Create new review
 * @route		POST /api/blogs/:id/reviews
 * @access	private
 */
const createBlogReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const alreadyReviewed = blog.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Blogs already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: +rating,
      comment,
      user: req.user._id,
    };

    blog.reviews.push(review);
    blog.numReview = blog.reviews.length;

    blog.rating =
      blog.reviews.reduce((acc, currVal) => currVal.rating + acc, 0) /
      blog.reviews.length;

    await blog.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

export {
  getBlogById,
  getBlogs,
  deleteBlog,
  createBlog,
  updateBlog,
  createBlogReview,
};
