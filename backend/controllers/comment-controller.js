const Comment = require("../models/comment");
const Blog = require("../models/Blog");

const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const blogId = req.params.blogId;
    const user = req.user;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const comment = new Comment({
      content,
      user,
      blogId,
      createdAt: Date.now(),
    });

    await comment.save();

    blog.comments.push(comment);
    await blog.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment: comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};



const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find the comment by ID
    const comment = await Comment.findById(id);

    // Check if the comment exists
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the authenticated user is the owner of the comment
    if (comment.user.id.toString() !== userId) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete this comment" });
    }

    // Find the blog that contains the comment and remove the comment's ID from the comments array
    const blog = await Blog.findByIdAndUpdate(
      comment.blog,
      { $pull: { comments: id } },
      { new: true }
    );

    // Delete the comment
    const deletedComment = await Comment.findByIdAndRemove(id);

    if (!deletedComment) {
      return res.status(404).json({ error: "Failed to delete comment" });
    }

    res.status(204).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

const getComments = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const user = req.user; // Assuming you have middleware that populates the authenticated user in req.user

    // Find the blog by ID
    const blog = await Blog.findById(blogId).populate("comments");

    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Get all comments associated with the blog
    const comments = blog.comments.map((comment) => ({
      ...comment.toObject(),
      isUserLoggedIn: !!user,
    }));

    res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};



module.exports = {
  createComment,
  deleteComment,
  getComments,
};
