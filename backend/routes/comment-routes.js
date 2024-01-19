const express = require("express");
const {
  createComment,
  deleteComment,
  getComments,
} = require("../controllers/comment-controller");
const { verifyUser } = require("../middlewares/auth");

const commentRouter = express.Router();

commentRouter.post("/:blogId", createComment);
commentRouter.delete("/:id", verifyUser, deleteComment);
commentRouter.get("/:blogId/comments", getComments);
// commentRouter.get('/:id', getCommentById);
// commentRouter.put('/:id', auth, updateComment);

module.exports = commentRouter;
