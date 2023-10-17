import { StatusCodes } from "http-status-codes";
import { NotFound } from "../errors";
import Comment from "../models/comments";
import Post from "../models/post";

const getAllPostComments = async (req, res) => {
  const { postId } = req.params;

  let comments = await Comment.find({ post: postId, deleted: false })
    .select("_id text likes user")
    .populate("user")
    .sort("-createdAt");

  comments = comments.map((comment) => {
    if (comment.user) {
      comment = {
        ...comment.toObject(),
        user: {
          _id: comment.user._id,
          fullName: comment.user.fullName,
          initials: comment.user.initials,
        },
      };
    } else {
      comment.user = "deleted account";
    }
    return comment;
  });

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "",
    data: comments,
  });
};

const addComment = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
  const newComment = await Comment.create({
    text,
    post: postId,
    user: req.user.id,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: "successfully commented",
    data: newComment,
  });
};

const likeComment = async (req, res) => {
  const {
    params: { commentId },
    user: { id: userId },
  } = req;
  await Comment.findOneAndUpdate(
    { _id: commentId },
    {
      $addToSet: {
        likes: userId,
      },
    }
  );
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "successfully liked",
    data: "",
  });
};

export { getAllPostComments, addComment, likeComment };
